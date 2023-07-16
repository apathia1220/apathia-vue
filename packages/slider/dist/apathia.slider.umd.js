(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.popper"), require("@apathia/apathia.hooks"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.popper", "@apathia/apathia.hooks", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.slider = {}, global.Vue, global.popper, global.hooks, global.twind));
})(this, function(exports2, vue, apathia_popper, apathia_hooks, apathia_twind) {
  "use strict";
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "Stop"
    },
    __name: "Stop",
    props: {
      step: {},
      min: {},
      max: {},
      vertical: { type: Boolean },
      marks: { default: () => ({}) }
    },
    setup(__props) {
      const props = __props;
      const getStopStyles = () => ({
        stopWrap: apathia_twind.style`absolute`,
        stopWrapX: apathia_twind.style`w-full h-1 top-2`,
        stopWrapY: apathia_twind.style`h-full w-1`,
        stop: apathia_twind.style`w-1 h-1 absolute inline-block bg-fill-white rounded-full`,
        stopX: apathia_twind.style``,
        stopY: apathia_twind.style``,
        stopText: apathia_twind.style`inline-block whitespace-nowrap`,
        stopTextX: apathia_twind.style`-translate-x-1/2 pt-3`,
        stopTextY: apathia_twind.style`-translate-y-1/2 pl-3`
      });
      const stepCount = vue.computed(() => (props.max - props.min) / props.step);
      const getValueByStep = (s) => props.min + props.step * s;
      const styles = getStopStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass([vue.unref(styles).stopWrap, _ctx.vertical ? vue.unref(styles).stopWrapY : vue.unref(styles).stopWrapX])
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(stepCount.value + 1, (count, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: index,
              class: vue.normalizeClass([vue.unref(styles).stop, _ctx.vertical ? vue.unref(styles).stopY : vue.unref(styles).stopX]),
              style: vue.normalizeStyle({
                [_ctx.vertical ? "bottom" : "left"]: `${1 / stepCount.value * index * 100}%`
              })
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass([
                  vue.unref(styles).stopText,
                  _ctx.vertical ? vue.unref(styles).stopTextY : vue.unref(styles).stopTextX
                ]),
                style: vue.normalizeStyle((_ctx.marks[getValueByStep(count - 1)] || {}).style)
              }, vue.toDisplayString((_ctx.marks[getValueByStep(count - 1)] || {}).label), 7)
            ], 6);
          }), 128))
        ], 2);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Slider"
    },
    __name: "Slider",
    props: {
      modelValue: {},
      disabled: { type: Boolean },
      min: { default: 0 },
      max: { default: 100 },
      step: { default: 1 },
      showSteps: { type: Boolean },
      showTooltip: { type: Boolean, default: true },
      formatTooltip: { type: Function, default: (cur) => cur },
      range: { type: Boolean },
      valueRange: {},
      marks: { default: () => ({}) },
      vertical: { type: Boolean },
      height: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      const getSliderStyles = () => ({
        sliderWrap: apathia_twind.style`text-2xl`,
        slider: apathia_twind.style`group relative h-2 box-border inline-block`,
        sliderX: apathia_twind.style`py-2 w-full`,
        sliderY: apathia_twind.style`px-2`,
        track: apathia_twind.style`absolute bg-fill-gray rounded transition group-hover:bg-fill-secondary`,
        trackX: apathia_twind.style`h-1 w-full`,
        trackY: apathia_twind.style`w-1 h-full`,
        trackHover: apathia_twind.style`bg-fill-secondary`,
        steps: apathia_twind.style`relative rounded bg-brand-primary group-hover:bg-brand-active`,
        stepsX: apathia_twind.style`h-1`,
        stepsY: apathia_twind.style`w-1 absolute bottom-0`,
        stepsHover: apathia_twind.style`bg-brand-active`,
        button: apathia_twind.style`group-hover:border-brand-active border(2 solid brand-primary) h-4 w-4 bg-fill-white rounded-lg cursor-pointer ${apathia_twind.css`
    z-index: 1;
  `}`,
        popperWrap: apathia_twind.style`absolute`,
        buttonHover: apathia_twind.style`border-brand-active`,
        buttonX: apathia_twind.style`-translate-x-1/2${apathia_twind.css`
    top: 2px;
  `}`,
        buttonY: apathia_twind.style`translate-y-1/2${apathia_twind.css`
    left: 2px;
  `}`
      });
      const isTouchEvent = (e) => e.type.startsWith("touch");
      const styles = getSliderStyles();
      const trackRef = vue.ref(null);
      const moveRange = vue.reactive({
        clientX: [0, 0],
        clientY: [0, 0]
      });
      const disableDrag = apathia_hooks.useInjectProp("Form", false, vue.toRef(props, "disabled"));
      const buttonRef = vue.ref(null);
      const buttonSize = vue.ref(0);
      const popperRef = vue.ref(null);
      const popperVisible = vue.ref(false);
      vue.onMounted(() => {
        if (trackRef.value) {
          const { x, y, height, width } = trackRef.value.getBoundingClientRect();
          moveRange.clientX = props.vertical ? [0, 0] : [x, x + width];
          moveRange.clientY = props.vertical ? [y, y + height] : [0, 0];
        }
        if (buttonRef.value) {
          buttonSize.value = buttonRef.value.offsetWidth;
        }
      });
      const [dragging, , setDragging] = apathia_hooks.useToggle(false);
      const btnEndStyle = vue.computed(() => {
        const value = `${((props.modelValue - props.min) / props.max - props.min) * 100}%`;
        return props.vertical ? { bottom: value } : { left: value };
      });
      const sliderStyle = vue.computed(
        () => props.vertical ? { height: `${props.height}px` } : {}
      );
      const stepsStyle = vue.computed(() => {
        const value = `${((props.modelValue - props.min) / props.max - props.min) * 100}%`;
        return props.vertical ? { height: value } : { width: value };
      });
      const stopFns = [];
      const startDrag = (e) => {
        if (disableDrag.value) {
          return;
        }
        e.preventDefault();
        setDragging(true);
        stopFns.push(apathia_hooks.useEventListener(window, "mousemove", handleDragging));
        stopFns.push(apathia_hooks.useEventListener(window, "touchmove", handleDragging));
        stopFns.push(apathia_hooks.useEventListener(window, "mouseup", stopDrag));
        stopFns.push(apathia_hooks.useEventListener(window, "touchend", stopDrag));
        stopFns.push(apathia_hooks.useEventListener(window, "contextmenu", stopDrag));
      };
      const stopDrag = () => {
        setDragging(false);
        stopFns.forEach((fn) => fn && fn());
        popperVisible.value = false;
      };
      const resolveValueInRange = (targetPos, posRange) => {
        const valueRange = [props.min, props.max];
        const step = props.step;
        const totalPixels = posRange[1] - posRange[0];
        const stepPixels = totalPixels / ((valueRange[1] - valueRange[0]) / step);
        const deltaPixel = targetPos - posRange[0];
        let result = props.vertical ? props.max : props.min;
        const stepFn = (cur) => props.vertical ? cur - step : cur + step;
        let beginPixel = 0;
        while (beginPixel <= totalPixels) {
          if (beginPixel <= deltaPixel && deltaPixel <= beginPixel + stepPixels) {
            break;
          }
          beginPixel += stepPixels;
          result = stepFn(result);
        }
        return deltaPixel - beginPixel > beginPixel + stepPixels - deltaPixel ? stepFn(result) : result;
      };
      const getFinalValue = (position) => {
        const trackEl = trackRef.value;
        if (!trackEl) {
          return 0;
        }
        const rect = trackEl.getBoundingClientRect();
        const positionRange = props.vertical ? [rect.y, rect.y + rect.height] : [rect.x, rect.x + rect.width];
        if (!props.vertical && position.clientX >= positionRange[1] || props.vertical && position.clientY <= positionRange[0]) {
          return props.max;
        }
        if (!props.vertical && position.clientX <= positionRange[0] || props.vertical && position.clientY >= positionRange[1]) {
          return props.min;
        }
        return resolveValueInRange(
          props.vertical ? position.clientY : position.clientX,
          positionRange
        );
      };
      const handleDragging = (e) => {
        if (dragging.value) {
          handleTrackClick(e);
          if (popperRef.value && popperRef.value.update && typeof popperRef.value.update === "function") {
            popperRef.value && popperRef.value.update();
          }
          popperVisible.value = true;
        }
      };
      const handleTrackClick = (e) => {
        if (!disableDrag.value) {
          const value = getFinalValue(getClientPosition(e));
          let valueInRange = true;
          if (props.valueRange !== void 0) {
            const [rangeMin = props.min, rangeMax = props.max] = props.valueRange;
            valueInRange = value >= rangeMin && value <= rangeMax;
          }
          if (valueInRange) {
            emit("update:modelValue", value);
          }
        }
      };
      const getClientPosition = (e) => {
        let clientX;
        let clientY;
        if (isTouchEvent(e)) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        return {
          clientX,
          clientY
        };
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(styles).sliderWrap)
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass({
              [vue.unref(styles).slider]: true,
              [vue.unref(styles).sliderX]: !_ctx.vertical,
              [vue.unref(styles).sliderY]: _ctx.vertical
            }),
            style: vue.normalizeStyle(sliderStyle.value),
            onClick: handleTrackClick
          }, [
            vue.createElementVNode("div", {
              ref_key: "trackRef",
              ref: trackRef,
              class: vue.normalizeClass({
                [vue.unref(styles).track]: true,
                [vue.unref(styles).trackX]: !_ctx.vertical,
                [vue.unref(styles).trackY]: _ctx.vertical,
                [vue.unref(styles).trackHover]: vue.unref(dragging)
              })
            }, null, 2),
            vue.createElementVNode("div", {
              class: vue.normalizeClass({
                [vue.unref(styles).steps]: true,
                [vue.unref(styles).stepsX]: !_ctx.vertical,
                [vue.unref(styles).stepsY]: _ctx.vertical,
                [vue.unref(styles).stepsHover]: vue.unref(dragging)
              }),
              style: vue.normalizeStyle(stepsStyle.value)
            }, null, 6),
            _ctx.showSteps ? (vue.openBlock(), vue.createBlock(_sfc_main$1, {
              key: 0,
              step: _ctx.step,
              min: _ctx.min,
              max: _ctx.max,
              vertical: _ctx.vertical,
              marks: _ctx.marks
            }, null, 8, ["step", "min", "max", "vertical", "marks"])) : vue.createCommentVNode("", true),
            _ctx.showTooltip ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_popper.Popper), {
              key: 1,
              ref_key: "popperRef",
              ref: popperRef,
              modelValue: popperVisible.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => popperVisible.value = $event),
              dark: "",
              placement: _ctx.vertical ? "right" : "bottom",
              trigger: "hover",
              class: vue.normalizeClass([vue.unref(styles).popperWrap, _ctx.vertical ? vue.unref(styles).buttonY : vue.unref(styles).buttonX]),
              style: vue.normalizeStyle(btnEndStyle.value)
            }, {
              content: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(_ctx.formatTooltip(_ctx.modelValue)), 1)
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("div", {
                  ref_key: "buttonRef",
                  ref: buttonRef,
                  class: vue.normalizeClass([vue.unref(styles).button, vue.unref(dragging) ? vue.unref(styles).buttonHover : ""]),
                  onMousedown: startDrag
                }, null, 34)
              ]),
              _: 1
            }, 8, ["modelValue", "placement", "class", "style"])) : vue.createCommentVNode("", true)
          ], 6)
        ], 2);
      };
    }
  });
  exports2.Slider = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
