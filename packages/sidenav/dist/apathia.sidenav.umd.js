(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.scroll-container"), require("@apathia/apathia.hooks"), require("@apathia/apathia.icon"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.scroll-container", "@apathia/apathia.hooks", "@apathia/apathia.icon", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sidenav = {}, global.Vue, global.twind, global["scroll-container"], global.hooks, global.icon, global["icon-svg"]));
})(this, function(exports2, vue, apathia_twind, apathia_scrollContainer, apathia_hooks, apathia_icon, apathia_iconSvg) {
  "use strict";
  const _hoisted_1 = ["id"];
  const _hoisted_2 = { key: 0 };
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "SideNode"
    },
    __name: "SideNode",
    props: {
      node: { default: () => ({}) },
      mini: { type: Boolean, default: false },
      activeKey: { default: "" },
      selectHandler: { type: Function, default: () => {
      } },
      keyField: { default: "key" }
    },
    setup(__props) {
      const props = __props;
      function initStyle() {
        return {
          sidenodeIconClass: apathia_twind.style`w-4 h-4`,
          sidenodeRowClass: apathia_twind.style`flex items-center cursor-pointer duration-300 px-3 py-6 h-8 overflow-hidden border-r-4 border-transparent hover:bg-brand-fill`,
          sidenodeRowActive: apathia_twind.style`bg-brand-fill text-brand-primary border-brand-primary`,
          sidenodeRowParentActive: apathia_twind.style`text-brand-primary`,
          sidenodeTurn: apathia_twind.style`rotate-180 duration-300`,
          sidenodeExpand: apathia_twind.style`text-xs duration-300`,
          sidenodeText: apathia_twind.style`flex-grow text-sm font-medium text-left truncate`,
          sidenodeChildren: apathia_twind.style`text-xs bg-brand-light transition-all duration-500 list-none`
        };
      }
      function isParent(nodes, current, key) {
        return platMenu(nodes).some((n) => n[key] === current);
      }
      function platMenu(nodes) {
        return nodes.reduce(
          (res, cur) => cur.children ? [...res, ...platMenu(cur.children), cur] : [...res, cur],
          []
        );
      }
      const styles = initStyle();
      const isActiveParent = vue.computed(
        () => props.node.children ? isParent(props.node.children, props.activeKey, props.keyField) : false
      );
      const isActiveItem = vue.computed(
        () => props.activeKey === props.node[props.keyField]
      );
      const [expand, toggleExpand, setExpand] = apathia_hooks.useToggle(!!isActiveParent.value);
      const expandClass = vue.computed(
        () => `${styles.sidenodeExpand} ${styles.sidenodeIconClass} ${expand.value ? styles.sidenodeTurn : ""}`
      );
      const rowClass = vue.computed(
        () => `${styles.sidenodeRowClass} ${isActiveParent.value ? styles.sidenodeRowParentActive : ""} ${props.activeKey === props.node[props.keyField] ? styles.sidenodeRowActive : ""}`
      );
      vue.watch(
        () => props.activeKey,
        () => {
          if (isActiveParent.value)
            setExpand(expand.value);
        }
      );
      const clickHandler = () => {
        if (props.node.children) {
          toggleExpand();
        } else {
          props.selectHandler(props.node);
        }
      };
      return (_ctx, _cache) => {
        const _component_SideNode = vue.resolveComponent("SideNode", true);
        return vue.openBlock(), vue.createElementBlock("li", null, [
          vue.renderSlot(_ctx.$slots, "default", {
            mini: _ctx.mini,
            activeParent: isActiveParent.value,
            expand: vue.unref(expand),
            activeItem: isActiveItem.value,
            onClick: clickHandler,
            node: _ctx.node
          }, () => [
            vue.createElementVNode("div", {
              id: isActiveItem.value ? "expandSideNode" : void 0,
              class: vue.normalizeClass(rowClass.value),
              onClick: clickHandler
            }, [
              vue.withDirectives(vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(styles).sidenodeText)
              }, vue.toDisplayString(_ctx.node.text), 3), [
                [vue.vShow, !_ctx.mini]
              ]),
              vue.withDirectives(vue.createVNode(vue.unref(apathia_icon.Icon), {
                class: vue.normalizeClass(expandClass.value)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(apathia_iconSvg.ArrowDown))
                ]),
                _: 1
              }, 8, ["class"]), [
                [vue.vShow, _ctx.node.children && !_ctx.mini]
              ])
            ], 10, _hoisted_1)
          ]),
          _ctx.node.children && !_ctx.mini ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            vue.withDirectives(vue.createElementVNode("ul", {
              class: vue.normalizeClass(vue.unref(styles).sidenodeChildren)
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.node.children, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_SideNode, {
                  key: index,
                  node: item,
                  "active-key": _ctx.activeKey,
                  "select-handler": _ctx.selectHandler,
                  "key-field": _ctx.keyField
                }, {
                  default: vue.withCtx(({
                    mini: miniValue,
                    activeParent: activeParentValue,
                    expand: expandValue,
                    activeItem: activeItemValue,
                    onClick: handleClick,
                    node: nodeValue
                  }) => [
                    vue.renderSlot(_ctx.$slots, "default", {
                      mini: miniValue,
                      activeParent: activeParentValue,
                      expand: expandValue,
                      activeItem: activeItemValue,
                      onClick: handleClick,
                      node: nodeValue
                    })
                  ]),
                  _: 2
                }, 1032, ["node", "active-key", "select-handler", "key-field"]);
              }), 128))
            ], 2), [
              [vue.vShow, vue.unref(expand)]
            ])
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  function useSideNav(props) {
    const filteredMenu = vue.ref([]);
    const scrollTop = vue.ref(0);
    const filterKeyMap = vue.computed(() => createKeyMap(props.menuList));
    filteredMenu.value = props.menuList;
    const [isHover, toggleHover] = apathia_hooks.useToggle(false);
    const showMini = vue.computed(() => props.mini ? !isHover.value : false);
    function createKeyMap(menu, parentNode) {
      let keyMap = {};
      for (const node of menu) {
        keyMap[node.text || ""] = parentNode || node;
        if (node.children) {
          keyMap = Object.assign(Object.assign({}, keyMap), createKeyMap(node.children, parentNode || node));
        }
      }
      return keyMap;
    }
    vue.onMounted(() => {
      setTimeout(() => {
        scrollTop.value = scrollToExpand();
      }, 400);
    });
    function onInput(event) {
      const { value } = event.target;
      filteredMenu.value = value === "" ? props.menuList : filterMenu(filterKeyMap.value, value);
    }
    function getSidenavInputProps() {
      return {
        onInput
      };
    }
    function getScrollContainerProps() {
      return scrollTop.value ? { scrollTop: scrollTop.value } : {};
    }
    function getContainerProps() {
      return {
        onMouseenter: toggleHover,
        onMouseleave: toggleHover
      };
    }
    return {
      getContainerProps,
      getSidenavInputProps,
      getScrollContainerProps,
      filteredMenu,
      showMini
    };
  }
  function filterMenu(keyMap, keyword) {
    const keyWordList = Object.keys(keyMap);
    return keyWordList.filter((x) => x.includes(keyword)).map((y) => keyMap[y]);
  }
  function scrollToExpand() {
    const containerHeight = window.innerHeight;
    const el = document.querySelector("#expandSideNode");
    if (!el)
      return 0;
    const scrollTop = el.offsetTop - containerHeight / 2;
    return scrollTop >= 0 ? scrollTop : 0;
  }
  const _sfc_main = vue.defineComponent({
    ...{
      name: "SideNav"
    },
    __name: "SideNav",
    props: {
      menuList: { default: () => [] },
      activeKey: { default: "" },
      mini: { type: Boolean, default: false },
      search: { type: Boolean, default: false },
      keyField: { default: "key" }
    },
    emits: ["select"],
    setup(__props, { emit }) {
      const props = __props;
      function initStyle() {
        const baseSidenav = "block duration-100 text-content-secondary py-4 relative";
        return {
          sidenavClass: apathia_twind.style`${baseSidenav} min-h-full`,
          sidenavMiniClass: apathia_twind.style`${baseSidenav} w-12 min-h-full`,
          sidenavInputWrap: apathia_twind.style`px-4`,
          sidenavInput: apathia_twind.style`bg-fill-accent px-2 my-2 bg-opacity-30 h-9 outline-none text-content-accent rounded placeholder-content-neutral w-full focus:(bg-fill-gray text-content-primary)`
        };
      }
      const {
        getContainerProps,
        getSidenavInputProps,
        filteredMenu,
        showMini,
        getScrollContainerProps
      } = useSideNav(props);
      const styles = initStyle();
      const selectNode = (node) => emit("select", node);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(apathia_scrollContainer.ScrollContainer), vue.mergeProps({ size: 7 }, vue.unref(getScrollContainerProps)(), { "auto-hide": "" }), {
          default: vue.withCtx(() => [
            vue.createElementVNode("ul", vue.mergeProps({
              class: vue.unref(showMini) ? vue.unref(styles).sidenavMiniClass : vue.unref(styles).sidenavClass
            }, { ...vue.unref(getContainerProps)() }), [
              vue.renderSlot(_ctx.$slots, "menuTop"),
              vue.withDirectives(vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(styles).sidenavInputWrap)
              }, [
                vue.createElementVNode("input", vue.mergeProps({ ...vue.unref(getSidenavInputProps)() }, {
                  placeholder: "search",
                  class: vue.unref(styles).sidenavInput
                }), null, 16)
              ], 2), [
                [vue.vShow, _ctx.search && !vue.unref(showMini)]
              ]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(filteredMenu), (node) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$1, {
                  key: node[_ctx.activeKey],
                  node,
                  "active-key": _ctx.activeKey,
                  "key-field": _ctx.keyField,
                  mini: vue.unref(showMini),
                  "select-handler": selectNode
                }, {
                  default: vue.withCtx(({
                    mini: miniValue,
                    activeParent: activeParentValue,
                    expand: expandValue,
                    activeItem: activeItemValue,
                    onClick: clickHandler,
                    node: nodeValue
                  }) => [
                    vue.renderSlot(_ctx.$slots, "default", {
                      mini: miniValue,
                      activeParent: activeParentValue,
                      expand: expandValue,
                      activeItem: activeItemValue,
                      onClick: clickHandler,
                      node: nodeValue
                    })
                  ]),
                  _: 2
                }, 1032, ["node", "active-key", "key-field", "mini"]);
              }), 128)),
              vue.renderSlot(_ctx.$slots, "menuBottom")
            ], 16)
          ]),
          _: 3
        }, 16);
      };
    }
  });
  exports2.SideNav = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
