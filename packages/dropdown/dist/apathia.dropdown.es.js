import { defineComponent, ref, provide, computed, openBlock, createBlock, unref, withCtx, renderSlot, createVNode, normalizeClass, createTextVNode, toDisplayString, createElementVNode, inject, createElementBlock } from "vue";
import { BaseButton } from "@apathia/apathia.button";
import { Popper } from "@apathia/apathia.popper";
import { style } from "@apathia/apathia.twind";
const _sfc_main$2 = defineComponent({
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
        "enter-from-class": style`transform opacity-0 scale-95`,
        "enter-active-class": style`transition ease-out duration-100`,
        "enter-to-class": style`transform opacity-100 scale-100`,
        "leave-from-class": style`transform opacity-100 scale-100`,
        "leave-active-class": style`transition ease-in duration-75`,
        "leave-to-class": style`transform opacity-0 scale-95`
      },
      staticStyle: {
        popper: style`max-w-7xl rounded shadow-lg bg-fill-white`,
        divide: style`divide-y divide-fill-light py-0`,
        iconClass: style`text-xs`,
        baseButton: style`m-0`
      }
    });
    const visible = ref(false);
    const divide = ref(false);
    const show = (state) => {
      emit("show", state);
    };
    const hide = (state) => {
      emit("hide", state);
    };
    provide("dropdown", {
      hideOnClick: computed(() => props.hideOnClick)
    });
    provide("updateVisible", (v) => {
      visible.value = v;
    });
    provide("updateDivide", (v) => {
      divide.value = v;
    });
    const { transitionClass, staticStyle } = getDropdownStyle();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Popper), {
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        trigger: _ctx.trigger,
        placement: _ctx.placement,
        "show-arrow": false,
        "popper-class": `${unref(staticStyle).popper} ${divide.value ? unref(staticStyle).divide : ""}`,
        distance: 5,
        "transition-class": unref(transitionClass),
        delay: _ctx.delay,
        disabled: _ctx.disabled,
        onShow: show,
        onHide: hide
      }, {
        content: withCtx(() => [
          renderSlot(_ctx.$slots, "dropdown")
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createVNode(unref(BaseButton), {
              class: normalizeClass(unref(staticStyle).baseButton)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.label) + " ", 1),
                createElementVNode("span", {
                  class: normalizeClass(`v-icon v-icon-chevron-down ${unref(staticStyle).iconClass}`)
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
const _sfc_main$1 = defineComponent({
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
      menuItem: style`block px-2 py-2 rounded text(sm content-primary) hover:bg-fill-light cursor-pointer`,
      active: style`text-brand-active`,
      disabled: style`text-content-neutral hover:bg-fill-white cursor-default pointer-events-none`
    });
    const dropdown = inject("dropdown");
    const updateVisible = inject("updateVisible");
    const clickCurItem = () => {
      var _a;
      if ((_a = dropdown == null ? void 0 : dropdown.hideOnClick) == null ? void 0 : _a.value) {
        updateVisible == null ? void 0 : updateVisible(false);
      }
    };
    const styles = getDropdownItemStyle();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          [unref(styles).menuItem]: true,
          [unref(styles).active]: !_ctx.disabled && _ctx.active,
          [unref(styles).disabled]: _ctx.disabled
        }),
        onClick: clickCurItem
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
const _sfc_main = defineComponent({
  ...{
    name: "DropdownGroup"
  },
  __name: "DropdownGroup",
  setup(__props) {
    const getDropdownGroupStyle = () => ({
      container: style`py-1`
    });
    const updateDivide = inject("updateDivide");
    const handleDivide = () => {
      updateDivide == null ? void 0 : updateDivide(true);
    };
    handleDivide();
    const styles = getDropdownGroupStyle();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).container)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
export { _sfc_main$2 as Dropdown, _sfc_main as DropdownGroup, _sfc_main$1 as DropdownItem };
