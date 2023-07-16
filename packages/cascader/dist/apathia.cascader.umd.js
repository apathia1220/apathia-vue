(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.hooks"), require("@apathia/apathia.checkbox"), require("@apathia/apathia.icon"), require("@apathia/apathia.shared"), require("@apathia/apathia.twind"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.hooks", "@apathia/apathia.checkbox", "@apathia/apathia.icon", "@apathia/apathia.shared", "@apathia/apathia.twind", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.cascader = {}, global.Vue, global.hooks, global.checkbox, global.icon, global.shared, global.twind, global["icon-svg"]));
})(this, function(exports2, vue, apathia_hooks, apathia_checkbox, apathia_icon, apathia_shared, apathia_twind, apathia_iconSvg) {
  "use strict";
  const _sfc_main$1 = vue.defineComponent({
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
          container: apathia_twind.style`w-full relative flex shadow h-8 border rounded border-line-accent bg-content-white text-sm items-center`,
          wrap: apathia_twind.style`h-full w-full overflow-hidden`,
          active: apathia_twind.style`border-brand-primary`,
          nodes: apathia_twind.style`w-full flex-1 flex-nowrap whitespace-nowrap py-btn-md-y px-1.5 overflow-x-hidden ${apathia_twind.css`
      height: calc(100% + 17px);
    `}`,
          search: apathia_twind.style`flex-1 outline-none`,
          tag: apathia_twind.style`rounded inline-flex text-xs text-content-accent items-center py-1 pl-1.5 bg-fill-light h-5 mr-1 flex-shrink-0`,
          iconWrap: apathia_twind.style`h-4 w-4 inline-flex items-center justify-center rounded-full ml-1`,
          nodeRemove: apathia_twind.style`p-1.5 text-content-accent hover:(text-content-primary) cursor-pointer`,
          clearIcon: apathia_twind.style`absolute right-2 top-1/2 -translate-y-2/4 cursor-pointer ml-2 text-content-neutral hover:(text-content-primary)`,
          placeholder: apathia_twind.style`text-content-secondary`
        };
      };
      const styles = getNodeStyles();
      const searchInput = vue.ref("");
      const onSearchInput = (e) => {
        emit("search-change", e.target.value);
        console.log(e);
      };
      const showSearch = vue.ref(false);
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
      const tagContainerRef = vue.ref(null);
      apathia_hooks.onClickOutside(tagContainerRef, () => {
        showSearch.value = false;
        searchInput.value = "";
        emit("search-change", "");
        emit("update:focus", false);
      });
      const { contentRef } = apathia_hooks.useScrollX(false);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "tagContainerRef",
          ref: tagContainerRef,
          class: vue.normalizeClass({
            [vue.unref(styles).container]: true,
            [vue.unref(styles).active]: _ctx.focus
          }),
          onClick: handleClick
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).wrap)
          }, [
            vue.createElementVNode("div", {
              ref_key: "contentRef",
              ref: contentRef,
              class: vue.normalizeClass(vue.unref(styles).nodes)
            }, [
              _ctx.nodes.length ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(_ctx.nodes, (node) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: node.fullKey,
                  class: vue.normalizeClass(vue.unref(styles).tag)
                }, [
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.showAllLevels ? node.fullName.join(_ctx.separator) : node.fullName[node.fullName.length - 1]), 1),
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(vue.unref(styles).iconWrap)
                  }, [
                    vue.createVNode(vue.unref(apathia_icon.Icon), {
                      "stroke-width": 2,
                      size: "xs",
                      fill: "red",
                      class: vue.normalizeClass(vue.unref(styles).nodeRemove),
                      onClick: vue.withModifiers(($event) => removeOne(node), ["stop"])
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(apathia_iconSvg.Close))
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"])
                  ], 2)
                ], 2);
              }), 128)) : !(_ctx.search && showSearch.value) ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                class: vue.normalizeClass(vue.unref(styles).placeholder)
              }, vue.toDisplayString(_ctx.placeholder), 3)) : vue.createCommentVNode("", true)
            ], 2),
            vue.withDirectives(vue.createElementVNode("input", {
              ref: "iptRef",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchInput.value = $event),
              class: vue.normalizeClass(vue.unref(styles).search),
              onInput: onSearchInput
            }, null, 34), [
              [vue.vShow, _ctx.search && showSearch.value],
              [vue.vModelText, searchInput.value]
            ])
          ], 2),
          _ctx.clearable && _ctx.nodes.length ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_icon.Icon), {
            key: 0,
            size: "12",
            class: vue.normalizeClass(vue.unref(styles).clearIcon),
            onClick: vue.withModifiers(clear, ["stop"])
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(apathia_iconSvg.Close))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : vue.createCommentVNode("", true)
        ], 2);
      };
    }
  });
  const _hoisted_1 = ["onClick", "onMouseenter"];
  const _sfc_main = vue.defineComponent({
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
        dropdown: apathia_twind.style`absolute z-dropdown`,
        panelContainer: apathia_twind.style`flex mt-1 border border-line-accent rounded bg-content-white shadow`,
        scrollWrap: apathia_twind.style`border-r border-line-accent overflow-hidden w-48 last-child:border-r-0 `,
        panel: apathia_twind.style`overflow-scroll ${apathia_twind.css`
    width: calc(100% + 28px);
    height: calc(100% + 38px);
  `}`,
        node: apathia_twind.style`relative h-12 px-2 flex items-center cursor-pointer mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:(bg-fill-light rounded) text-sm`,
        nodeDisabled: apathia_twind.style`text-content-neutral cursor-not-allowed`,
        nodeActive: apathia_twind.style`text-brand-active text-base`,
        checkbox: apathia_twind.style`h-auto pl-1`,
        icon: apathia_twind.style`absolute right-4 text-sm`
      });
      const expand = vue.ref(false);
      const cascaderRef = vue.ref(null);
      apathia_hooks.onClickOutside(cascaderRef, () => {
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
      const lists = vue.ref([]);
      const allNodeTree = vue.ref([]);
      const nodeTree = vue.ref([]);
      vue.watch(
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
      const allNodes = vue.computed(() => {
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
      const nodeMap = vue.computed(() => {
        return allNodes.value.reduce((map, node) => {
          map[`${node.fullKey}`] = node;
          return map;
        }, {});
      });
      const currentKey = vue.ref("");
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
      const fullKeys = vue.computed(() => {
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
      const selectedKeyMap = vue.computed(
        () => fullKeys.value.reduce((map, fullKey) => {
          map[fullKey] = true;
          return map;
        }, {})
      );
      const customHeight = vue.computed(() => {
        if (props.height == void 0)
          return "14rem";
        if (typeof props.height === "number") {
          return props.height + "px";
        } else {
          return /^[0-9]{1,20}$/.test(props.height.trim()) ? props.height + "px" : props.height;
        }
      });
      const nodes = vue.computed(
        () => fullKeys.value.map((fullKey) => nodeMap.value[fullKey])
      );
      const validKey = vue.computed(() => {
        return allNodes.value.filter((node) => props.changeOnSelect ? true : node.leaf).reduce(
          (acc, node) => ({
            ...acc,
            [node.fullKey]: true
          }),
          {}
        );
      });
      const activePathMap = vue.computed(() => {
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
      vue.onMounted(() => {
        if (props.autoFocus) {
          open();
        }
      });
      const handleSearchChange = (search) => {
        emit("search-change", search);
      };
      const styles = getCascaderStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "cascaderRef",
          ref: cascaderRef
        }, [
          vue.createVNode(_sfc_main$1, {
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
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(styles).dropdown)
          }, [
            vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(vue.unref(styles).panelContainer),
              "data-align": "left"
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(lists.value, (list, index) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key: index,
                  class: vue.normalizeClass(vue.unref(styles).scrollWrap),
                  style: vue.normalizeStyle({ height: customHeight.value })
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(vue.unref(styles).panel)
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(list, (node) => {
                      return vue.openBlock(), vue.createElementBlock("div", {
                        key: node.value,
                        onClick: ($event) => onItemClick(node, index),
                        onMouseenter: ($event) => onItemMouseOver(node, index)
                      }, [
                        vue.renderSlot(_ctx.$slots, "default", {
                          node,
                          active: activePathMap.value[node.fullKey],
                          selected: selectedKeyMap.value[node.fullKey],
                          leaf: node.leaf
                        }, () => [
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass({
                              [vue.unref(styles).node]: true,
                              [vue.unref(styles).nodeDisabled]: node.disabled,
                              [vue.unref(styles).nodeActive]: activePathMap.value[node.fullKey]
                            })
                          }, [
                            _ctx.multiple && (_ctx.changeOnSelect || node.leaf) ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_checkbox.Checkbox), {
                              key: 0,
                              "model-value": selectedKeyMap.value[node.fullKey],
                              class: vue.normalizeClass(vue.unref(styles).checkbox),
                              "onUpdate:modelValue": ($event) => checkChange($event, node),
                              onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                              }, ["stop"]))
                            }, null, 8, ["model-value", "class", "onUpdate:modelValue"])) : vue.createCommentVNode("", true),
                            vue.createTextVNode(" " + vue.toDisplayString(node.label) + " ", 1),
                            !node.leaf ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_icon.Icon), {
                              key: 1,
                              class: vue.normalizeClass(vue.unref(styles).icon)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(vue.unref(apathia_iconSvg.ArrowRight))
                              ]),
                              _: 1
                            }, 8, ["class"])) : vue.createCommentVNode("", true)
                          ], 2)
                        ])
                      ], 40, _hoisted_1);
                    }), 128))
                  ], 2)
                ], 6);
              }), 128))
            ], 2)), [
              [vue.vShow, expand.value],
              [vue.unref(apathia_shared.autoPos)]
            ])
          ], 2)
        ], 512);
      };
    }
  });
  const Triggers = ["click", "hover"];
  exports2.Cascader = _sfc_main;
  exports2.Triggers = Triggers;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
