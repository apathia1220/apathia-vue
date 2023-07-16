import { defineComponent, toRefs, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, Fragment, renderList, createCommentVNode, renderSlot, toDisplayString, createBlock, withCtx } from "vue";
import { noop } from "@apathia/apathia.shared";
import { useScrollX } from "@apathia/apathia.hooks";
import { Popper } from "@apathia/apathia.popper";
import { css, apply, style } from "@apathia/apathia.twind";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onClick"];
const _sfc_main = defineComponent({
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
      const radius = css`
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  `;
      const Theme = {
        default: {
          nav: apply`bg-fill-light hover:(bg-fill-gray) ${apply`${radius}`}`,
          activeNav: apply`bg-brand-primary text-content-white hover:(bg-brand-hover) ${apply`${radius}`}`
        },
        underline: {
          nav: apply`border-transparent border-b-2 mx-1 hover:(text-brand-hover)`,
          activeNav: apply`text-brand-primary border-brand-primary border-b-2 hover:(text-brand-hover border-brand-hover)`
        }
      };
      const theme = Theme[type] || Theme.default;
      const primaryLayout = apply`block text-center text-sm cursor-pointer px-4 py-1.5 transition duration-300`;
      const wrapper = style`overflow-hidden`;
      const layoutContainer = style`flex items-center py-2 text-content-primary`;
      const layoutNav = style`${theme.nav} ${primaryLayout}`;
      const activeNav = style`${theme.activeNav}`;
      const icon = style`mr-1`;
      const childNavClass = {
        popper: style`p-0 rounded`,
        nav: `${style`px-4 py-1.5`} ${layoutNav}`,
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
    const { modelValue } = toRefs(props);
    const { contentRef } = useScrollX();
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
        noop();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).wrapper)
      }, [
        createElementVNode("ul", {
          ref_key: "contentRef",
          ref: contentRef,
          class: normalizeClass(unref(styles).layoutContainer)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (nav) => {
            return openBlock(), createElementBlock("li", {
              key: nav.value,
              class: normalizeClass(`${unref(styles).layoutNav} ${isActive(nav) || isActiveParent(nav) ? unref(styles).activeNav : ""}`),
              onClick: ($event) => parentBindClick(nav)
            }, [
              !nav.children ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                nav.iconClass ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(`${nav.iconClass} ${unref(styles).icon}`)
                }, null, 2)) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "label", { nav }, () => [
                  createElementVNode("span", null, toDisplayString(nav.label), 1)
                ])
              ], 64)) : (openBlock(), createBlock(unref(Popper), {
                key: 1,
                placement: "bottom",
                trigger: "hover",
                "popper-class": unref(styles).childNavClass.popper,
                "show-arrow": false
              }, {
                content: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(nav.children, (childNav) => {
                    return openBlock(), createElementBlock("li", {
                      key: childNav.value,
                      class: normalizeClass(`${unref(styles).childNavClass.nav} ${isActive(childNav) ? unref(styles).childNavClass.activeNav : ""}`),
                      onClick: ($event) => handle(childNav)
                    }, [
                      childNav.iconClass ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(`${childNav.iconClass} ${unref(styles).icon}`)
                      }, null, 2)) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "label", { nav: childNav }, () => [
                        createElementVNode("span", null, toDisplayString(childNav.label), 1)
                      ])
                    ], 10, _hoisted_2);
                  }), 128))
                ]),
                default: withCtx(() => [
                  nav.iconClass ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(nav.iconClass)
                  }, null, 2)) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "label", { nav }, () => [
                    createElementVNode("span", null, toDisplayString(nav.label), 1)
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
export { _sfc_main as Navbar };
