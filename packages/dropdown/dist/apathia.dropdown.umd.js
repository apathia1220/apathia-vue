(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.button"), require("@apathia/apathia.popper"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.button", "@apathia/apathia.popper", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.dropdown = {}, global.Vue, global.button, global.popper, global.twind));
})(this, function(exports2, vue, apathia_button, apathia_popper, apathia_twind) {
  "use strict";
  const _sfc_main$2 = vue.defineComponent({
    ...{
      name: "Dropdown"
    },
    __name: "Dropdown",
    props: {
      delay: { default: 300 },
      disabled: { type: Boolean, default: false },
      label: { default: "" },
      trigger: { default: "click" },
      placement: { default: "bottom" },
      hideOnClick: { type: Boolean, default: false }
    },
    emits: ["show", "hide"],
    setup(__props, { emit }) {
      const props = __props;
      const getDropdownStyle = () => ({
        transitionClass: {
          "enter-from-class": apathia_twind.style`transform opacity-0 scale-95`,
          "enter-active-class": apathia_twind.style`transition ease-out duration-100`,
          "enter-to-class": apathia_twind.style`transform opacity-100 scale-100`,
          "leave-from-class": apathia_twind.style`transform opacity-100 scale-100`,
          "leave-active-class": apathia_twind.style`transition ease-in duration-75`,
          "leave-to-class": apathia_twind.style`transform opacity-0 scale-95`
        },
        staticStyle: {
          popper: apathia_twind.style`max-w-7xl rounded shadow-lg bg-fill-white`,
          divide: apathia_twind.style`divide-y divide-fill-light py-0`,
          iconClass: apathia_twind.style`text-xs`,
          baseButton: apathia_twind.style`m-0`
        }
      });
      const visible = vue.ref(false);
      const divide = vue.ref(false);
      const show = (state) => {
        emit("show", state);
      };
      const hide = (state) => {
        emit("hide", state);
      };
      vue.provide("dropdown", {
        hideOnClick: vue.computed(() => props.hideOnClick)
      });
      vue.provide("updateVisible", (v) => {
        visible.value = v;
      });
      vue.provide("updateDivide", (v) => {
        divide.value = v;
      });
      const { transitionClass, staticStyle } = getDropdownStyle();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(apathia_popper.Popper), {
          modelValue: visible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
          trigger: _ctx.trigger,
          placement: _ctx.placement,
          "show-arrow": false,
          "popper-class": `${vue.unref(staticStyle).popper} ${divide.value ? vue.unref(staticStyle).divide : ""}`,
          distance: 5,
          "transition-class": vue.unref(transitionClass),
          delay: _ctx.delay,
          disabled: _ctx.disabled,
          onShow: show,
          onHide: hide
        }, {
          content: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "dropdown")
          ]),
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createVNode(vue.unref(apathia_button.BaseButton), {
                class: vue.normalizeClass(vue.unref(staticStyle).baseButton)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.label) + " ", 1),
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(`v-icon v-icon-chevron-down ${vue.unref(staticStyle).iconClass}`)
                  }, null, 2)
                ]),
                _: 1
              }, 8, ["class"])
            ])
          ]),
          _: 3
        }, 8, ["modelValue", "trigger", "placement", "popper-class", "transition-class", "delay", "disabled"]);
      };
    }
  });
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "DropdownItem"
    },
    __name: "DropdownItem",
    props: {
      active: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false }
    },
    setup(__props) {
      const getDropdownItemStyle = () => ({
        menuItem: apathia_twind.style`block px-2 py-2 rounded text(sm content-primary) hover:bg-fill-light cursor-pointer`,
        active: apathia_twind.style`text-brand-active`,
        disabled: apathia_twind.style`text-content-neutral hover:bg-fill-white cursor-default pointer-events-none`
      });
      const dropdown = vue.inject("dropdown");
      const updateVisible = vue.inject("updateVisible");
      const clickCurItem = () => {
        var _a;
        if ((_a = dropdown == null ? void 0 : dropdown.hideOnClick) == null ? void 0 : _a.value) {
          updateVisible == null ? void 0 : updateVisible(false);
        }
      };
      const styles = getDropdownItemStyle();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass({
            [vue.unref(styles).menuItem]: true,
            [vue.unref(styles).active]: !_ctx.disabled && _ctx.active,
            [vue.unref(styles).disabled]: _ctx.disabled
          }),
          onClick: clickCurItem
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "DropdownGroup"
    },
    __name: "DropdownGroup",
    setup(__props) {
      const getDropdownGroupStyle = () => ({
        container: apathia_twind.style`py-1`
      });
      const updateDivide = vue.inject("updateDivide");
      const handleDivide = () => {
        updateDivide == null ? void 0 : updateDivide(true);
      };
      handleDivide();
      const styles = getDropdownGroupStyle();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).container)
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  exports2.Dropdown = _sfc_main$2;
  exports2.DropdownGroup = _sfc_main;
  exports2.DropdownItem = _sfc_main$1;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
