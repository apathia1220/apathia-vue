(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.shared"), require("@apathia/apathia.twind"), require("lodash"), require("@apathia/apathia.icon"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.hooks", "@apathia/apathia.shared", "@apathia/apathia.twind", "lodash", "@apathia/apathia.icon", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.select = {}, global.Vue, global.hooks, global.shared, global.twind, global.lodash, global.icon, global["icon-svg"]));
})(this, function(exports2, vue, apathia_hooks, apathia_shared, apathia_twind, lodash, apathia_icon, apathia_iconSvg) {
  "use strict";
  exports2.Direction = void 0;
  (function(Direction2) {
    Direction2["UP"] = "up";
    Direction2["DOWN"] = "down";
  })(exports2.Direction || (exports2.Direction = {}));
  function useSelect(userProps, emit) {
    const { disabled, modelValue, valueKey, filterable, emptyText, placeholder } = userProps;
    const rootEl = vue.ref(null);
    const inputEl = vue.ref(null);
    const dropdownEl = vue.ref(null);
    const active = vue.ref(false);
    const filterStr = vue.ref("");
    const tempArr = vue.shallowReactive([]);
    const tempMap = vue.shallowReactive({});
    const inputFocused = vue.ref(false);
    const selectState = vue.reactive({
      label: "",
      remote: filterable.value,
      value: modelValue.value,
      valueKey: valueKey.value,
      filterStr: "",
      optionIds: [],
      optionMap: {},
      focusId: 0,
      pendingFocusId: 0,
      innerChange: false,
      indeed: true
    });
    const measureAFId = vue.ref(0);
    const mutateAFId = vue.ref(0);
    const pendingCacheUpdate = vue.shallowReactive({
      register: false,
      unregister: false
    });
    const minWidth = vue.ref(0);
    apathia_hooks.useResizeObserver(rootEl, (entries) => {
      var _a, _b;
      minWidth.value = ((_b = (_a = entries === null || entries === void 0 ? void 0 : entries[0]) === null || _a === void 0 ? void 0 : _a.contentRect) === null || _b === void 0 ? void 0 : _b.width) || 200;
    });
    const isEmpty = vue.computed(() => selectState.optionIds.length === 0);
    const label = vue.computed(() => {
      if (isEmpty.value && emptyText.value) {
        return emptyText.value;
      }
      return selectState.label;
    });
    const isNoResult = vue.computed(() => {
      const { optionMap } = selectState;
      const result = [];
      Object.keys(optionMap).forEach((uid) => {
        const item = optionMap[uid];
        if (!item.disabled) {
          result.push(item);
        }
      });
      return result.length === 0;
    });
    const isRemote = vue.ref(false);
    const finalPlaceholder = vue.computed(() => label.value || placeholder.value);
    const disableSelect = vue.computed(() => !!disabled.value);
    const checkValue = () => {
      const hasValue = hasSelectValue(selectState.value);
      if (!hasValue && !isEmpty.value) {
        changeHandler(selectState.value, "");
        if (selectState.optionIds.length === 1) {
          console.warn("[Select]\b\u6CA1\u6709\u7B26\u5408model\u503C\u7684\u9009\u9879");
        }
      }
    };
    const isSameValue = (newVal, oldVal) => {
      if (newVal == null || oldVal == null) {
        return newVal === oldVal;
      }
      if (typeof newVal === "object" && typeof oldVal === "object") {
        const key = valueKey.value;
        return newVal[key] === oldVal[key];
      }
      return newVal === oldVal;
    };
    const toggleActive = () => {
      active.value = !active.value;
    };
    const hasSelectValue = (value) => {
      const optionMap = selectState.optionMap;
      if (value === void 0) {
        return false;
      }
      const optionKeys = Object.keys(optionMap);
      return optionKeys.some((key) => isSameValue(optionMap[key].value, value));
    };
    const outsideClick = () => {
      active.value = false;
      resetFilterStr();
    };
    const resetFilterStr = () => {
      filterStr.value = label.value;
      selectState.filterStr = "";
    };
    const clear = () => {
      changeHandler("", "");
    };
    const changeHandler = (value, labelStr, isInnerChange = false) => {
      if (value === modelValue.value && isRemote.value)
        return;
      const state = selectState;
      state.label = labelStr;
      state.innerChange = isInnerChange === true;
      resetFilterStr();
      if (value !== modelValue.value) {
        emit("update:modelValue", value);
        emit("input", value, label);
        emit("change", value, label);
        if (isInnerChange) {
          emit("native-change", value, label);
        }
      }
    };
    const updateRegister = (disabledVal, uid, value, labelStr) => {
      const state = selectState;
      if (state.optionMap[uid]) {
        state.optionMap[uid] = {
          value,
          label: labelStr,
          disabled: disabledVal
        };
      }
    };
    const updateCache = (type) => {
      pendingCacheUpdate[type] = false;
      selectState.optionIds = tempArr.slice();
      selectState.optionMap = Object.assign({}, tempMap);
      if (type === "register") {
        checkValue();
      } else {
        isRemote.value = true;
      }
    };
    const getNextId = (curId, direction) => {
      const optionIds = selectState.optionIds;
      let newIndex = optionIds.indexOf(curId);
      if (direction === exports2.Direction.UP) {
        if (newIndex <= 0) {
          newIndex = optionIds.length - 1;
        } else {
          newIndex -= 1;
        }
      } else if (newIndex === optionIds.length - 1) {
        newIndex = 0;
      } else {
        newIndex += 1;
      }
      return optionIds[newIndex];
    };
    const keyFocus = (direction) => {
      if (!active.value) {
        active.value = true;
        return;
      }
      if (!selectState.optionIds.length)
        return;
      let newId = getNextId(selectState.focusId, direction);
      while (selectState.optionMap[newId].disabled) {
        newId = getNextId(newId, direction);
      }
      focus(newId);
    };
    const focus = (uid, focusedEl) => {
      if (!active.value)
        return;
      if (uid && !focusedEl) {
        if (selectState.focusId === uid)
          return;
        selectState.focusId = uid;
        return;
      }
      if (!focusedEl)
        return;
      measureAFId.value = requestAnimationFrame(() => {
        const dropdown = vue.unref(dropdownEl);
        if (!dropdown)
          return;
        const ulElement = dropdown.querySelector("ul");
        if (!ulElement)
          return;
        const { offsetHeight: listOffsetHeight, scrollHeight: listScrollHeight } = ulElement;
        const { top: listTop, bottom: listBottom } = ulElement.getBoundingClientRect();
        const { offsetTop: focusOffsetTop, offsetHeight: focusOffsetHeight, clientHeight: focusClientHeight } = focusedEl;
        const { top: focusTop, bottom: focusBottom } = focusedEl.getBoundingClientRect();
        const overScroll = focusOffsetHeight / 3;
        mutateAFId.value = requestAnimationFrame(() => {
          if (!ulElement)
            return;
          if (focusBottom + overScroll > listBottom) {
            ulElement.scrollTop = Math.min(focusOffsetTop + focusClientHeight - listOffsetHeight + overScroll, listScrollHeight);
          } else if (focusTop - overScroll < listTop) {
            ulElement.scrollTop = Math.max(focusOffsetTop - overScroll, 0);
          }
        });
      });
    };
    const selectFocused = () => {
      const state = selectState;
      const target = state.optionMap[state.focusId];
      state.value = target && target.value || "";
    };
    const keyHandler = (event) => {
      if (disableSelect.value)
        return;
      if (event.key === "Tab")
        return;
      switch (event.key) {
        case " ":
          if (filterable.value) {
            break;
          }
          event.preventDefault();
          event.stopPropagation();
          if (active.value) {
            selectFocused();
          }
          toggleActive();
          break;
        case "Enter":
          if (active.value) {
            event.preventDefault();
            event.stopPropagation();
            selectFocused();
            active.value = false;
          } else {
            toggleActive();
          }
          break;
        case "Escape":
          event.stopPropagation();
          if (active.value) {
            active.value = false;
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          event.stopPropagation();
          keyFocus(exports2.Direction.DOWN);
          break;
        case "ArrowUp":
          event.preventDefault();
          event.stopPropagation();
          keyFocus(exports2.Direction.UP);
          break;
      }
    };
    const register = (disabledOption, uid, value, labelStr) => {
      const state = selectState;
      if (isSameValue(value, modelValue.value)) {
        state.value = value;
        state.label = labelStr;
        state.pendingFocusId = uid;
      }
      tempArr.push(uid);
      tempMap[uid] = {
        value,
        label: labelStr,
        disabled: disabledOption
      };
      if (pendingCacheUpdate.register) {
        return;
      }
      pendingCacheUpdate.register = true;
      vue.nextTick(() => {
        updateCache("register");
      });
    };
    const unregister = (uid) => {
      const optionIndex = tempArr.indexOf(uid);
      tempArr.splice(optionIndex, 1);
      delete tempMap[uid];
      if (pendingCacheUpdate.unregister)
        return;
      pendingCacheUpdate.unregister = true;
      vue.nextTick(() => {
        updateCache("unregister");
      });
    };
    const filterHandler = lodash.debounce(() => {
      if (inputFocused.value && filterable.value) {
        active.value = true;
        vue.nextTick(() => {
          selectState.filterStr = filterStr.value;
          emit("query-change", filterStr.value);
        });
      }
    }, 200);
    const toggleDropdown = () => {
      if (disableSelect.value)
        return;
      toggleActive();
    };
    vue.watch(modelValue, (newVal) => {
      selectState.value = newVal;
      vue.nextTick(() => {
        if (selectState.innerChange) {
          selectState.innerChange = false;
          return;
        }
        if (!pendingCacheUpdate.register && !pendingCacheUpdate.unregister) {
          checkValue();
        }
      });
    }, { immediate: true });
    vue.watch(label, (newVal) => {
      filterStr.value = newVal;
    });
    vue.watch(active, (newVal) => {
      if (newVal) {
        if (selectState.pendingFocusId) {
          selectState.focusId = selectState.pendingFocusId;
          selectState.pendingFocusId = 0;
        }
        const input = vue.unref(inputEl);
        if (input) {
          input.focus();
        }
        filterStr.value = "";
        if (isRemote.value) {
          emit("query-change", filterStr.value);
        }
      } else {
        resetFilterStr();
        const input = vue.unref(inputEl);
        if (input) {
          input.blur();
        }
      }
    });
    apathia_hooks.onClickOutside(rootEl, outsideClick);
    vue.onBeforeUnmount(() => {
      if (mutateAFId.value || measureAFId.value) {
        cancelAnimationFrame(mutateAFId.value);
        cancelAnimationFrame(measureAFId.value);
      }
    });
    const getRootProps = () => ({
      disabled: !!disabled.value || isEmpty.value,
      ref: (el) => {
        rootEl.value = el;
      },
      onClick: toggleDropdown,
      onKeydown: keyHandler
    });
    const getInputProps = () => ({
      type: "text",
      tabindex: "0",
      value: filterStr.value.trim(),
      placeholder: finalPlaceholder.value,
      disabled: !!disabled.value,
      readonly: !filterable.value || !inputFocused.value,
      ref: (el) => {
        inputEl.value = el;
      },
      onInput: (event) => {
        filterStr.value = event.target.value;
        filterHandler();
      },
      onFocus: () => {
        inputFocused.value = true;
      },
      onBlur: () => {
        inputFocused.value = false;
      }
    });
    const getDropdownProps = () => ({
      style: {
        width: `${minWidth.value}px`
      },
      ref: (el) => {
        dropdownEl.value = el;
      }
    });
    return {
      getRootProps,
      getInputProps,
      getDropdownProps,
      toggleDropdown,
      register,
      unregister,
      updateRegister,
      focus,
      clear,
      isSameValue,
      keyHandler,
      changeHandler,
      filterHandler,
      filterStr,
      selectState,
      active,
      isEmpty,
      isRemote,
      inputFocused,
      finalPlaceholder,
      isNoResult,
      rootEl,
      inputEl
    };
  }
  const RegisterKey = Symbol("register");
  const UpdateRegisterKey = Symbol("updateRegister");
  const UnregisterKey = Symbol("unregister");
  const SelectStateKey = Symbol("selectState");
  const ChangeHandlerKey = Symbol("changeHandler");
  const FocusKey = Symbol("focus");
  const SameValueCompareKey = Symbol("sameValueCompare");
  const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_2 = [
    _hoisted_1
  ];
  const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" }, null, -1);
  const _hoisted_4 = [
    _hoisted_3
  ];
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "Select"
    },
    __name: "Select",
    props: {
      modelValue: { type: [Number, String, Boolean, Object, null] },
      valueKey: { default: "value" },
      placeholder: { default: "\u8BF7\u9009\u62E9..." },
      filterable: { type: Boolean, default: false },
      clearable: { type: Boolean, default: false },
      emptyText: { default: "\u6682\u65E0\u6570\u636E" },
      disabled: { type: Boolean, default: void 0 },
      maxHeight: { default: 235 },
      isLoading: { type: Boolean, default: false },
      placement: { default: "" }
    },
    emits: ["update:modelValue", "native-change", "query-change", "change", "input"],
    setup(__props, { emit: emits }) {
      const props = __props;
      const {
        disabled,
        modelValue,
        valueKey,
        filterable,
        emptyText,
        maxHeight,
        placeholder
      } = vue.toRefs(props);
      const disableSelect = apathia_hooks.useInjectProp("FormDisabled", false, disabled);
      const userProps = {
        disabled: disableSelect,
        modelValue,
        valueKey,
        filterable,
        emptyText,
        maxHeight,
        placeholder
      };
      const {
        filterStr,
        updateRegister,
        selectState,
        changeHandler,
        register,
        unregister,
        focus,
        clear,
        isSameValue,
        active,
        isEmpty,
        inputFocused,
        isNoResult,
        isRemote,
        getRootProps,
        getInputProps,
        getDropdownProps,
        rootEl
      } = useSelect(userProps, emits);
      vue.provide(UpdateRegisterKey, updateRegister);
      vue.provide(RegisterKey, register);
      vue.provide(UnregisterKey, unregister);
      vue.provide(SelectStateKey, selectState);
      vue.provide(ChangeHandlerKey, changeHandler);
      vue.provide(FocusKey, focus);
      vue.provide(SameValueCompareKey, isSameValue);
      const styles = {
        selectWrapper: apathia_twind.style`flex relative border rounded border-line-accent bg-content-white shadow h-8`,
        disabled: apathia_twind.style(
          "cursor-not-allowed pointer-events-none bg-info-forbid placeholder-content-secondary text-content-secondary"
        ),
        active: apathia_twind.style("border-brand-primary"),
        inputSelected: apathia_twind.style`flex-1 rounded text-sm py-1.5 pl-2 outline-none cursor-pointer`,
        focused: apathia_twind.style("select-none"),
        arrow: apathia_twind.style(
          "absolute inset-y-0 right-0 flex items-center pr-2 pl-1.5 py-btn-sm-y pointer-events-none h-8 w-8 text-content-secondary"
        ),
        clearableIcon: apathia_twind.style(
          "hidden absolute w-3.5 h-3.5 rounded-full top-2.5 right-7 items-center bg-fill-secondary text-content-white cursor-pointer hover:bg-fill-accent"
        ),
        clearable: apathia_twind.style("block"),
        dropdownContainer: apathia_twind.style`z-dropdown block h-0 absolute mt-1 border border-line-accent rounded bg-content-white shadow opacity-0 transition duration-200 overflow-y-hidden`,
        dropdownContainerShow: apathia_twind.style`h-auto opacity-100`,
        optionList: apathia_twind.style`max-h-56 text-base overflow-auto focus:outline-none sm:text-sm`,
        tips: apathia_twind.style("ml-3 py-2 text-fill-secondary text-left mr-2")
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ ...vue.unref(getRootProps)() }, {
          class: {
            [styles.selectWrapper]: true,
            [styles.disabled]: vue.unref(disableSelect),
            [styles.active]: vue.unref(active)
          }
        }), [
          vue.createElementVNode("input", vue.mergeProps({ ...vue.unref(getInputProps)() }, {
            class: { [styles.inputSelected]: true, [styles.focused]: vue.unref(inputFocused) }
          }), null, 16),
          (vue.openBlock(), vue.createElementBlock("svg", {
            class: vue.normalizeClass({ [styles.arrow]: true }),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true"
          }, _hoisted_2, 2)),
          _ctx.clearable ? (vue.openBlock(), vue.createElementBlock("svg", {
            key: 0,
            class: vue.normalizeClass({
              [styles.clearableIcon]: true,
              [styles.clearable]: _ctx.clearable && vue.unref(filterStr)
            }),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "-3 -3 24 24",
            fill: "currentColor",
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(
              (...args) => vue.unref(clear) && vue.unref(clear)(...args),
              ["stop"]
            ))
          }, _hoisted_4, 2)) : vue.createCommentVNode("", true),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
            vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ ...vue.unref(getDropdownProps)() }, {
              class: {
                [styles.dropdownContainer]: true,
                [styles.dropdownContainerShow]: vue.unref(active)
              }
            }), [
              !vue.unref(isRemote) || !_ctx.isLoading ? (vue.openBlock(), vue.createElementBlock("ul", {
                key: 0,
                class: vue.normalizeClass({ [styles.optionList]: true }),
                role: "listbox",
                style: vue.normalizeStyle({ maxHeight: vue.unref(maxHeight) + "px" })
              }, [
                vue.renderSlot(_ctx.$slots, "default"),
                _ctx.isLoading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                  vue.createElementVNode("p", {
                    class: vue.normalizeClass({ [styles.tips]: true })
                  }, "\u52A0\u8F7D\u4E2D...", 2)
                ]) : vue.createCommentVNode("", true),
                !_ctx.isLoading && vue.unref(isEmpty) ? vue.renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
                  vue.createElementVNode("p", {
                    class: vue.normalizeClass({ [styles.tips]: true })
                  }, "\u6CA1\u6709\u9009\u9879\u6570\u636E", 2)
                ]) : vue.createCommentVNode("", true),
                !_ctx.isLoading && !vue.unref(isEmpty) && vue.unref(isNoResult) ? vue.renderSlot(_ctx.$slots, "no-result", { key: 2 }, () => [
                  vue.createElementVNode("p", {
                    class: vue.normalizeClass({ [styles.tips]: true })
                  }, "\u6CA1\u6709\u641C\u7D22\u7ED3\u679C", 2)
                ]) : vue.createCommentVNode("", true)
              ], 6)) : vue.createCommentVNode("", true)
            ], 16)), [
              [
                vue.unref(apathia_shared.autoPos),
                vue.unref(rootEl),
                void 0,
                { root: true }
              ]
            ])
          ]))
        ], 16);
      };
    }
  });
  function useOption(userProps) {
    const isHidden = vue.ref(false);
    const isSelected = vue.ref(false);
    const mouseMoveFocus = vue.ref(false);
    const currentOptionChange = vue.ref(false);
    const label = vue.ref("");
    const { value, disabled, register, unregister, updateRegister, selectState, changeHandler, isSameValue, focus, compoId } = userProps;
    const rootEl = vue.ref(null);
    const isFocused = vue.computed(() => compoId === selectState.focusId);
    vue.watch(isFocused, (val) => {
      if (val && mouseMoveFocus.value === false) {
        const el = vue.unref(rootEl);
        if (el) {
          focus(0, el);
        }
      }
      mouseMoveFocus.value = false;
    });
    const queryChange = (val) => {
      vue.nextTick(() => {
        const shouldHide = label.value.toLowerCase().indexOf(val.toLowerCase()) === -1;
        if (isHidden.value !== shouldHide) {
          isHidden.value = shouldHide;
          if (!disabled.value) {
            updateRegister(isHidden.value, compoId, value.value, label.value);
          }
        }
      });
    };
    const handleChange = (event) => {
      if (disabled.value) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const clickSelf = isSameValue(value.value, selectState.value);
      if (clickSelf) {
        return;
      }
      isSelected.value = true;
      currentOptionChange.value = true;
      changeHandler(value.value, label.value, true);
    };
    const handleChecked = (newVal) => {
      if (currentOptionChange.value === true) {
        currentOptionChange.value = false;
        return;
      }
      if (selectState.innerChange) {
        isSelected.value = false;
        return;
      }
      const optionValue = value.value;
      const newSelected = isSameValue(newVal, optionValue);
      if (newSelected) {
        changeHandler(optionValue, label.value);
      }
      isSelected.value = newSelected;
    };
    const mouseoverHandler = () => {
      if (disabled.value)
        return;
      focus(compoId);
      mouseMoveFocus.value = true;
    };
    vue.watch(() => selectState.filterStr, queryChange);
    vue.watch(() => selectState.value, handleChecked, {
      immediate: true
    });
    vue.onMounted(() => {
      var _a;
      const elElement = vue.unref(rootEl);
      const labelElement = elElement === null || elElement === void 0 ? void 0 : elElement.querySelector("[label]");
      label.value = (labelElement === null || labelElement === void 0 ? void 0 : labelElement.getAttribute("label")) || ((_a = elElement === null || elElement === void 0 ? void 0 : elElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
      vue.nextTick(() => {
        register(disabled.value, compoId, value.value, label.value);
      });
    });
    vue.onBeforeUnmount(() => {
      unregister(compoId);
    });
    const getRootProps = () => ({
      tabindex: "0",
      style: isHidden.value ? "display: none;" : null,
      ref: (el) => {
        rootEl.value = el;
      },
      onMouseover: mouseoverHandler,
      onClick: handleChange
    });
    return {
      getRootProps,
      isSelected,
      isHidden,
      isFocused
    };
  }
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Option"
    },
    __name: "Option",
    props: {
      value: { type: [String, Number, Boolean, null] },
      disabled: { type: Boolean, default: false }
    },
    setup(__props) {
      const props = __props;
      const { value, disabled } = vue.toRefs(props);
      const updateRegister = vue.inject(UpdateRegisterKey, apathia_shared.noop);
      const selectState = vue.inject(SelectStateKey, { indeed: false });
      const changeHandler = vue.inject(ChangeHandlerKey, apathia_shared.noop);
      const register = vue.inject(RegisterKey, apathia_shared.noop);
      const unregister = vue.inject(UnregisterKey, apathia_shared.noop);
      const focus = vue.inject(FocusKey, apathia_shared.noop);
      const isSameValue = vue.inject(SameValueCompareKey, () => false);
      const compoData = vue.getCurrentInstance();
      const compoId = compoData ? compoData.uid : 0;
      if (!selectState.indeed) {
        console.warn("<Option> \u5E94\u8BE5\u5728 <Select> \u5185\u4F7F\u7528");
      }
      const userProps = {
        value,
        disabled,
        register,
        unregister,
        updateRegister,
        selectState,
        changeHandler,
        isSameValue,
        focus,
        compoId
      };
      const { getRootProps, isSelected, isFocused, isHidden } = useOption(
        userProps
      );
      const styles = {
        wrapper: apathia_twind.style`block text-content-primary cursor-pointer select-none relative flex items-center py-2 pl-3 pr-9 truncate outline-none`,
        selected: apathia_twind.style`font-bold text-brand-primary`,
        focused: apathia_twind.style`text-brand-primary bg-fill-gray`,
        text: apathia_twind.style`overflow-hidden overflow-ellipsis whitespace-nowrap`,
        checkMark: apathia_twind.style`absolute right-4 text-brand-primary`,
        focusMark: apathia_twind.style`text-fill-white`,
        disabled: apathia_twind.style`text-content-secondary bg-info-forbid cursor-not-allowed`
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({ ...vue.unref(getRootProps)() }, {
          role: "option",
          class: {
            [styles.wrapper]: true,
            [styles.disabled]: vue.unref(disabled),
            [styles.selected]: vue.unref(isSelected),
            [styles.focused]: vue.unref(isFocused)
          }
        }), [
          vue.createElementVNode("span", {
            class: vue.normalizeClass(styles.text)
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2),
          vue.unref(isSelected) ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_icon.Icon), {
            key: 0,
            class: vue.normalizeClass([styles.checkMark, vue.unref(isFocused) ? styles.focusMark : ""])
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(apathia_iconSvg.Check))
            ]),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("", true)
        ], 16);
      };
    }
  });
  exports2.Option = _sfc_main;
  exports2.Select = _sfc_main$1;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
