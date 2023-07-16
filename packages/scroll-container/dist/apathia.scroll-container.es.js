import { defineComponent, reactive, ref, computed, onMounted, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, createElementVNode, watch, nextTick, onBeforeUnmount, createBlock, resolveDynamicComponent, withCtx, renderSlot, createCommentVNode } from "vue";
import ElementResizeDetectorMaker from "element-resize-detector";
import { raf } from "@apathia/apathia.shared";
import { style, apply, css, tw } from "@apathia/apathia.twind";
import { throttle } from "lodash-es";
const _sfc_main$1 = defineComponent({
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
      track: style`transition-opacity group`,
      slide: style`bg-fill-neutral group-hover:bg-fill-accent`
    });
    const trackPosition = reactive({
      clientX: 0,
      clientY: 0
    });
    const track = ref(0);
    const dragging = ref(false);
    const trackContainerRef = ref(null);
    const fields = computed(() => {
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
    const trackStyle = computed(() => ({
      borderRadius: `${props.size / 2}px`,
      [fields.value.size]: `${props.size}px`,
      opacity: props.hide && !dragging.value ? 0 : 1
    }));
    const slideStyle = computed(() => ({
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
    const handleTrackScroll = throttle(function cb(event) {
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
    onMounted(() => {
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
      return openBlock(), createElementBlock("div", {
        ref_key: "trackContainerRef",
        ref: trackContainerRef,
        class: normalizeClass(unref(styles).track),
        style: normalizeStyle(trackStyle.value),
        onClick: handleTrackClick,
        onWheelPassive: _cache[0] || (_cache[0] = (...args) => unref(handleTrackScroll) && unref(handleTrackScroll)(...args))
      }, [
        createElementVNode("div", {
          style: normalizeStyle(slideStyle.value),
          class: normalizeClass(unref(styles).slide),
          onMousedown: startDrag
        }, null, 38)
      ], 38);
    };
  }
});
const _sfc_main = defineComponent({
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
      const scrollbar = apply`absolute bottom-0 right-0`;
      return {
        scrollContainer: style`relative h-full overflow-hidden${css`
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
      }
    `}`,
        scrollbarY: tw`${scrollbar}${apply`top-0`}`,
        scrollbarX: tw`${scrollbar}${apply`left-0`}`
      };
    };
    const focus = ref(false);
    const position = reactive({
      top: 0,
      left: 0
    });
    const scrollContainerRef = ref(null);
    const wrapRef = ref(null);
    const container = reactive({
      height: 0,
      width: 0
    });
    const scrollArea = reactive({
      height: 0,
      width: 0
    });
    const trackSize = computed(() => {
      if (typeof props.size === "number")
        return props.size;
      if (["thick", "normal", "thin"].includes(props.size)) {
        return SIDEBAR_SIDE_MAP[props.size];
      }
      return SIDEBAR_SIDE_MAP.normal;
    });
    const scrollAreaStyle = computed(() => ({
      height: "calc(100% + 15px)",
      width: "calc(100% + 15px)",
      overflow: "scroll"
    }));
    const hideScrollbar = computed(() => props.autoHide && !focus.value);
    const maxTop = computed(() => scrollArea.height - container.height);
    const maxLeft = computed(() => scrollArea.width - container.width);
    const moveX = computed(() => {
      if (maxLeft.value === 0)
        return 0;
      return position.left * (container.width - horizontalSlideWidth.value) / maxLeft.value;
    });
    const showScrollX = computed(
      () => scrollArea.width > container.width + 15 && !props.hideHorizontal
    );
    const scrollbarXStyle = computed(() => {
      if (scrollArea.height < container.height + 15) {
        return {
          top: `${scrollArea.height - trackSize.value}px`
        };
      }
      return {
        bottom: 0
      };
    });
    const horizontalSlideWidth = computed(
      () => Math.max(
        container.width * container.width / scrollArea.width,
        trackSize.value
      )
    );
    const moveY = computed(() => {
      if (maxTop.value === 0)
        return 0;
      return position.top * (container.height - verticalSlideHeight.value) / maxTop.value;
    });
    const showScrollY = computed(
      () => scrollArea.height > container.height + 15 && !props.hideVertical
    );
    const scrollbarYStyle = computed(() => {
      if (scrollArea.width < container.width + 15) {
        return {
          left: `${scrollArea.width - trackSize.value}px`
        };
      }
      return {
        right: 0
      };
    });
    const verticalSlideHeight = computed(
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
          raf(step);
        }
      };
      if (duration > 0) {
        raf(step);
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
      erd = ElementResizeDetectorMaker();
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
    watch(
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
    onMounted(() => {
      nextTick(() => {
        if (!wrapRef.value || !wrapRef.value.firstElementChild) {
          return;
        }
        setupResizeObserver(wrapRef.value.firstElementChild);
      });
    });
    onBeforeUnmount(() => {
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
      return openBlock(), createElementBlock("div", {
        ref_key: "scrollContainerRef",
        ref: scrollContainerRef,
        class: normalizeClass(unref(styles).scrollContainer),
        onMouseenter: _cache[0] || (_cache[0] = () => focus.value = true),
        onMouseleave: _cache[1] || (_cache[1] = () => focus.value = false)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
          ref_key: "wrapRef",
          ref: wrapRef,
          style: normalizeStyle(scrollAreaStyle.value),
          onScrollPassive: handleAreaScroll
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 40, ["style"])),
        showScrollY.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          type: "vertical",
          class: normalizeClass(unref(styles).scrollbarY),
          style: normalizeStyle(scrollbarYStyle.value),
          length: verticalSlideHeight.value,
          size: trackSize.value,
          move: moveY.value,
          hide: hideScrollbar.value,
          onChange: onSlideYChange
        }, null, 8, ["class", "style", "length", "size", "move", "hide"])) : createCommentVNode("", true),
        showScrollX.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          type: "horizontal",
          class: normalizeClass(unref(styles).scrollbarX),
          style: normalizeStyle(scrollbarXStyle.value),
          length: horizontalSlideWidth.value,
          size: trackSize.value,
          move: moveX.value,
          hide: hideScrollbar.value,
          onChange: onSlideXChange
        }, null, 8, ["class", "style", "length", "size", "move", "hide"])) : createCommentVNode("", true)
      ], 34);
    };
  }
});
export { _sfc_main as ScrollContainer };
