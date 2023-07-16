(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.shared"), require("@apathia/apathia.hooks"), require("@apathia/apathia.popper"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.shared", "@apathia/apathia.hooks", "@apathia/apathia.popper", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.navbar = {}, global.Vue, global.shared, global.hooks, global.popper, global.twind));
})(this, function(exports2, vue, apathia_shared, apathia_hooks, apathia_popper, apathia_twind) {
  "use strict";
  const _hoisted_1 = ["onClick"];
  const _hoisted_2 = ["onClick"];
  const _sfc_main = vue.defineComponent({
    __name: "Navbar",
    props: {
      type: { default: "default" },
      modelValue: { default: "" },
      list: {},
      trigger: { default: "hover" },
      disabledParent: { type: Boolean, default: true }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit }) {
      const props = __props;
      function initStyle(type) {
        const radius = apathia_twind.css`
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  `;
        const Theme = {
          default: {
            nav: apathia_twind.apply`bg-fill-light hover:(bg-fill-gray) ${apathia_twind.apply`${radius}`}`,
            activeNav: apathia_twind.apply`bg-brand-primary text-content-white hover:(bg-brand-hover) ${apathia_twind.apply`${radius}`}`
          },
          underline: {
            nav: apathia_twind.apply`border-transparent border-b-2 mx-1 hover:(text-brand-hover)`,
            activeNav: apathia_twind.apply`text-brand-primary border-brand-primary border-b-2 hover:(text-brand-hover border-brand-hover)`
          }
        };
        const theme = Theme[type] || Theme.default;
        const primaryLayout = apathia_twind.apply`block text-center text-sm cursor-pointer px-4 py-1.5 transition duration-300`;
        const wrapper = apathia_twind.style`overflow-hidden`;
        const layoutContainer = apathia_twind.style`flex items-center py-2 text-content-primary`;
        const layoutNav = apathia_twind.style`${theme.nav} ${primaryLayout}`;
        const activeNav = apathia_twind.style`${theme.activeNav}`;
        const icon = apathia_twind.style`mr-1`;
        const childNavClass = {
          popper: apathia_twind.style`p-0 rounded`,
          nav: `${apathia_twind.style`px-4 py-1.5`} ${layoutNav}`,
          activeNav
        };
        return {
          wrapper,
          layoutContainer,
          layoutNav,
          activeNav,
          icon,
          childNavClass
        };
      }
      function isParent(nodes, text) {
        return text && platMenu(nodes).some((n) => n.value === text);
      }
      function platMenu(nodes) {
        return nodes.reduce((acc, cur) => {
          if (cur.children && Array.isArray(cur.children) && cur.children.length) {
            return acc.concat(platMenu(cur.children));
          }
          return acc.concat(cur);
        }, []);
      }
      const { modelValue } = vue.toRefs(props);
      const { contentRef } = apathia_hooks.useScrollX();
      const styles = initStyle(props.type);
      function isActive(nav) {
        return nav.value === modelValue.value;
      }
      function isActiveParent(nav) {
        return nav.children && isParent(nav.children, modelValue.value);
      }
      function handle(nav) {
        emit("update:modelValue", nav.value);
        emit("change", nav);
      }
      function parentBindClick(nav) {
        if (!nav.children || nav.children && !props.disabledParent) {
          handle(nav);
        } else {
          apathia_shared.noop();
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).wrapper)
        }, [
          vue.createElementVNode("ul", {
            ref_key: "contentRef",
            ref: contentRef,
            class: vue.normalizeClass(vue.unref(styles).layoutContainer)
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.list, (nav) => {
              return vue.openBlock(), vue.createElementBlock("li", {
                key: nav.value,
                class: vue.normalizeClass(`${vue.unref(styles).layoutNav} ${isActive(nav) || isActiveParent(nav) ? vue.unref(styles).activeNav : ""}`),
                onClick: ($event) => parentBindClick(nav)
              }, [
                !nav.children ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  nav.iconClass ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 0,
                    class: vue.normalizeClass(`${nav.iconClass} ${vue.unref(styles).icon}`)
                  }, null, 2)) : vue.createCommentVNode("", true),
                  vue.renderSlot(_ctx.$slots, "label", { nav }, () => [
                    vue.createElementVNode("span", null, vue.toDisplayString(nav.label), 1)
                  ])
                ], 64)) : (vue.openBlock(), vue.createBlock(vue.unref(apathia_popper.Popper), {
                  key: 1,
                  placement: "bottom",
                  trigger: "hover",
                  "popper-class": vue.unref(styles).childNavClass.popper,
                  "show-arrow": false
                }, {
                  content: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(nav.children, (childNav) => {
                      return vue.openBlock(), vue.createElementBlock("li", {
                        key: childNav.value,
                        class: vue.normalizeClass(`${vue.unref(styles).childNavClass.nav} ${isActive(childNav) ? vue.unref(styles).childNavClass.activeNav : ""}`),
                        onClick: ($event) => handle(childNav)
                      }, [
                        childNav.iconClass ? (vue.openBlock(), vue.createElementBlock("span", {
                          key: 0,
                          class: vue.normalizeClass(`${childNav.iconClass} ${vue.unref(styles).icon}`)
                        }, null, 2)) : vue.createCommentVNode("", true),
                        vue.renderSlot(_ctx.$slots, "label", { nav: childNav }, () => [
                          vue.createElementVNode("span", null, vue.toDisplayString(childNav.label), 1)
                        ])
                      ], 10, _hoisted_2);
                    }), 128))
                  ]),
                  default: vue.withCtx(() => [
                    nav.iconClass ? (vue.openBlock(), vue.createElementBlock("span", {
                      key: 0,
                      class: vue.normalizeClass(nav.iconClass)
                    }, null, 2)) : vue.createCommentVNode("", true),
                    vue.renderSlot(_ctx.$slots, "label", { nav }, () => [
                      vue.createElementVNode("span", null, vue.toDisplayString(nav.label), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["popper-class"]))
              ], 10, _hoisted_1);
            }), 128))
          ], 2)
        ], 2);
      };
    }
  });
  exports2.Navbar = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
