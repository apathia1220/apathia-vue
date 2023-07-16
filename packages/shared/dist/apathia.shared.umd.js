(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("lodash")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "lodash"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.shared = {}, global.Vue, global.twind, global.lodash));
})(this, function(exports2, vue, apathia_twind, lodash) {
  "use strict";
  const isFunction = (val) => typeof val === "function";
  const isNumber = (val) => typeof val === "number";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  function promiseWrapper(promise) {
    return (isPromise(promise) ? promise : Promise.resolve(promise)).then((data) => [data, null]).catch((error) => [null, error]);
  }
  function raf(fn) {
    return requestAnimationFrame(fn);
  }
  function getElement(container) {
    if (typeof window === "undefined")
      return null;
    if (typeof container === "string") {
      let res = document.querySelector(container);
      if (!res) {
        console.error("Failed to render component: render target selector returned null.");
        res = document.createElement("div");
      }
      return res;
    }
    return container;
  }
  function mountComponent(vNode, element, appContext) {
    let el = getElement(element);
    if (appContext)
      vNode.appContext = appContext;
    if (el)
      vue.render(vNode, el);
    const destroy = () => {
      if (el)
        vue.render(null, el);
      el = null;
    };
    return {
      vNode,
      destroy,
      el
    };
  }
  function mountContainerDom(name, callback) {
    if (typeof window === "undefined")
      return;
    if (!document.querySelector(`.apathia-${name}`)) {
      const className = apathia_twind.style`z-${name} relative`;
      const modalContainerDom = document.createElement("div");
      modalContainerDom.className = `apathia-${name} ${className}`;
      if (callback)
        callback(modalContainerDom);
      document.body.appendChild(modalContainerDom);
    }
  }
  function unrefElement(elRef) {
    var _a;
    const plain = vue.unref(elRef);
    return (_a = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _a !== void 0 ? _a : plain;
  }
  function getError(method, url, xhr) {
    let msg;
    if (xhr.response) {
      msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
      msg = `${xhr.responseText}`;
    } else {
      msg = `${xhr.status}`;
    }
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = method;
    err.url = url;
    return err;
  }
  function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
    return JSON.parse(text);
  }
  function request(method, url, data, options) {
    return new Promise((resole, reject) => {
      if (typeof XMLHttpRequest === "undefined") {
        reject(new Error("XMLHttpRequest was not been supported"));
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      if (xhr.upload) {
        xhr.upload.onprogress = (e) => {
          var _a;
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100;
          } else {
            e.percent = 0;
          }
          (_a = options === null || options === void 0 ? void 0 : options.onProgress) === null || _a === void 0 ? void 0 : _a.call(options, e);
        };
      }
      xhr.onerror = () => {
        reject(getError(method, url, xhr));
      };
      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(getError(method, url, xhr));
        }
        try {
          const result = getBody(xhr);
          resole(result);
        } catch (err) {
          reject(err);
        }
      };
      if ((options === null || options === void 0 ? void 0 : options.withCredentials) && "withCredentials" in xhr) {
        xhr.withCredentials = options.withCredentials;
      }
      if (options === null || options === void 0 ? void 0 : options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          var _a;
          if (((_a = options.headers) === null || _a === void 0 ? void 0 : _a[key]) !== "") {
            xhr.setRequestHeader(key, value);
          }
        });
      }
      xhr.send(data);
    });
  }
  var Position;
  (function(Position2) {
    Position2["Top"] = "top";
    Position2["Bottom"] = "bottom";
    Position2["Left"] = "left";
    Position2["Right"] = "right";
  })(Position || (Position = {}));
  var Align;
  (function(Align2) {
    Align2["Top"] = "top";
    Align2["Bottom"] = "bottom";
    Align2["Left"] = "left";
    Align2["Right"] = "right";
    Align2["Middle"] = "middle";
  })(Align || (Align = {}));
  var autoPos = {
    beforeMount(el) {
      el.style.position = "absolute";
    },
    mounted(el, binding) {
      autoset(el, binding);
      el.__reCompute = lodash.throttle(() => autoset(el, binding), 500);
      window.addEventListener("resize", el.__reCompute, true);
      window.addEventListener("scroll", el.__reCompute, true);
    },
    updated(el, binding) {
      autoset(el, binding);
    },
    unmounted(el) {
      if (el.__reCompute) {
        window.removeEventListener("resize", el.__reCompute, true);
        window.removeEventListener("scroll", el.__reCompute, true);
      }
      el.__reCompute = void 0;
    }
  };
  function autoset(el, binding) {
    if (el.style.display === "none") {
      return;
    }
    let anchorNode = el.parentNode;
    const bindingNode = binding.value || el.__parent;
    if (bindingNode) {
      if (!(bindingNode instanceof HTMLElement)) {
        console.warn("v-auto-pos\u7684\u503C\u671F\u671B\u662F\u4E00\u4E2ADOM\u5BF9\u8C61");
      } else {
        anchorNode = bindingNode;
      }
    }
    if (!anchorNode) {
      return;
    }
    el.__parent = anchorNode;
    const scrollTop = window.pageYOffset || 0;
    const clientSize = {
      width: document.body.offsetWidth,
      height: window.innerHeight
    };
    const elRect = el.getBoundingClientRect();
    const anchorElRect = anchorNode.getBoundingClientRect();
    const isRoot = !!binding.modifiers.root;
    setElementPosition(el, resolvePosition(el, isRoot, clientSize, anchorElRect, elRect), anchorElRect, elRect, scrollTop);
  }
  function checkPosition(pos, align) {
    const arrX = ["left", "right"];
    const arrY = ["top", "bottom"];
    if (pos === void 0 || align === void 0) {
      return true;
    }
    const validPos = [Position.Top, Position.Bottom, Position.Left, Position.Right].indexOf(pos) > -1;
    const validAlign = [Align.Top, Align.Top, Align.Left, Align.Right, Align.Middle].indexOf(align) > -1;
    if (pos && !validPos) {
      console.warn(`${pos}\u4E0D\u662F\u4E00\u4E2A\u5408\u7406\u7684\u53C2\u6570\uFF0C\u5FC5\u987B\u662F${[
        Position.Top,
        Position.Bottom,
        Position.Left,
        Position.Right
      ].join(",")}\u4E2D\u7684\u4E00\u4E2A`);
      return false;
    }
    if (align && !validAlign) {
      console.warn(`${align}\u4E0D\u662F\u4E00\u4E2A\u5408\u7406\u7684\u53C2\u6570\uFF0C\u5FC5\u987B\u662F${[
        Align.Top,
        Align.Bottom,
        Align.Left,
        Align.Right,
        Align.Middle
      ].join(",")}\u4E2D\u7684\u4E00\u4E2A`);
      return false;
    }
    if (arrX.indexOf(pos) > -1 && align === Align.Middle) {
      console.warn(`pos\u4E3A${pos}\u65F6\uFF0Calign\u4E0D\u80FD\u4E3Amiddle`);
      return false;
    }
    if (pos && validPos && align && validAlign && (arrX.indexOf(pos) > -1 && arrX.indexOf(align) > -1 || arrY.indexOf(pos) > -1 && arrY.indexOf(align) > -1)) {
      console.warn(`${pos}\u4E0E${align}\u662F\u4E00\u7EC4\u76F8\u5BF9\u7684\u5143\u7D20`);
      return false;
    }
    return true;
  }
  function setElementPosition(el, position, anchorElRect, currentElSize, scrollTop) {
    const { pos, align, isRoot } = position;
    const { width: parentElWidth, height: parentElHeight, top: parentElTop, bottom: parentElBottom, left: parentElLeft, right: parentElRight } = anchorElRect;
    const { width: currentElWidth, height: currentElHeight } = currentElSize;
    const opposite = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const style = {
      top: "",
      bottom: "",
      left: "",
      right: ""
    };
    if (!isRoot) {
      style[opposite[pos]] = `${[Position.Left, Position.Right].indexOf(pos) > -1 ? parentElWidth : parentElHeight}px`;
      style[pos] = "";
      style[opposite[align]] = "";
      if (align === Align.Middle) {
        style.left = `${(parentElWidth - currentElWidth) / 2}px`;
        style.right = "";
      } else {
        style[align] = "";
      }
    } else {
      style.bottom = "";
      style.right = "";
      if ([Position.Top, Position.Bottom].includes(pos)) {
        style.top = `${scrollTop + parentElTop + (pos === Position.Top ? -currentElHeight : parentElHeight)}px`;
        if (align === Align.Middle) {
          style.left = `${parentElLeft - (currentElWidth - parentElWidth) / 2}px`;
        } else {
          style.left = `${align === Align.Left ? parentElLeft : parentElRight - currentElWidth}px`;
        }
      } else {
        style.left = `${pos === Position.Left ? parentElLeft - currentElWidth : parentElRight}px`;
        style.top = `${scrollTop + (align === Align.Top ? parentElTop : parentElBottom - currentElHeight)}px`;
      }
    }
    Object.assign(el.style, style);
  }
  function resolvePosition(el, isRoot, clientSize, parentElRect, currentElSize) {
    const { top } = parentElRect;
    const bottom = clientSize.height - parentElRect.bottom;
    const { height: currentElHeight } = currentElSize;
    let delcarePos = false;
    let delcareAlign = false;
    let pos = Position.Bottom;
    let align = Align.Left;
    const { pos: dataPos, align: dataAlign } = el.dataset || {};
    if ((dataPos || dataAlign) && !checkPosition(dataPos, dataAlign)) {
      return {
        pos,
        align,
        isRoot: false
      };
    }
    if (dataPos) {
      delcarePos = true;
      pos = dataPos;
    }
    if (dataAlign) {
      delcareAlign = true;
      align = dataAlign;
    }
    if (!delcarePos) {
      const bottomEnough = bottom > currentElHeight;
      const topEnough = top > currentElHeight;
      pos = bottomEnough && Position.Bottom || topEnough && Position.Top || Position.Bottom;
    }
    if (!delcareAlign) {
      align = (pos === Position.Left || pos === Position.Right) && Align.Bottom || Align.Left;
    }
    return {
      pos,
      align,
      isRoot
    };
  }
  function mergeWithDefault(defaultValue, source) {
    if (source === void 0) {
      return defaultValue;
    }
    return Object.keys(defaultValue).reduce((acc, key) => {
      if (source[key] !== void 0) {
        acc[key] = lodash.cloneDeep(source[key]);
      } else {
        acc[key] = defaultValue[key];
      }
      return acc;
    }, {});
  }
  function noop() {
  }
  exports2.autoPos = autoPos;
  exports2.isFunction = isFunction;
  exports2.isNumber = isNumber;
  exports2.isObject = isObject;
  exports2.isPromise = isPromise;
  exports2.isString = isString;
  exports2.isSymbol = isSymbol;
  exports2.mergeWithDefault = mergeWithDefault;
  exports2.mountComponent = mountComponent;
  exports2.mountContainerDom = mountContainerDom;
  exports2.noop = noop;
  exports2.promiseWrapper = promiseWrapper;
  exports2.raf = raf;
  exports2.request = request;
  exports2.unrefElement = unrefElement;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
