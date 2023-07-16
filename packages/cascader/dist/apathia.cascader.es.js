import { defineComponent, ref, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, Fragment, renderList, toDisplayString, createVNode, withModifiers, withCtx, createCommentVNode, withDirectives, vShow, vModelText, createBlock, watch, computed, onMounted, normalizeStyle, renderSlot, createTextVNode } from "vue";
import { onClickOutside, useScrollX } from "@apathia/apathia.hooks";
import { Checkbox } from "@apathia/apathia.checkbox";
import { Icon } from "@apathia/apathia.icon";
import { autoPos } from "@apathia/apathia.shared";
import { style, css } from "@apathia/apathia.twind";
import { Close, ArrowRight } from "@apathia/apathia.icon-svg";
const _sfc_main$1 = defineComponent({
  ...{
    name: "CascaderNode"
  },
  __name: "Nodes",
  props: {
    nodes: { default: () => [] },
    focus: { type: Boolean, default: false },
    showAllLevels: { type: Boolean, default: false },
    separator: { default: "/" },
    placeholder: { default: "" },
    clearable: { type: Boolean, default: false },
    search: { type: Boolean, default: false }
  },
  emits: ["clear", "remove", "update:focus", "search-change"],
  setup(__props, { emit }) {
    const props = __props;
    const getNodeStyles = () => {
      return {
        container: style`w-full relative flex shadow h-8 border rounded border-line-accent bg-content-white text-sm items-center`,
        wrap: style`h-full w-full overflow-hidden`,
        active: style`border-brand-primary`,
        nodes: style`w-full flex-1 flex-nowrap whitespace-nowrap py-btn-md-y px-1.5 overflow-x-hidden ${css`
      height: calc(100% + 17px);
    `}`,
        search: style`flex-1 outline-none`,
        tag: style`rounded inline-flex text-xs text-content-accent items-center py-1 pl-1.5 bg-fill-light h-5 mr-1 flex-shrink-0`,
        iconWrap: style`h-4 w-4 inline-flex items-center justify-center rounded-full ml-1`,
        nodeRemove: style`p-1.5 text-content-accent hover:(text-content-primary) cursor-pointer`,
        clearIcon: style`absolute right-2 top-1/2 -translate-y-2/4 cursor-pointer ml-2 text-content-neutral hover:(text-content-primary)`,
        placeholder: style`text-content-secondary`
      };
    };
    const styles = getNodeStyles();
    const searchInput = ref("");
    const onSearchInput = (e) => {
      emit("search-change", e.target.value);
      console.log(e);
    };
    const showSearch = ref(false);
    const clear = () => {
      emit("clear");
    };
    const removeOne = (node) => {
      emit("remove", node);
    };
    const handleClick = () => {
      showSearch.value = true;
      emit("update:focus", !props.focus);
    };
    const tagContainerRef = ref(null);
    onClickOutside(tagContainerRef, () => {
      showSearch.value = false;
      searchInput.value = "";
      emit("search-change", "");
      emit("update:focus", false);
    });
    const { contentRef } = useScrollX(false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "tagContainerRef",
        ref: tagContainerRef,
        class: normalizeClass({
          [unref(styles).container]: true,
          [unref(styles).active]: _ctx.focus
        }),
        onClick: handleClick
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(styles).wrap)
        }, [
          createElementVNode("div", {
            ref_key: "contentRef",
            ref: contentRef,
            class: normalizeClass(unref(styles).nodes)
          }, [
            _ctx.nodes.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.nodes, (node) => {
              return openBlock(), createElementBlock("div", {
                key: node.fullKey,
                class: normalizeClass(unref(styles).tag)
              }, [
                createElementVNode("span", null, toDisplayString(_ctx.showAllLevels ? node.fullName.join(_ctx.separator) : node.fullName[node.fullName.length - 1]), 1),
                createElementVNode("span", {
                  class: normalizeClass(unref(styles).iconWrap)
                }, [
                  createVNode(unref(Icon), {
                    "stroke-width": 2,
                    size: "xs",
                    fill: "red",
                    class: normalizeClass(unref(styles).nodeRemove),
                    onClick: withModifiers(($event) => removeOne(node), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Close))
                    ]),
                    _: 2
                  }, 1032, ["class", "onClick"])
                ], 2)
              ], 2);
            }), 128)) : !(_ctx.search && showSearch.value) ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(unref(styles).placeholder)
            }, toDisplayString(_ctx.placeholder), 3)) : createCommentVNode("", true)
          ], 2),
          withDirectives(createElementVNode("input", {
            ref: "iptRef",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchInput.value = $event),
            class: normalizeClass(unref(styles).search),
            onInput: onSearchInput
          }, null, 34), [
            [vShow, _ctx.search && showSearch.value],
            [vModelText, searchInput.value]
          ])
        ], 2),
        _ctx.clearable && _ctx.nodes.length ? (openBlock(), createBlock(unref(Icon), {
          key: 0,
          size: "12",
          class: normalizeClass(unref(styles).clearIcon),
          onClick: withModifiers(clear, ["stop"])
        }, {
          default: withCtx(() => [
            createVNode(unref(Close))
          ]),
          _: 1
        }, 8, ["class", "onClick"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1 = ["onClick", "onMouseenter"];
const _sfc_main = defineComponent({
  ...{
    name: "Cascader",
    inheritAttrs: false
  },
  __name: "Cascader",
  props: {
    modelValue: {},
    placeholder: { default: "\u8BF7\u9009\u62E9" },
    emitPath: { type: Boolean, default: true },
    disabled: { type: Boolean },
    clearable: { type: Boolean, default: false },
    showAllLevels: { type: Boolean, default: true },
    autoFocus: { type: Boolean },
    changeOnSelect: { type: Boolean, default: false },
    separator: { default: "/" },
    data: { default: () => [] },
    trigger: { default: "click" },
    fieldNames: { default: () => ({}) },
    multiple: { type: Boolean, default: false },
    height: {},
    search: { type: Boolean, default: false }
  },
  emits: [
    "update:modelValue",
    "select",
    "search-change",
    "focus-change"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const generateKey = (val) => `_${val}_`;
    const looseEqual = (a, b) => a == b;
    const looseEqualArray = (a, b) => a.length === b.length && a.every((v, i) => looseEqual(v, b[i]));
    const mergeArray = (oldArr, newArr) => {
      const oldMap = oldArr.reduce((acc, item) => {
        acc[item.fullKey] = true;
        return acc;
      }, {});
      const newItems = newArr.filter((item) => !oldMap[item.fullKey]);
      return oldArr.concat(newItems);
    };
    const getCascaderStyles = () => ({
      dropdown: style`absolute z-dropdown`,
      panelContainer: style`flex mt-1 border border-line-accent rounded bg-content-white shadow`,
      scrollWrap: style`border-r border-line-accent overflow-hidden w-48 last-child:border-r-0 `,
      panel: style`overflow-scroll ${css`
    width: calc(100% + 28px);
    height: calc(100% + 38px);
  `}`,
      node: style`relative h-12 px-2 flex items-center cursor-pointer mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:(bg-fill-light rounded) text-sm`,
      nodeDisabled: style`text-content-neutral cursor-not-allowed`,
      nodeActive: style`text-brand-active text-base`,
      checkbox: style`h-auto pl-1`,
      icon: style`absolute right-4 text-sm`
    });
    const expand = ref(false);
    const cascaderRef = ref(null);
    onClickOutside(cascaderRef, () => {
      expand.value = false;
    });
    const normalize = (nodes2, name, path, key) => {
      const {
        label: labelField = "label",
        value: valueField = "value",
        children: childrenField = "children"
      } = props.fieldNames;
      return nodes2.map((node) => {
        const children = node[childrenField];
        const label = node[labelField];
        const value = node[valueField];
        const currentKey2 = generateKey(node[valueField]);
        const fullPath = (path || []).concat(value);
        const fullName = (name || []).concat(label);
        const fullKey = key ? `${key}@${currentKey2}` : `${currentKey2}`;
        const hasChildren = children && children.length !== 0;
        return {
          label,
          value,
          fullPath,
          fullName,
          fullKey,
          disabled: !!node.disabled,
          leaf: !hasChildren,
          children: hasChildren ? normalize(children, fullName, fullPath, fullKey) : void 0
        };
      });
    };
    const lists = ref([]);
    const allNodeTree = ref([]);
    const nodeTree = ref([]);
    watch(
      () => props.data,
      (val) => {
        const newTree = normalize(val);
        nodeTree.value = newTree;
        if (props.search) {
          allNodeTree.value = mergeArray(allNodeTree.value, newTree);
          lists.value = [nodeTree.value];
        } else {
          allNodeTree.value = newTree;
        }
      },
      {
        immediate: true
      }
    );
    const allNodes = computed(() => {
      const flatten = (nodes2, all) => {
        const nodeList = all || [];
        nodes2.forEach((node) => {
          const { children, ...other } = node;
          nodeList.push(other);
          if (children)
            flatten(children, nodeList);
        });
        return nodeList;
      };
      return flatten(allNodeTree.value);
    });
    const nodeMap = computed(() => {
      return allNodes.value.reduce((map, node) => {
        map[`${node.fullKey}`] = node;
        return map;
      }, {});
    });
    const currentKey = ref("");
    const resolveKey = (value, compareFn) => {
      const nodes2 = allNodes.value.filter((node) => compareFn(node, value));
      if (!nodes2.length)
        return "";
      if (nodes2.length !== 1) {
        console.warn(
          "value is not unique in the given data, consider set emitPath true and provide fullPath"
        );
        return "";
      }
      return nodes2[0].fullKey;
    };
    const fullKeys = computed(() => {
      const value = props.modelValue;
      if (props.multiple) {
        let keys = [];
        if (!Array.isArray(value)) {
          console.warn(
            "[Cascader] modelValue must be an array when multiple is true"
          );
          return [];
        }
        if (props.emitPath) {
          if (value.some((v) => !Array.isArray(v))) {
            console.log(
              "[Cascader] modelValue must be an array of array when emitPath is true"
            );
            return [];
          }
          keys = value.map(
            (item) => resolveKey(
              item,
              (node, value2) => looseEqualArray(node.fullPath, value2)
            )
          ).filter(Boolean);
        } else {
          keys = value.map(
            (item) => resolveKey(
              item,
              (node, value2) => looseEqual(node.value, value2)
            )
          ).filter(Boolean);
        }
        if (!keys.every((key2) => validKey.value[`${key2}`])) {
          console.warn("[Cascader] invalid value");
          return [];
        }
        return keys;
      }
      let key = "";
      if (props.emitPath) {
        if (!Array.isArray(value)) {
          console.warn("[Cascader] value must be a Array if emitPath is true");
          return [];
        }
        if (!value.length) {
          return [];
        }
        key = resolveKey(
          value,
          (node, value2) => looseEqualArray(node.fullPath, value2)
        );
      } else {
        key = resolveKey(
          value,
          (node, value2) => looseEqual(node.value, value2)
        );
      }
      if ((Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value.toString()) && !validKey.value[key]) {
        console.warn("[Cascader] invalid value");
        return [];
      }
      return key ? [key] : [];
    });
    const selectedKeyMap = computed(
      () => fullKeys.value.reduce((map, fullKey) => {
        map[fullKey] = true;
        return map;
      }, {})
    );
    const customHeight = computed(() => {
      if (props.height == void 0)
        return "14rem";
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return /^[0-9]{1,20}$/.test(props.height.trim()) ? props.height + "px" : props.height;
      }
    });
    const nodes = computed(
      () => fullKeys.value.map((fullKey) => nodeMap.value[fullKey])
    );
    const validKey = computed(() => {
      return allNodes.value.filter((node) => props.changeOnSelect ? true : node.leaf).reduce(
        (acc, node) => ({
          ...acc,
          [node.fullKey]: true
        }),
        {}
      );
    });
    const activePathMap = computed(() => {
      const currentKeyWayMap = currentKey.value ? allNodes.value.reduce((map, node) => {
        if (currentKey.value.indexOf(node.fullKey) === 0) {
          map[node.fullKey] = true;
        }
        return map;
      }, {}) : {};
      return {
        ...selectedKeyMap.value,
        ...currentKeyWayMap,
        [currentKey.value]: true
      };
    });
    const handleFocus = (val) => {
      emit("focus-change", val);
      if (val) {
        open();
      }
    };
    const open = () => {
      expand.value = true;
      if (props.multiple) {
        lists.value = [nodeTree.value];
        return;
      }
      const [cur] = fullKeys.value;
      if (cur) {
        lists.value = resolveLists(cur);
      } else {
        lists.value = [nodeTree.value];
      }
    };
    const expandLists = (start, len, inserted) => {
      lists.value.splice(start, len, inserted);
    };
    const resolveLists = (fullKey) => {
      const lists2 = [nodeTree.value];
      let node = nodeTree.value.find((item) => fullKey.indexOf(item.fullKey) === 0);
      while (node && node.fullKey !== fullKey) {
        if (node && node.children) {
          lists2.push(node.children);
          node = node.children.find((item) => fullKey.indexOf(item.fullKey) === 0);
        }
      }
      return lists2;
    };
    const removeNode = (node) => {
      if (props.multiple) {
        removeNodeValue(node);
        return;
      }
      replaceWithNodeValue();
    };
    const clearAll = () => {
      emit("update:modelValue", props.multiple || props.emitPath ? [] : "");
    };
    const selectNode = (node) => {
      emit("select", node);
      currentKey.value = node.fullKey;
      if (node.leaf || props.changeOnSelect) {
        if (!selectedKeyMap.value[node.fullKey]) {
          replaceWithNodeValue(node);
        }
        const selected = selectedKeyMap.value[node.fullKey];
        if (props.multiple) {
          checkChange(!selected, node);
        } else {
          if (!selected) {
            replaceWithNodeValue(node);
          }
        }
        if (node.leaf && !props.multiple) {
          expand.value = false;
        }
      }
    };
    const onItemClick = (node, depth) => {
      if (!node.disabled) {
        selectNode(node);
        if (!node.leaf && node.children) {
          expandLists(depth + 1, lists.value.length - depth, node.children);
        }
      }
    };
    const onItemMouseOver = (node, depth) => {
      if (!node.disabled) {
        if (props.trigger === "hover") {
          currentKey.value = node.fullKey;
          if (!node.leaf && node.children) {
            expandLists(depth + 1, lists.value.length - depth, node.children);
          }
        }
      }
    };
    const checkChange = (checked, node) => {
      if (checked) {
        addNodeValue(node);
      } else {
        removeNodeValue(node);
      }
    };
    const removeNodeValue = (node) => {
      if (props.emitPath) {
        emit(
          "update:modelValue",
          props.modelValue.filter(
            (i) => !looseEqualArray(i, node.fullPath)
          )
        );
        return;
      }
      emit(
        "update:modelValue",
        props.modelValue.filter((i) => i !== node.value)
      );
    };
    const addNodeValue = (node) => {
      if (props.emitPath) {
        emit("update:modelValue", [
          ...props.modelValue,
          node.fullPath
        ]);
        return;
      }
      emit("update:modelValue", [...props.modelValue, node.value]);
    };
    const replaceWithNodeValue = (node) => {
      if (!node) {
        emit("update:modelValue", props.emitPath ? [] : "");
        return;
      }
      emit("update:modelValue", props.emitPath ? node.fullPath : node.value);
    };
    onMounted(() => {
      if (props.autoFocus) {
        open();
      }
    });
    const handleSearchChange = (search) => {
      emit("search-change", search);
    };
    const styles = getCascaderStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "cascaderRef",
        ref: cascaderRef
      }, [
        createVNode(_sfc_main$1, {
          focus: expand.value,
          nodes: nodes.value,
          "show-all-levels": _ctx.showAllLevels,
          separator: _ctx.separator,
          placeholder: _ctx.placeholder,
          clearable: _ctx.clearable,
          search: _ctx.search,
          onSearchChange: handleSearchChange,
          "onUpdate:focus": handleFocus,
          onRemove: removeNode,
          onClear: clearAll
        }, null, 8, ["focus", "nodes", "show-all-levels", "separator", "placeholder", "clearable", "search"]),
        createElementVNode("div", {
          class: normalizeClass(unref(styles).dropdown)
        }, [
          withDirectives((openBlock(), createElementBlock("div", {
            class: normalizeClass(unref(styles).panelContainer),
            "data-align": "left"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(lists.value, (list, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: normalizeClass(unref(styles).scrollWrap),
                style: normalizeStyle({ height: customHeight.value })
              }, [
                createElementVNode("div", {
                  class: normalizeClass(unref(styles).panel)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list, (node) => {
                    return openBlock(), createElementBlock("div", {
                      key: node.value,
                      onClick: ($event) => onItemClick(node, index),
                      onMouseenter: ($event) => onItemMouseOver(node, index)
                    }, [
                      renderSlot(_ctx.$slots, "default", {
                        node,
                        active: activePathMap.value[node.fullKey],
                        selected: selectedKeyMap.value[node.fullKey],
                        leaf: node.leaf
                      }, () => [
                        createElementVNode("div", {
                          class: normalizeClass({
                            [unref(styles).node]: true,
                            [unref(styles).nodeDisabled]: node.disabled,
                            [unref(styles).nodeActive]: activePathMap.value[node.fullKey]
                          })
                        }, [
                          _ctx.multiple && (_ctx.changeOnSelect || node.leaf) ? (openBlock(), createBlock(unref(Checkbox), {
                            key: 0,
                            "model-value": selectedKeyMap.value[node.fullKey],
                            class: normalizeClass(unref(styles).checkbox),
                            "onUpdate:modelValue": ($event) => checkChange($event, node),
                            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                            }, ["stop"]))
                          }, null, 8, ["model-value", "class", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(node.label) + " ", 1),
                          !node.leaf ? (openBlock(), createBlock(unref(Icon), {
                            key: 1,
                            class: normalizeClass(unref(styles).icon)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowRight))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ], 40, _hoisted_1);
                  }), 128))
                ], 2)
              ], 6);
            }), 128))
          ], 2)), [
            [vShow, expand.value],
            [unref(autoPos)]
          ])
        ], 2)
      ], 512);
    };
  }
});
const Triggers = ["click", "hover"];
export { _sfc_main as Cascader, Triggers };
