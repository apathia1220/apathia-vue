import { ref, shallowReactive, reactive, computed, nextTick, watch, unref, onBeforeUnmount, defineComponent, toRefs, provide, openBlock, createElementBlock, mergeProps, createElementVNode, normalizeClass, withModifiers, createCommentVNode, createBlock, Teleport, withDirectives, normalizeStyle, renderSlot, onMounted, inject, getCurrentInstance, withCtx, createVNode } from "vue";
import { useResizeObserver, onClickOutside, useInjectProp } from "@apathia/apathia.hooks";
import { autoPos, noop } from "@apathia/apathia.shared";
import { style } from "@apathia/apathia.twind";
import { debounce } from "lodash";
import { Icon } from "@apathia/apathia.icon";
import { Check } from "@apathia/apathia.icon-svg";
var Direction;
(function(Direction2) {
  Direction2["UP"] = "up";
  Direction2["DOWN"] = "down";
})(Direction || (Direction = {}));
function useSelect(userProps, emit) {
  const { disabled, modelValue, valueKey, filterable, emptyText, placeholder } = userProps;
  const rootEl = ref(null);
  const inputEl = ref(null);
  const dropdownEl = ref(null);
  const active = ref(false);
  const filterStr = ref("");
  const tempArr = shallowReactive([]);
  const tempMap = shallowReactive({});
  const inputFocused = ref(false);
  const selectState = reactive({
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
  const measureAFId = ref(0);
  const mutateAFId = ref(0);
  const pendingCacheUpdate = shallowReactive({
    register: false,
    unregister: false
  });
  const minWidth = ref(0);
  useResizeObserver(rootEl, (entries) => {
    var _a, _b;
    minWidth.value = ((_b = (_a = entries === null || entries === void 0 ? void 0 : entries[0]) === null || _a === void 0 ? void 0 : _a.contentRect) === null || _b === void 0 ? void 0 : _b.width) || 200;
  });
  const isEmpty = computed(() => selectState.optionIds.length === 0);
  const label = computed(() => {
    if (isEmpty.value && emptyText.value) {
      return emptyText.value;
    }
    return selectState.label;
  });
  const isNoResult = computed(() => {
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
  const isRemote = ref(false);
  const finalPlaceholder = computed(() => label.value || placeholder.value);
  const disableSelect = computed(() => !!disabled.value);
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
    if (direction === Direction.UP) {
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
      const dropdown = unref(dropdownEl);
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
        keyFocus(Direction.DOWN);
        break;
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        keyFocus(Direction.UP);
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
    nextTick(() => {
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
    nextTick(() => {
      updateCache("unregister");
    });
  };
  const filterHandler = debounce(() => {
    if (inputFocused.value && filterable.value) {
      active.value = true;
      nextTick(() => {
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
  watch(modelValue, (newVal) => {
    selectState.value = newVal;
    nextTick(() => {
      if (selectState.innerChange) {
        selectState.innerChange = false;
        return;
      }
      if (!pendingCacheUpdate.register && !pendingCacheUpdate.unregister) {
        checkValue();
      }
    });
  }, { immediate: true });
  watch(label, (newVal) => {
    filterStr.value = newVal;
  });
  watch(active, (newVal) => {
    if (newVal) {
      if (selectState.pendingFocusId) {
        selectState.focusId = selectState.pendingFocusId;
        selectState.pendingFocusId = 0;
      }
      const input = unref(inputEl);
      if (input) {
        input.focus();
      }
      filterStr.value = "";
      if (isRemote.value) {
        emit("query-change", filterStr.value);
      }
    } else {
      resetFilterStr();
      const input = unref(inputEl);
      if (input) {
        input.blur();
      }
    }
  });
  onClickOutside(rootEl, outsideClick);
  onBeforeUnmount(() => {
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
const _hoisted_1 = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1);
const _hoisted_2 = [
  _hoisted_1
];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("path", { d: "M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" }, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _sfc_main$1 = defineComponent({
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
    } = toRefs(props);
    const disableSelect = useInjectProp("FormDisabled", false, disabled);
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
    provide(UpdateRegisterKey, updateRegister);
    provide(RegisterKey, register);
    provide(UnregisterKey, unregister);
    provide(SelectStateKey, selectState);
    provide(ChangeHandlerKey, changeHandler);
    provide(FocusKey, focus);
    provide(SameValueCompareKey, isSameValue);
    const styles = {
      selectWrapper: style`flex relative border rounded border-line-accent bg-content-white shadow h-8`,
      disabled: style(
        "cursor-not-allowed pointer-events-none bg-info-forbid placeholder-content-secondary text-content-secondary"
      ),
      active: style("border-brand-primary"),
      inputSelected: style`flex-1 rounded text-sm py-1.5 pl-2 outline-none cursor-pointer`,
      focused: style("select-none"),
      arrow: style(
        "absolute inset-y-0 right-0 flex items-center pr-2 pl-1.5 py-btn-sm-y pointer-events-none h-8 w-8 text-content-secondary"
      ),
      clearableIcon: style(
        "hidden absolute w-3.5 h-3.5 rounded-full top-2.5 right-7 items-center bg-fill-secondary text-content-white cursor-pointer hover:bg-fill-accent"
      ),
      clearable: style("block"),
      dropdownContainer: style`z-dropdown block h-0 absolute mt-1 border border-line-accent rounded bg-content-white shadow opacity-0 transition duration-200 overflow-y-hidden`,
      dropdownContainerShow: style`h-auto opacity-100`,
      optionList: style`max-h-56 text-base overflow-auto focus:outline-none sm:text-sm`,
      tips: style("ml-3 py-2 text-fill-secondary text-left mr-2")
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({ ...unref(getRootProps)() }, {
        class: {
          [styles.selectWrapper]: true,
          [styles.disabled]: unref(disableSelect),
          [styles.active]: unref(active)
        }
      }), [
        createElementVNode("input", mergeProps({ ...unref(getInputProps)() }, {
          class: { [styles.inputSelected]: true, [styles.focused]: unref(inputFocused) }
        }), null, 16),
        (openBlock(), createElementBlock("svg", {
          class: normalizeClass({ [styles.arrow]: true }),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          "aria-hidden": "true"
        }, _hoisted_2, 2)),
        _ctx.clearable ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: normalizeClass({
            [styles.clearableIcon]: true,
            [styles.clearable]: _ctx.clearable && unref(filterStr)
          }),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-3 -3 24 24",
          fill: "currentColor",
          onClick: _cache[0] || (_cache[0] = withModifiers(
            (...args) => unref(clear) && unref(clear)(...args),
            ["stop"]
          ))
        }, _hoisted_4, 2)) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          withDirectives((openBlock(), createElementBlock("div", mergeProps({ ...unref(getDropdownProps)() }, {
            class: {
              [styles.dropdownContainer]: true,
              [styles.dropdownContainerShow]: unref(active)
            }
          }), [
            !unref(isRemote) || !_ctx.isLoading ? (openBlock(), createElementBlock("ul", {
              key: 0,
              class: normalizeClass({ [styles.optionList]: true }),
              role: "listbox",
              style: normalizeStyle({ maxHeight: unref(maxHeight) + "px" })
            }, [
              renderSlot(_ctx.$slots, "default"),
              _ctx.isLoading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                createElementVNode("p", {
                  class: normalizeClass({ [styles.tips]: true })
                }, "\u52A0\u8F7D\u4E2D...", 2)
              ]) : createCommentVNode("", true),
              !_ctx.isLoading && unref(isEmpty) ? renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
                createElementVNode("p", {
                  class: normalizeClass({ [styles.tips]: true })
                }, "\u6CA1\u6709\u9009\u9879\u6570\u636E", 2)
              ]) : createCommentVNode("", true),
              !_ctx.isLoading && !unref(isEmpty) && unref(isNoResult) ? renderSlot(_ctx.$slots, "no-result", { key: 2 }, () => [
                createElementVNode("p", {
                  class: normalizeClass({ [styles.tips]: true })
                }, "\u6CA1\u6709\u641C\u7D22\u7ED3\u679C", 2)
              ]) : createCommentVNode("", true)
            ], 6)) : createCommentVNode("", true)
          ], 16)), [
            [
              unref(autoPos),
              unref(rootEl),
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
  const isHidden = ref(false);
  const isSelected = ref(false);
  const mouseMoveFocus = ref(false);
  const currentOptionChange = ref(false);
  const label = ref("");
  const { value, disabled, register, unregister, updateRegister, selectState, changeHandler, isSameValue, focus, compoId } = userProps;
  const rootEl = ref(null);
  const isFocused = computed(() => compoId === selectState.focusId);
  watch(isFocused, (val) => {
    if (val && mouseMoveFocus.value === false) {
      const el = unref(rootEl);
      if (el) {
        focus(0, el);
      }
    }
    mouseMoveFocus.value = false;
  });
  const queryChange = (val) => {
    nextTick(() => {
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
  watch(() => selectState.filterStr, queryChange);
  watch(() => selectState.value, handleChecked, {
    immediate: true
  });
  onMounted(() => {
    var _a;
    const elElement = unref(rootEl);
    const labelElement = elElement === null || elElement === void 0 ? void 0 : elElement.querySelector("[label]");
    label.value = (labelElement === null || labelElement === void 0 ? void 0 : labelElement.getAttribute("label")) || ((_a = elElement === null || elElement === void 0 ? void 0 : elElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
    nextTick(() => {
      register(disabled.value, compoId, value.value, label.value);
    });
  });
  onBeforeUnmount(() => {
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
const _sfc_main = defineComponent({
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
    const { value, disabled } = toRefs(props);
    const updateRegister = inject(UpdateRegisterKey, noop);
    const selectState = inject(SelectStateKey, { indeed: false });
    const changeHandler = inject(ChangeHandlerKey, noop);
    const register = inject(RegisterKey, noop);
    const unregister = inject(UnregisterKey, noop);
    const focus = inject(FocusKey, noop);
    const isSameValue = inject(SameValueCompareKey, () => false);
    const compoData = getCurrentInstance();
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
      wrapper: style`block text-content-primary cursor-pointer select-none relative flex items-center py-2 pl-3 pr-9 truncate outline-none`,
      selected: style`font-bold text-brand-primary`,
      focused: style`text-brand-primary bg-fill-gray`,
      text: style`overflow-hidden overflow-ellipsis whitespace-nowrap`,
      checkMark: style`absolute right-4 text-brand-primary`,
      focusMark: style`text-fill-white`,
      disabled: style`text-content-secondary bg-info-forbid cursor-not-allowed`
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", mergeProps({ ...unref(getRootProps)() }, {
        role: "option",
        class: {
          [styles.wrapper]: true,
          [styles.disabled]: unref(disabled),
          [styles.selected]: unref(isSelected),
          [styles.focused]: unref(isFocused)
        }
      }), [
        createElementVNode("span", {
          class: normalizeClass(styles.text)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2),
        unref(isSelected) ? (openBlock(), createBlock(unref(Icon), {
          key: 0,
          class: normalizeClass([styles.checkMark, unref(isFocused) ? styles.focusMark : ""])
        }, {
          default: withCtx(() => [
            createVNode(unref(Check))
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("", true)
      ], 16);
    };
  }
});
export { Direction, _sfc_main as Option, _sfc_main$1 as Select };
