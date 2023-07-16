(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.icon"), require("@apathia/apathia.button"), require("lodash-es"), require("@apathia/apathia.scroll-container"), require("@apathia/apathia.input"), require("@apathia/apathia.checkbox"), require("@apathia/apathia.twind"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.icon", "@apathia/apathia.button", "lodash-es", "@apathia/apathia.scroll-container", "@apathia/apathia.input", "@apathia/apathia.checkbox", "@apathia/apathia.twind", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.transfer = {}, global.Vue, global.icon, global.button, global["lodash-es"], global["scroll-container"], global.input, global.checkbox, global.twind, global["icon-svg"]));
})(this, function(exports2, vue, apathia_icon, apathia_button, lodashEs, apathia_scrollContainer, apathia_input, apathia_checkbox, apathia_twind, apathia_iconSvg) {
  "use strict";
  var useTransfer = (userProps, emit) => {
    const selectedSource = vue.ref([]);
    const selectedTarget = vue.ref([]);
    const processedData = vue.computed(() => userProps.value.data.map((cur) => ({
      value: cur[userProps.value.propKeys.value],
      label: cur[userProps.value.propKeys.label],
      disabled: cur[userProps.value.propKeys.disabled]
    })));
    const valueMap = vue.computed(() => processedData.value.reduce((acc, cur) => {
      acc[`${cur.value}`] = cur;
      return acc;
    }, {}));
    const source = vue.computed(() => processedData.value.filter((cur) => !userProps.value.modelValue.includes(cur.value)));
    const target = vue.computed(() => {
      const res = userProps.value.modelValue.map((v) => valueMap.value[v]);
      const valid = res.filter((cur) => typeof cur !== "undefined");
      if (res.length !== valid.length) {
        console.warn("[Transfer] invalid value");
      }
      return valid;
    });
    const resolve = (oldValue, addValue) => {
      if (userProps.value.targetOrder === "unshift")
        return addValue.concat(oldValue);
      if (userProps.value.targetOrder === "push")
        return oldValue.concat(addValue);
      const all = oldValue.concat(addValue);
      return processedData.value.filter(({ value }) => all.includes(value)).map(({ value }) => value);
    };
    const addAll = () => {
      const added = source.value.filter((cur) => !cur.disabled).map((cur) => cur.value);
      emit("update:modelValue", resolve(userProps.value.modelValue, added));
      emit("select", added);
      selectedSource.value = [];
    };
    const removeAll = () => {
      emit("update:modelValue", []);
      emit("remove", userProps.value.modelValue);
      selectedSource.value = [];
    };
    const addSelected = () => {
      emit("update:modelValue", resolve(userProps.value.modelValue, selectedSource.value));
      emit("select", selectedSource.value);
      selectedSource.value = [];
    };
    const removeSelected = () => {
      emit("update:modelValue", userProps.value.modelValue.filter((cur) => !selectedTarget.value.includes(cur)));
      emit("remove", selectedTarget.value);
      selectedTarget.value = [];
    };
    return {
      selectedSource,
      selectedTarget,
      processedData,
      valueMap,
      source,
      target,
      resolve,
      addAll,
      removeAll,
      addSelected,
      removeSelected
    };
  };
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "Panel"
    },
    __name: "Panel",
    props: {
      modelValue: {},
      data: {},
      filterable: { type: Boolean },
      filterPlaceholder: { default: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9" },
      defaultChecked: { default: () => [] },
      filterMethod: { type: Function, default: (searchWords, option) => option.label.includes(searchWords) },
      title: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      const getPanelStyles = () => ({
        panel: apathia_twind.tw`${apathia_twind.apply`border-line-accent border rounded`}`,
        titleBar: apathia_twind.tw`${apathia_twind.apply`flex justify-between items-center bg-fill-light py-4 px-2 text-xs`}`,
        title: apathia_twind.tw`${apathia_twind.apply`font-medium`}`,
        counter: apathia_twind.tw`${apathia_twind.apply`w-14 text-right`}`,
        filter: apathia_twind.tw`${apathia_twind.apply`m-2`}`,
        list: apathia_twind.tw`${apathia_twind.apply`h-80`}`,
        item: apathia_twind.tw`${apathia_twind.apply`text-base p-2 hover:(bg-fill-light) transition-all duration-300 ease-in text-left`}`,
        checkbox: apathia_twind.tw`${apathia_twind.apply`mr-2`}`,
        disabledCheckbox: apathia_twind.tw`${apathia_twind.apply`cursor-not-allowed`}`
      });
      const checkAll = vue.ref(false);
      const indeterminate = vue.ref(false);
      const searchWords = vue.ref("");
      const checked = vue.ref({});
      const filterList = vue.computed(() => {
        if (!props.filterable)
          return props.data;
        return props.data.filter(
          (cur) => searchWords.value ? props.filterMethod(searchWords.value, cur) : true
        );
      });
      const checkedLength = vue.computed(
        () => Object.entries(checked.value).filter(([, value]) => value).length
      );
      const checkableLength = vue.computed(
        () => filterList.value.filter((cur) => !cur.disabled).length
      );
      const setChecked = (c) => {
        checked.value = props.data.reduce((acc, cur) => {
          if (c.includes(cur.value)) {
            acc[cur.value] = true;
          }
          return acc;
        }, {});
        emit(
          "update:modelValue",
          Object.entries(checked.value).filter(([, value]) => value).map(([key]) => key)
        );
      };
      const onCheckAllChange = (value) => {
        emit(
          "update:modelValue",
          value ? filterList.value.filter((cur) => !cur.disabled).map((cur) => cur.value) : []
        );
      };
      const onSearchInput = lodashEs.debounce(function handleInput(value) {
        searchWords.value = value;
        const validKeys = filterList.value.map((cur) => cur.value);
        emit(
          "update:modelValue",
          Object.entries(checked.value).filter(([key, val]) => val && validKeys.includes(key)).map(([key]) => key)
        );
      }, 500);
      const onItemCheckChange = (isChecked, itemValue) => {
        const newChecked = {
          ...checked.value,
          [itemValue]: isChecked
        };
        emit(
          "update:modelValue",
          Object.entries(newChecked).filter(([, value]) => value).map(([key]) => key)
        );
      };
      vue.watch(
        () => props.modelValue,
        (value) => {
          checked.value = filterList.value.reduce((acc, cur) => {
            acc[cur.value] = value.includes(cur.value);
            return acc;
          }, {});
          if (checkedLength.value !== 0) {
            checkAll.value = checkedLength.value === checkableLength.value;
            indeterminate.value = !checkAll.value;
          } else {
            checkAll.value = false;
            indeterminate.value = false;
          }
        },
        { immediate: true }
      );
      vue.watch(
        () => props.defaultChecked,
        (value) => {
          if (value.length) {
            setChecked(value);
          }
        },
        { immediate: true }
      );
      const styles = getPanelStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).panel)
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).titleBar)
          }, [
            vue.createVNode(vue.unref(apathia_checkbox.Checkbox), {
              modelValue: checkAll.value,
              "onUpdate:modelValue": [
                _cache[0] || (_cache[0] = ($event) => checkAll.value = $event),
                onCheckAllChange
              ],
              indeterminate: indeterminate.value
            }, null, 8, ["modelValue", "indeterminate"]),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(vue.unref(styles).title)
            }, vue.toDisplayString(_ctx.title), 3),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(vue.unref(styles).counter)
            }, vue.toDisplayString(checkedLength.value) + " / " + vue.toDisplayString(_ctx.data.length), 3)
          ], 2),
          _ctx.filterable ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(vue.unref(styles).filter)
          }, [
            vue.createVNode(vue.unref(apathia_input.Input), {
              "model-value": searchWords.value,
              placeholder: _ctx.filterPlaceholder,
              suffix: "v-icon-search",
              "onUpdate:modelValue": vue.unref(onSearchInput)
            }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])
          ], 2)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).list)
          }, [
            vue.createVNode(vue.unref(apathia_scrollContainer.ScrollContainer), {
              size: 5,
              "hide-horizontal": ""
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("div", null, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(filterList.value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("div", {
                      key: index,
                      class: vue.normalizeClass(vue.unref(styles).item)
                    }, [
                      vue.createVNode(vue.unref(apathia_checkbox.Checkbox), {
                        "model-value": !!checked.value[item.value],
                        class: vue.normalizeClass({
                          [vue.unref(styles).checkbox]: true,
                          [vue.unref(styles).disabledCheckbox]: item.disabled
                        }),
                        disabled: item.disabled,
                        "onUpdate:modelValue": ($event) => onItemCheckChange($event, item.value)
                      }, {
                        default: vue.withCtx(() => [
                          vue.renderSlot(_ctx.$slots, "item", {
                            option: item,
                            index
                          }, () => [
                            vue.createElementVNode("span", null, vue.toDisplayString(item.label), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["model-value", "class", "disabled", "onUpdate:modelValue"])
                    ], 2);
                  }), 128))
                ])
              ]),
              _: 3
            })
          ], 2)
        ], 2);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Transfer"
    },
    __name: "Transfer",
    props: {
      modelValue: {},
      data: {},
      filterable: { type: Boolean },
      filterPlaceholder: { default: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9" },
      filterMethod: { type: Function, default: (word, option) => option.label.indexOf(word) > -1 },
      targetOrder: { default: "original" },
      titles: { default: () => ["\u5217\u88681", "\u5217\u88682"] },
      propKeys: { default: () => ({
        value: "value",
        label: "label",
        disabled: "disabled"
      }) },
      leftDefaultChecked: { default: () => [] },
      rightDefaultChecked: { default: () => [] }
    },
    emits: ["update:modelValue", "select", "remove"],
    setup(__props, { emit }) {
      const props = __props;
      const getTransferStyles = () => ({
        transfer: apathia_twind.tw`${apathia_twind.apply`flex`}`,
        panel: apathia_twind.tw`${apathia_twind.apply`w-48`}`,
        buttonWrapper: apathia_twind.tw`${apathia_twind.apply`self-center text-center mx-4`}`,
        button: apathia_twind.tw`${apathia_twind.apply`w-12 my-0.5`}`
      });
      const userProps = vue.computed(() => ({
        modelValue: props.modelValue,
        data: props.data,
        filterable: props.filterable,
        filterPlaceholder: props.filterPlaceholder,
        filterMethod: props.filterMethod,
        targetOrder: props.targetOrder,
        titles: props.titles,
        propKeys: props.propKeys,
        leftDefaultChecked: props.leftDefaultChecked,
        rightDefaultChecked: props.rightDefaultChecked
      }));
      const {
        selectedSource,
        selectedTarget,
        source,
        target,
        addAll,
        removeAll,
        addSelected,
        removeSelected
      } = useTransfer(userProps, emit);
      const styles = getTransferStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).transfer)
        }, [
          vue.createVNode(_sfc_main$1, {
            modelValue: vue.unref(selectedSource),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(selectedSource) ? selectedSource.value = $event : null),
            class: vue.normalizeClass(vue.unref(styles).panel),
            data: vue.unref(source),
            filterable: _ctx.filterable,
            "filter-placeholder": _ctx.filterPlaceholder,
            "filter-method": _ctx.filterMethod,
            title: _ctx.titles[0],
            "default-checked": _ctx.leftDefaultChecked
          }, {
            item: vue.withCtx(({ option, index }) => [
              vue.renderSlot(_ctx.$slots, "source-item", {
                option,
                index
              })
            ]),
            _: 3
          }, 8, ["modelValue", "class", "data", "filterable", "filter-placeholder", "filter-method", "title", "default-checked"]),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).buttonWrapper)
          }, [
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(apathia_button.BaseButton), {
                small: "",
                class: vue.normalizeClass(vue.unref(styles).button),
                disabled: vue.unref(source).length === 0,
                onClick: vue.unref(addAll)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(apathia_iconSvg.DArrowLeft))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(apathia_button.BaseButton), {
                small: "",
                class: vue.normalizeClass(vue.unref(styles).button),
                disabled: vue.unref(selectedSource).length === 0,
                onClick: vue.unref(addSelected)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(apathia_iconSvg.ArrowRight))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(apathia_button.BaseButton), {
                small: "",
                class: vue.normalizeClass(vue.unref(styles).button),
                disabled: vue.unref(selectedTarget).length === 0,
                onClick: vue.unref(removeSelected)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(apathia_iconSvg.ArrowLeft))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(apathia_button.BaseButton), {
                small: "",
                class: vue.normalizeClass(vue.unref(styles).button),
                disabled: vue.unref(target).length === 0,
                onClick: vue.unref(removeAll)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(apathia_iconSvg.DArrowLeft))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["class", "disabled", "onClick"])
            ])
          ], 2),
          vue.createVNode(_sfc_main$1, {
            modelValue: vue.unref(selectedTarget),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(selectedTarget) ? selectedTarget.value = $event : null),
            class: vue.normalizeClass(vue.unref(styles).panel),
            data: vue.unref(target),
            filterable: _ctx.filterable,
            "filter-placeholder": _ctx.filterPlaceholder,
            "filter-method": _ctx.filterMethod,
            title: _ctx.titles[1],
            "default-checked": _ctx.rightDefaultChecked
          }, {
            item: vue.withCtx(({ option, index }) => [
              vue.renderSlot(_ctx.$slots, "source-item", {
                option,
                index
              })
            ]),
            _: 3
          }, 8, ["modelValue", "class", "data", "filterable", "filter-placeholder", "filter-method", "title", "default-checked"])
        ], 2);
      };
    }
  });
  exports2.Transfer = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
