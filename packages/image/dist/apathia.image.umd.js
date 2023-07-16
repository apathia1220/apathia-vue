(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.icon"), require("@apathia/apathia.alert"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.icon", "@apathia/apathia.alert", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.image = {}, global.Vue, global.twind, global.icon, global.alert, global["icon-svg"]));
})(this, function(exports2, vue, apathia_twind, apathia_icon, apathia_alert, apathia_iconSvg) {
  "use strict";
  const _hoisted_1 = ["src", "alt"];
  const _hoisted_2 = ["onClick"];
  const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("p", null, "\u52A0\u8F7D\u5931\u8D25", -1);
  const _hoisted_4 = [
    _hoisted_3
  ];
  const _hoisted_5 = ["src", "alt", "onMousedown", "onMousemove", "onMouseup"];
  const _sfc_main = vue.defineComponent({
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
      const flash = apathia_twind.keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
      const flashCss = apathia_twind.css({
        animation: "0.5s ease",
        animationName: flash
      });
      const styles = {
        imgWrap: apathia_twind.style`relative inline-block`,
        img: apathia_twind.style`w-full h-auto align-middle bg-fill-gray`,
        mask: apathia_twind.style`
      absolute inset-0 cursor-pointer
      bg-fill-primary bg-opacity-50 opacity-0 transition-all
      text-content-white flex justify-center items-center text-center text-sm
      hover:opacity-100
    `,
        iconText: apathia_twind.style`ml-1`,
        iconGap: apathia_twind.style`ml-4`,
        maskIcon: apathia_twind.style`inline-block fill-current text-xs`,
        transitionClass: {
          leaveToClass: apathia_twind.tw`opacity-0`
        },
        duration: apathia_twind.tw`duration-500`,
        shadeClass: apathia_twind.style`z-50 fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`,
        options: apathia_twind.style`
      m-0 p-0 absolute w-full
      flex flex-row-reverse items-center
      text-content-white bg-fill-white bg-opacity-10
      pointer-events-auto z-10
    `,
        optionIcons: apathia_twind.style`p-3 ml-4 text-xl cursor-pointer`,
        optionIconsSize: apathia_twind.style`text-lg`,
        previewImgWrap: apathia_twind.style`fixed inset-0 flex justify-center items-center`,
        previewImg: apathia_twind.style`max-w-full max-h-full cursor-grab select-none transition-all bg-fill-gray`,
        error: apathia_twind.style`flex justify-center items-center bg-fill-light text-fill-gray text-xs`,
        errorHidden: apathia_twind.style`hidden`,
        hoverEnlarge: apathia_twind.style`hover:text-lg transition-all`
      };
      const mask = vue.ref(false);
      const toPx = (val) => {
        if (!val)
          return;
        const [num] = (val + "").split("px");
        return num + "px";
      };
      const imgStyle = vue.computed(() => {
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
      const imgErrorStyle = vue.computed(() => {
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
      const isError = vue.ref(false);
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
          apathia_alert.toast.success("\u590D\u5236\u56FE\u7247\u5730\u5740\u6210\u529F");
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
      const scaleTimes = vue.ref(1);
      const handleClickZoomIn = () => {
        scaleTimes.value += 0.25;
      };
      const handleClickZoomOut = () => {
        if (scaleTimes.value >= 1)
          scaleTimes.value -= 0.25;
      };
      const rotateAngle = vue.ref(0);
      const handleClickTurnLeft = () => {
        rotateAngle.value -= 90;
      };
      const handleClickTurnRight = () => {
        rotateAngle.value += 90;
      };
      const translate = vue.shallowReactive({
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
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass([styles.imgWrap, { [styles.errorHidden]: isError.value }])
          }, [
            vue.createElementVNode("img", {
              src: _ctx.src,
              alt: _ctx.alt,
              class: vue.normalizeClass(styles.img),
              style: vue.normalizeStyle(imgStyle.value),
              onError: handleError
            }, null, 46, _hoisted_1),
            _ctx.preview ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(styles.mask),
              onClick: handleClickOpenMash
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(styles.hoverEnlarge),
                onClick: vue.withModifiers(handleClickCopyLocation, ["stop"])
              }, [
                vue.createVNode(vue.unref(apathia_icon.Icon), {
                  class: vue.normalizeClass(styles.maskIcon),
                  size: 10
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(apathia_iconSvg.CopyDocument))
                  ]),
                  _: 1
                }, 8, ["class"]),
                vue.createElementVNode("i", {
                  class: vue.normalizeClass(styles.iconText)
                }, "\u590D\u5236\u5730\u5740", 2)
              ], 10, _hoisted_2),
              vue.createElementVNode("span", {
                class: vue.normalizeClass([styles.hoverEnlarge, styles.iconGap])
              }, [
                vue.createVNode(vue.unref(apathia_icon.Icon), {
                  class: vue.normalizeClass(styles.maskIcon),
                  size: 10
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(apathia_iconSvg.View))
                  ]),
                  _: 1
                }, 8, ["class"]),
                vue.createElementVNode("i", {
                  class: vue.normalizeClass(styles.iconText)
                }, "\u9884\u89C8", 2)
              ], 2)
            ], 2)) : vue.createCommentVNode("", true)
          ], 2),
          isError.value ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(styles.error),
              style: vue.normalizeStyle(imgErrorStyle.value)
            }, _hoisted_4, 6)
          ]) : vue.createCommentVNode("", true),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
            vue.createVNode(vue.Transition, vue.normalizeProps(vue.guardReactiveProps(styles.transitionClass)), {
              default: vue.withCtx(() => [
                mask.value ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(styles.duration),
                  onMousewheelPassive: handleMouseWheel
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(styles.shadeClass),
                    onClick: handleClickCloseMask
                  }, [
                    vue.createElementVNode("ul", {
                      class: vue.normalizeClass(styles.options),
                      onClick: _cache[0] || (_cache[0] = (e) => e.stopPropagation())
                    }, [
                      vue.createElementVNode("li", {
                        class: vue.normalizeClass(styles.optionIcons),
                        onClick: handleClickCloseMask
                      }, [
                        vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(apathia_iconSvg.Close))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("li", {
                        class: vue.normalizeClass(styles.optionIcons),
                        onClick: handleClickZoomIn
                      }, [
                        vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(apathia_iconSvg.Plus))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("li", {
                        class: vue.normalizeClass(styles.optionIcons),
                        onClick: handleClickZoomOut
                      }, [
                        vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(apathia_iconSvg.Minus))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("li", {
                        class: vue.normalizeClass([styles.optionIcons, styles.optionIconsSize]),
                        onClick: handleClickTurnRight
                      }, [
                        vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(apathia_iconSvg.RefreshRight))
                          ]),
                          _: 1
                        })
                      ], 2),
                      vue.createElementVNode("li", {
                        class: vue.normalizeClass([styles.optionIcons, styles.optionIconsSize]),
                        onClick: handleClickTurnLeft
                      }, [
                        vue.createVNode(vue.unref(apathia_icon.Icon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(apathia_iconSvg.RefreshLeft))
                          ]),
                          _: 1
                        })
                      ], 2)
                    ], 2),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(styles.previewImgWrap),
                      style: vue.normalizeStyle(`transform: translate3d(${vue.unref(translate).x}px, ${vue.unref(translate).y}px, 0px) scale3d(${scaleTimes.value}, ${scaleTimes.value}, 1) rotate(${rotateAngle.value}deg)`)
                    }, [
                      vue.createElementVNode("img", {
                        src: _ctx.src,
                        alt: _ctx.alt,
                        class: vue.normalizeClass(styles.previewImg),
                        onMousedown: vue.withModifiers(handleMouseDown, ["prevent"]),
                        onMousemove: vue.withModifiers(handleMouseMove, ["prevent"]),
                        onMouseup: vue.withModifiers(handleMouseUp, ["prevent"]),
                        onClick: _cache[1] || (_cache[1] = (e) => e.stopPropagation())
                      }, null, 42, _hoisted_5)
                    ], 6)
                  ], 2)
                ], 34)) : vue.createCommentVNode("", true)
              ]),
              _: 1
            }, 16)
          ]))
        ], 64);
      };
    }
  });
  exports2.Image = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
