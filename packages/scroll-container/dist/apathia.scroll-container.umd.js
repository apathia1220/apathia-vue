(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("element-resize-detector"), require("@apathia/apathia.shared"), require("@apathia/apathia.twind"), require("lodash-es")) : typeof define === "function" && define.amd ? define(["exports", "vue", "element-resize-detector", "@apathia/apathia.shared", "@apathia/apathia.twind", "lodash-es"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["scroll-container"] = {}, global.Vue, global["element-resize-detector"], global.shared, global.twind, global["lodash-es"]));
})(this, function(exports2, vue, ElementResizeDetectorMaker, apathia_shared, apathia_twind, lodashEs) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var ElementResizeDetectorMaker__default = /* @__PURE__ */ _interopDefaultLegacy(ElementResizeDetectorMaker);
  const _sfc_main$1 = vue.defineComponent({
    ...{
      name: "Scrollbar"
    },
    __name: "Scrollbar",
    props: {
      move: {},
      length: {},
      size: {},
      hide: { type: Boolean },
      type: {}
    },
    emits: ["change"],
    setup(__props, { emit }) {
      const props = __props;
      const getBarStyles = () => ({
        track: apathia_twind.style`transition-opacity group`,
        slide: apathia_twind.style`bg-fill-neutral group-hover:bg-fill-accent`
      });
      const trackPosition = vue.reactive({
        clientX: 0,
        clientY: 0
      });
      const track = vue.ref(0);
      const dragging = vue.ref(false);
      const trackContainerRef = vue.ref(null);
      const fields = vue.computed(() => {
        const isHorizontal = props.type === "horizontal";
        return {
          track: isHorizontal ? "offsetWidth" : "offsetHeight",
          size: isHorizontal ? "height" : "width",
          length: isHorizontal ? "width" : "height",
          slideTranslate: isHorizontal ? "translateX" : "translateY",
          mouseClient: isHorizontal ? "clientX" : "clientY",
          scrollDelta: isHorizontal ? "deltaX" : "deltaY"
        };
      });
      const trackStyle = vue.computed(() => ({
        borderRadius: `${props.size / 2}px`,
        [fields.value.size]: `${props.size}px`,
        opacity: props.hide && !dragging.value ? 0 : 1
      }));
      const slideStyle = vue.computed(() => ({
        borderRadius: `${props.size / 2}px`,
        [fields.value.length]: `${props.length}px`,
        transform: `${fields.value.slideTranslate}(${props.move}px)`,
        [fields.value.size]: "100%"
      }));
      const handleTrackClick = (event) => {
        const offset = event[fields.value.mouseClient] - trackPosition[fields.value.mouseClient];
        emit("change", { offset: calculate(offset), duration: 300 });
      };
      const calculate = (offset) => {
        let res = 0;
        if (offset < props.length / 2) {
          res = 0;
        } else if (offset > track.value - props.length / 2) {
          res = track.value - props.length;
        } else {
          res = offset - props.length / 2;
        }
        return res;
      };
      const handleTrackScroll = lodashEs.throttle(function cb(event) {
        emit("change", {
          offset: props.move + event[fields.value.scrollDelta]
        });
      }, 16);
      const handleDragSlide = (event) => {
        if (!dragging.value)
          return;
        const offset = calculate(
          event[fields.value.mouseClient] - trackPosition[fields.value.mouseClient]
        );
        emit("change", { offset });
        event.preventDefault();
        event.stopPropagation();
      };
      const startDrag = () => {
        dragging.value = true;
        document.addEventListener("mousemove", handleDragSlide);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
      };
      const stopDrag = () => {
        dragging.value = false;
        document.removeEventListener("mousemove", handleDragSlide);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
      };
      vue.onMounted(() => {
        if (!trackContainerRef.value)
          return;
        const { x, y } = trackContainerRef.value.getBoundingClientRect();
        trackPosition.clientX = x;
        trackPosition.clientY = y;
        if (trackContainerRef.value) {
          track.value = trackContainerRef.value[fields.value.track];
        }
      });
      const styles = getBarStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "trackContainerRef",
          ref: trackContainerRef,
          class: vue.normalizeClass(vue.unref(styles).track),
          style: vue.normalizeStyle(trackStyle.value),
          onClick: handleTrackClick,
          onWheelPassive: _cache[0] || (_cache[0] = (...args) => vue.unref(handleTrackScroll) && vue.unref(handleTrackScroll)(...args))
        }, [
          vue.createElementVNode("div", {
            style: vue.normalizeStyle(slideStyle.value),
            class: vue.normalizeClass(vue.unref(styles).slide),
            onMousedown: startDrag
          }, null, 38)
        ], 38);
      };
    }
  });
  const _sfc_main = vue.defineComponent({
    ...{
      name: "ScrollContainer"
    },
    __name: "ScrollContainer",
    props: {
      size: { default: "normal" },
      tag: { default: "div" },
      scrollTop: {},
      scrollLeft: {},
      autoHide: { type: Boolean },
      hideVertical: { type: Boolean },
      hideHorizontal: { type: Boolean }
    },
    emits: ["update:scrollTop", "update:scrollLeft"],
    setup(__props, { expose: __expose, emit }) {
      const props = __props;
      const SIDEBAR_SIDE_MAP = {
        thick: 20,
        normal: 15,
        thin: 10
      };
      const getContainerStyles = () => {
        const scrollbar = apathia_twind.apply`absolute bottom-0 right-0`;
        return {
          scrollContainer: apathia_twind.style`relative h-full overflow-hidden${apathia_twind.css`
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
      }
    `}`,
          scrollbarY: apathia_twind.tw`${scrollbar}${apathia_twind.apply`top-0`}`,
          scrollbarX: apathia_twind.tw`${scrollbar}${apathia_twind.apply`left-0`}`
        };
      };
      const focus = vue.ref(false);
      const position = vue.reactive({
        top: 0,
        left: 0
      });
      const scrollContainerRef = vue.ref(null);
      const wrapRef = vue.ref(null);
      const container = vue.reactive({
        height: 0,
        width: 0
      });
      const scrollArea = vue.reactive({
        height: 0,
        width: 0
      });
      const trackSize = vue.computed(() => {
        if (typeof props.size === "number")
          return props.size;
        if (["thick", "normal", "thin"].includes(props.size)) {
          return SIDEBAR_SIDE_MAP[props.size];
        }
        return SIDEBAR_SIDE_MAP.normal;
      });
      const scrollAreaStyle = vue.computed(() => ({
        height: "calc(100% + 15px)",
        width: "calc(100% + 15px)",
        overflow: "scroll"
      }));
      const hideScrollbar = vue.computed(() => props.autoHide && !focus.value);
      const maxTop = vue.computed(() => scrollArea.height - container.height);
      const maxLeft = vue.computed(() => scrollArea.width - container.width);
      const moveX = vue.computed(() => {
        if (maxLeft.value === 0)
          return 0;
        return position.left * (container.width - horizontalSlideWidth.value) / maxLeft.value;
      });
      const showScrollX = vue.computed(
        () => scrollArea.width > container.width + 15 && !props.hideHorizontal
      );
      const scrollbarXStyle = vue.computed(() => {
        if (scrollArea.height < container.height + 15) {
          return {
            top: `${scrollArea.height - trackSize.value}px`
          };
        }
        return {
          bottom: 0
        };
      });
      const horizontalSlideWidth = vue.computed(
        () => Math.max(
          container.width * container.width / scrollArea.width,
          trackSize.value
        )
      );
      const moveY = vue.computed(() => {
        if (maxTop.value === 0)
          return 0;
        return position.top * (container.height - verticalSlideHeight.value) / maxTop.value;
      });
      const showScrollY = vue.computed(
        () => scrollArea.height > container.height + 15 && !props.hideVertical
      );
      const scrollbarYStyle = vue.computed(() => {
        if (scrollArea.width < container.width + 15) {
          return {
            left: `${scrollArea.width - trackSize.value}px`
          };
        }
        return {
          right: 0
        };
      });
      const verticalSlideHeight = vue.computed(
        () => Math.max(
          container.height * container.height / scrollArea.height,
          trackSize.value
        )
      );
      const updateValue = (left, top) => {
        emit("update:scrollLeft", left);
        emit("update:scrollTop", top);
      };
      const updateScrollContainer = (left, top) => {
        if (wrapRef.value) {
          wrapRef.value.scrollLeft = left;
          wrapRef.value.scrollTop = top;
        }
      };
      const handleAreaScroll = (event) => {
        const el = event.target;
        position.top = el.scrollTop;
        position.left = el.scrollLeft;
        updateValue(position.left, position.top);
      };
      const getSafePosition = (targetLeft, targetTop) => {
        const res = {
          left: position.left,
          top: position.top
        };
        if (targetTop < 0) {
          res.top = 0;
        } else if (targetTop > maxTop.value) {
          res.top = maxTop.value;
        } else {
          res.top = targetTop;
        }
        if (targetLeft < 0) {
          res.left = 0;
        } else if (targetLeft > maxLeft.value) {
          res.left = maxLeft.value;
        } else {
          res.left = targetLeft;
        }
        return res;
      };
      const scrollTo = (targetLeft, targetTop, duration = 0) => {
        const { left: finalLeft, top: finalTop } = getSafePosition(
          targetLeft,
          targetTop
        );
        if (position.top === finalTop && position.left === finalLeft) {
          updateValue(position.left, position.top);
          return;
        }
        const cosParameterY = (position.top - finalLeft) / 2;
        const cosParameterX = (position.left - finalLeft) / 2;
        let scrollCount = 0;
        let oldTimestamp = 0;
        const step = (newTimestamp) => {
          if (oldTimestamp !== 0) {
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) {
              position.top = finalTop;
              position.left = finalLeft;
            } else {
              position.top = cosParameterY + finalTop + cosParameterY * Math.cos(scrollCount);
              position.left = cosParameterX + finalLeft + cosParameterX * Math.cos(scrollCount);
            }
            updateScrollContainer(position.left, position.top);
          }
          if (!(scrollCount >= Math.PI)) {
            oldTimestamp = newTimestamp;
            apathia_shared.raf(step);
          }
        };
        if (duration > 0) {
          apathia_shared.raf(step);
        } else {
          position.top = finalTop;
          position.left = finalTop;
          updateScrollContainer(finalLeft, finalTop);
          updateValue(position.left, position.top);
        }
      };
      const scrollBy = (targetLeft, targetTop, duration = 0) => {
        scrollTo(position.left + targetLeft, position.top + targetTop, duration);
      };
      const onSlideXChange = (params) => {
        const left = params.offset * (scrollArea.width - container.width) / (container.width - horizontalSlideWidth.value);
        scrollTo(left, position.top, params.duration || 0);
      };
      const onSlideYChange = (params) => {
        const top = params.offset * (scrollArea.height - container.height) / (container.height - verticalSlideHeight.value);
        scrollTo(position.left, top, params.duration);
      };
      let watchedElem = null;
      let erd = null;
      const setupResizeObserver = (ele) => {
        erd = ElementResizeDetectorMaker__default["default"]();
        watchedElem = ele;
        erd.listenTo(ele, () => {
          getDomSize();
        });
      };
      const getDomSize = () => {
        const wrapEl = wrapRef.value;
        if (!wrapEl)
          return;
        const listEl = wrapEl.firstElementChild;
        if (!listEl || !scrollContainerRef.value)
          return;
        const { height: containerHeight, width: containerWidth } = scrollContainerRef.value.getBoundingClientRect();
        container.height = containerHeight;
        container.width = containerWidth;
        scrollArea.width = listEl.scrollWidth;
        scrollArea.height = listEl.scrollHeight;
      };
      vue.watch(
        [() => props.scrollLeft, () => props.scrollTop],
        (values) => {
          const [newLeft, newTop] = values;
          scrollTo(
            typeof newLeft === "number" ? newLeft : position.left,
            typeof newTop === "number" ? newTop : position.top,
            0
          );
        },
        { immediate: true }
      );
      vue.onMounted(() => {
        vue.nextTick(() => {
          if (!wrapRef.value || !wrapRef.value.firstElementChild) {
            return;
          }
          setupResizeObserver(wrapRef.value.firstElementChild);
        });
      });
      vue.onBeforeUnmount(() => {
        if (erd && watchedElem) {
          erd.uninstall(watchedElem);
        }
        window.removeEventListener("resize", getDomSize);
      });
      __expose({
        scrollBy,
        scrollTo
      });
      const styles = getContainerStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "scrollContainerRef",
          ref: scrollContainerRef,
          class: vue.normalizeClass(vue.unref(styles).scrollContainer),
          onMouseenter: _cache[0] || (_cache[0] = () => focus.value = true),
          onMouseleave: _cache[1] || (_cache[1] = () => focus.value = false)
        }, [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
            ref_key: "wrapRef",
            ref: wrapRef,
            style: vue.normalizeStyle(scrollAreaStyle.value),
            onScrollPassive: handleAreaScroll
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 40, ["style"])),
          showScrollY.value ? (vue.openBlock(), vue.createBlock(_sfc_main$1, {
            key: 0,
            type: "vertical",
            class: vue.normalizeClass(vue.unref(styles).scrollbarY),
            style: vue.normalizeStyle(scrollbarYStyle.value),
            length: verticalSlideHeight.value,
            size: trackSize.value,
            move: moveY.value,
            hide: hideScrollbar.value,
            onChange: onSlideYChange
          }, null, 8, ["class", "style", "length", "size", "move", "hide"])) : vue.createCommentVNode("", true),
          showScrollX.value ? (vue.openBlock(), vue.createBlock(_sfc_main$1, {
            key: 1,
            type: "horizontal",
            class: vue.normalizeClass(vue.unref(styles).scrollbarX),
            style: vue.normalizeStyle(scrollbarXStyle.value),
            length: horizontalSlideWidth.value,
            size: trackSize.value,
            move: moveX.value,
            hide: hideScrollbar.value,
            onChange: onSlideXChange
          }, null, 8, ["class", "style", "length", "size", "move", "hide"])) : vue.createCommentVNode("", true)
        ], 34);
      };
    }
  });
  exports2.ScrollContainer = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
