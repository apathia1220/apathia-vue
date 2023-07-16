import { ref, computed, defineComponent, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, createVNode, toDisplayString, createCommentVNode, withCtx, Fragment, renderList, renderSlot, isRef } from "vue";
import { Icon } from "@apathia/apathia.icon";
import { BaseButton } from "@apathia/apathia.button";
import { debounce } from "lodash-es";
import { ScrollContainer } from "@apathia/apathia.scroll-container";
import { Input } from "@apathia/apathia.input";
import { Checkbox } from "@apathia/apathia.checkbox";
import { tw, apply } from "@apathia/apathia.twind";
import { DArrowLeft, ArrowRight, ArrowLeft } from "@apathia/apathia.icon-svg";
var useTransfer = (userProps, emit) => {
  const selectedSource = ref([]);
  const selectedTarget = ref([]);
  const processedData = computed(() => userProps.value.data.map((cur) => ({
    value: cur[userProps.value.propKeys.value],
    label: cur[userProps.value.propKeys.label],
    disabled: cur[userProps.value.propKeys.disabled]
  })));
  const valueMap = computed(() => processedData.value.reduce((acc, cur) => {
    acc[`${cur.value}`] = cur;
    return acc;
  }, {}));
  const source = computed(() => processedData.value.filter((cur) => !userProps.value.modelValue.includes(cur.value)));
  const target = computed(() => {
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
const _sfc_main$1 = defineComponent({
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
      panel: tw`${apply`border-line-accent border rounded`}`,
      titleBar: tw`${apply`flex justify-between items-center bg-fill-light py-4 px-2 text-xs`}`,
      title: tw`${apply`font-medium`}`,
      counter: tw`${apply`w-14 text-right`}`,
      filter: tw`${apply`m-2`}`,
      list: tw`${apply`h-80`}`,
      item: tw`${apply`text-base p-2 hover:(bg-fill-light) transition-all duration-300 ease-in text-left`}`,
      checkbox: tw`${apply`mr-2`}`,
      disabledCheckbox: tw`${apply`cursor-not-allowed`}`
    });
    const checkAll = ref(false);
    const indeterminate = ref(false);
    const searchWords = ref("");
    const checked = ref({});
    const filterList = computed(() => {
      if (!props.filterable)
        return props.data;
      return props.data.filter(
        (cur) => searchWords.value ? props.filterMethod(searchWords.value, cur) : true
      );
    });
    const checkedLength = computed(
      () => Object.entries(checked.value).filter(([, value]) => value).length
    );
    const checkableLength = computed(
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
    const onSearchInput = debounce(function handleInput(value) {
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
    watch(
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
    watch(
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
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).panel)
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(styles).titleBar)
        }, [
          createVNode(unref(Checkbox), {
            modelValue: checkAll.value,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => checkAll.value = $event),
              onCheckAllChange
            ],
            indeterminate: indeterminate.value
          }, null, 8, ["modelValue", "indeterminate"]),
          createElementVNode("span", {
            class: normalizeClass(unref(styles).title)
          }, toDisplayString(_ctx.title), 3),
          createElementVNode("span", {
            class: normalizeClass(unref(styles).counter)
          }, toDisplayString(checkedLength.value) + " / " + toDisplayString(_ctx.data.length), 3)
        ], 2),
        _ctx.filterable ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(styles).filter)
        }, [
          createVNode(unref(Input), {
            "model-value": searchWords.value,
            placeholder: _ctx.filterPlaceholder,
            suffix: "v-icon-search",
            "onUpdate:modelValue": unref(onSearchInput)
          }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])
        ], 2)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).list)
        }, [
          createVNode(unref(ScrollContainer), {
            size: 5,
            "hide-horizontal": ""
          }, {
            default: withCtx(() => [
              createElementVNode("div", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filterList.value, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: normalizeClass(unref(styles).item)
                  }, [
                    createVNode(unref(Checkbox), {
                      "model-value": !!checked.value[item.value],
                      class: normalizeClass({
                        [unref(styles).checkbox]: true,
                        [unref(styles).disabledCheckbox]: item.disabled
                      }),
                      disabled: item.disabled,
                      "onUpdate:modelValue": ($event) => onItemCheckChange($event, item.value)
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "item", {
                          option: item,
                          index
                        }, () => [
                          createElementVNode("span", null, toDisplayString(item.label), 1)
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
const _sfc_main = defineComponent({
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
      transfer: tw`${apply`flex`}`,
      panel: tw`${apply`w-48`}`,
      buttonWrapper: tw`${apply`self-center text-center mx-4`}`,
      button: tw`${apply`w-12 my-0.5`}`
    });
    const userProps = computed(() => ({
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
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).transfer)
      }, [
        createVNode(_sfc_main$1, {
          modelValue: unref(selectedSource),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedSource) ? selectedSource.value = $event : null),
          class: normalizeClass(unref(styles).panel),
          data: unref(source),
          filterable: _ctx.filterable,
          "filter-placeholder": _ctx.filterPlaceholder,
          "filter-method": _ctx.filterMethod,
          title: _ctx.titles[0],
          "default-checked": _ctx.leftDefaultChecked
        }, {
          item: withCtx(({ option, index }) => [
            renderSlot(_ctx.$slots, "source-item", {
              option,
              index
            })
          ]),
          _: 3
        }, 8, ["modelValue", "class", "data", "filterable", "filter-placeholder", "filter-method", "title", "default-checked"]),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).buttonWrapper)
        }, [
          createElementVNode("div", null, [
            createVNode(unref(BaseButton), {
              small: "",
              class: normalizeClass(unref(styles).button),
              disabled: unref(source).length === 0,
              onClick: unref(addAll)
            }, {
              default: withCtx(() => [
                createVNode(unref(Icon), null, {
                  default: withCtx(() => [
                    createVNode(unref(DArrowLeft))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class", "disabled", "onClick"])
          ]),
          createElementVNode("div", null, [
            createVNode(unref(BaseButton), {
              small: "",
              class: normalizeClass(unref(styles).button),
              disabled: unref(selectedSource).length === 0,
              onClick: unref(addSelected)
            }, {
              default: withCtx(() => [
                createVNode(unref(Icon), null, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowRight))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class", "disabled", "onClick"])
          ]),
          createElementVNode("div", null, [
            createVNode(unref(BaseButton), {
              small: "",
              class: normalizeClass(unref(styles).button),
              disabled: unref(selectedTarget).length === 0,
              onClick: unref(removeSelected)
            }, {
              default: withCtx(() => [
                createVNode(unref(Icon), null, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class", "disabled", "onClick"])
          ]),
          createElementVNode("div", null, [
            createVNode(unref(BaseButton), {
              small: "",
              class: normalizeClass(unref(styles).button),
              disabled: unref(target).length === 0,
              onClick: unref(removeAll)
            }, {
              default: withCtx(() => [
                createVNode(unref(Icon), null, {
                  default: withCtx(() => [
                    createVNode(unref(DArrowLeft))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class", "disabled", "onClick"])
          ])
        ], 2),
        createVNode(_sfc_main$1, {
          modelValue: unref(selectedTarget),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(selectedTarget) ? selectedTarget.value = $event : null),
          class: normalizeClass(unref(styles).panel),
          data: unref(target),
          filterable: _ctx.filterable,
          "filter-placeholder": _ctx.filterPlaceholder,
          "filter-method": _ctx.filterMethod,
          title: _ctx.titles[1],
          "default-checked": _ctx.rightDefaultChecked
        }, {
          item: withCtx(({ option, index }) => [
            renderSlot(_ctx.$slots, "source-item", {
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
export { _sfc_main as Transfer };
