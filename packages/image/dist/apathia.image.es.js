import { defineComponent, ref, computed, shallowReactive, openBlock, createElementBlock, Fragment, createElementVNode, normalizeClass, normalizeStyle, withModifiers, createVNode, unref, withCtx, createCommentVNode, renderSlot, createBlock, Teleport, Transition, normalizeProps, guardReactiveProps } from "vue";
import { keyframes, css, style, tw } from "@apathia/apathia.twind";
import { Icon } from "@apathia/apathia.icon";
import { toast } from "@apathia/apathia.alert";
import { CopyDocument, View, Close, Plus, Minus, RefreshRight, RefreshLeft } from "@apathia/apathia.icon-svg";
const _hoisted_1 = ["src", "alt"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("p", null, "\u52A0\u8F7D\u5931\u8D25", -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = ["src", "alt", "onMousedown", "onMousemove", "onMouseup"];
const _sfc_main = defineComponent({
  __name: "Image",
  props: {
    src: {},
    alt: { default: "img" },
    width: {},
    height: {},
    preview: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const flash = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
    const flashCss = css({
      animation: "0.5s ease",
      animationName: flash
    });
    const styles = {
      imgWrap: style`relative inline-block`,
      img: style`w-full h-auto align-middle bg-fill-gray`,
      mask: style`
      absolute inset-0 cursor-pointer
      bg-fill-primary bg-opacity-50 opacity-0 transition-all
      text-content-white flex justify-center items-center text-center text-sm
      hover:opacity-100
    `,
      iconText: style`ml-1`,
      iconGap: style`ml-4`,
      maskIcon: style`inline-block fill-current text-xs`,
      transitionClass: {
        leaveToClass: tw`opacity-0`
      },
      duration: tw`duration-500`,
      shadeClass: style`z-50 fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`,
      options: style`
      m-0 p-0 absolute w-full
      flex flex-row-reverse items-center
      text-content-white bg-fill-white bg-opacity-10
      pointer-events-auto z-10
    `,
      optionIcons: style`p-3 ml-4 text-xl cursor-pointer`,
      optionIconsSize: style`text-lg`,
      previewImgWrap: style`fixed inset-0 flex justify-center items-center`,
      previewImg: style`max-w-full max-h-full cursor-grab select-none transition-all bg-fill-gray`,
      error: style`flex justify-center items-center bg-fill-light text-fill-gray text-xs`,
      errorHidden: style`hidden`,
      hoverEnlarge: style`hover:text-lg transition-all`
    };
    const mask = ref(false);
    const toPx = (val) => {
      if (!val)
        return;
      const [num] = (val + "").split("px");
      return num + "px";
    };
    const imgStyle = computed(() => {
      const width = toPx(props.width);
      const height = toPx(props.height);
      if (width) {
        return { width };
      } else if (height) {
        return { height };
      } else {
        return { width: "160px" };
      }
    });
    const imgErrorStyle = computed(() => {
      const width = toPx(props.width);
      const height = toPx(props.height);
      if (width && height) {
        return { width, height };
      } else {
        return {
          width: width ? width : "160px",
          height: height ? height : "100px"
        };
      }
    });
    const isError = ref(false);
    const handleError = () => {
      isError.value = true;
    };
    const clearOptions = () => {
      scaleTimes.value = 1;
      rotateAngle.value = 0;
      translate.x = 0;
      translate.y = 0;
    };
    const handleClickCopyLocation = () => {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", props.src);
      input.select();
      if (document.execCommand("copy"))
        toast.success("\u590D\u5236\u56FE\u7247\u5730\u5740\u6210\u529F");
      document.body.removeChild(input);
    };
    const handleClickOpenMash = () => {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflowY = "hidden";
        mask.value = true;
      }
    };
    const handleClickCloseMask = () => {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflowY = "auto";
        mask.value = false;
      }
      clearOptions();
    };
    const scaleTimes = ref(1);
    const handleClickZoomIn = () => {
      scaleTimes.value += 0.25;
    };
    const handleClickZoomOut = () => {
      if (scaleTimes.value >= 1)
        scaleTimes.value -= 0.25;
    };
    const rotateAngle = ref(0);
    const handleClickTurnLeft = () => {
      rotateAngle.value -= 90;
    };
    const handleClickTurnRight = () => {
      rotateAngle.value += 90;
    };
    const translate = shallowReactive({
      x: 0,
      y: 0
    });
    let downPosition = null;
    const handleMouseDown = (e) => {
      downPosition = {
        downX: e.clientX - translate.x,
        downY: e.clientY - translate.y
      };
    };
    const handleMouseMove = (e) => {
      if (downPosition) {
        const { downX, downY } = downPosition;
        translate.x = e.clientX - downX;
        translate.y = e.clientY - downY;
      }
    };
    const handleMouseUp = () => {
      downPosition = null;
    };
    const handleMouseWheel = (e) => {
      let direction = e.deltaY > 0 ? "down" : "up";
      if (direction === "up") {
        handleClickZoomIn();
      } else {
        handleClickZoomOut();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", {
          class: normalizeClass([styles.imgWrap, { [styles.errorHidden]: isError.value }])
        }, [
          createElementVNode("img", {
            src: _ctx.src,
            alt: _ctx.alt,
            class: normalizeClass(styles.img),
            style: normalizeStyle(imgStyle.value),
            onError: handleError
          }, null, 46, _hoisted_1),
          _ctx.preview ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(styles.mask),
            onClick: handleClickOpenMash
          }, [
            createElementVNode("span", {
              class: normalizeClass(styles.hoverEnlarge),
              onClick: withModifiers(handleClickCopyLocation, ["stop"])
            }, [
              createVNode(unref(Icon), {
                class: normalizeClass(styles.maskIcon),
                size: 10
              }, {
                default: withCtx(() => [
                  createVNode(unref(CopyDocument))
                ]),
                _: 1
              }, 8, ["class"]),
              createElementVNode("i", {
                class: normalizeClass(styles.iconText)
              }, "\u590D\u5236\u5730\u5740", 2)
            ], 10, _hoisted_2),
            createElementVNode("span", {
              class: normalizeClass([styles.hoverEnlarge, styles.iconGap])
            }, [
              createVNode(unref(Icon), {
                class: normalizeClass(styles.maskIcon),
                size: 10
              }, {
                default: withCtx(() => [
                  createVNode(unref(View))
                ]),
                _: 1
              }, 8, ["class"]),
              createElementVNode("i", {
                class: normalizeClass(styles.iconText)
              }, "\u9884\u89C8", 2)
            ], 2)
          ], 2)) : createCommentVNode("", true)
        ], 2),
        isError.value ? renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
          createElementVNode("div", {
            class: normalizeClass(styles.error),
            style: normalizeStyle(imgErrorStyle.value)
          }, _hoisted_4, 6)
        ]) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, normalizeProps(guardReactiveProps(styles.transitionClass)), {
            default: withCtx(() => [
              mask.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(styles.duration),
                onMousewheelPassive: handleMouseWheel
              }, [
                createElementVNode("div", {
                  class: normalizeClass(styles.shadeClass),
                  onClick: handleClickCloseMask
                }, [
                  createElementVNode("ul", {
                    class: normalizeClass(styles.options),
                    onClick: _cache[0] || (_cache[0] = (e) => e.stopPropagation())
                  }, [
                    createElementVNode("li", {
                      class: normalizeClass(styles.optionIcons),
                      onClick: handleClickCloseMask
                    }, [
                      createVNode(unref(Icon), null, {
                        default: withCtx(() => [
                          createVNode(unref(Close))
                        ]),
                        _: 1
                      })
                    ], 2),
                    createElementVNode("li", {
                      class: normalizeClass(styles.optionIcons),
                      onClick: handleClickZoomIn
                    }, [
                      createVNode(unref(Icon), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus))
                        ]),
                        _: 1
                      })
                    ], 2),
                    createElementVNode("li", {
                      class: normalizeClass(styles.optionIcons),
                      onClick: handleClickZoomOut
                    }, [
                      createVNode(unref(Icon), null, {
                        default: withCtx(() => [
                          createVNode(unref(Minus))
                        ]),
                        _: 1
                      })
                    ], 2),
                    createElementVNode("li", {
                      class: normalizeClass([styles.optionIcons, styles.optionIconsSize]),
                      onClick: handleClickTurnRight
                    }, [
                      createVNode(unref(Icon), null, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshRight))
                        ]),
                        _: 1
                      })
                    ], 2),
                    createElementVNode("li", {
                      class: normalizeClass([styles.optionIcons, styles.optionIconsSize]),
                      onClick: handleClickTurnLeft
                    }, [
                      createVNode(unref(Icon), null, {
                        default: withCtx(() => [
                          createVNode(unref(RefreshLeft))
                        ]),
                        _: 1
                      })
                    ], 2)
                  ], 2),
                  createElementVNode("div", {
                    class: normalizeClass(styles.previewImgWrap),
                    style: normalizeStyle(`transform: translate3d(${unref(translate).x}px, ${unref(translate).y}px, 0px) scale3d(${scaleTimes.value}, ${scaleTimes.value}, 1) rotate(${rotateAngle.value}deg)`)
                  }, [
                    createElementVNode("img", {
                      src: _ctx.src,
                      alt: _ctx.alt,
                      class: normalizeClass(styles.previewImg),
                      onMousedown: withModifiers(handleMouseDown, ["prevent"]),
                      onMousemove: withModifiers(handleMouseMove, ["prevent"]),
                      onMouseup: withModifiers(handleMouseUp, ["prevent"]),
                      onClick: _cache[1] || (_cache[1] = (e) => e.stopPropagation())
                    }, null, 42, _hoisted_5)
                  ], 6)
                ], 2)
              ], 34)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 16)
        ]))
      ], 64);
    };
  }
});
export { _sfc_main as Image };
