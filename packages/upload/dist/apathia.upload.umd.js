(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.twind"), require("@apathia/apathia.alert"), require("@apathia/apathia.button"), require("@apathia/apathia.input"), require("@apathia/apathia.icon"), require("@apathia/apathia.shared"), require("@apathia/apathia.hooks"), require("@apathia/apathia.icon-svg")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.twind", "@apathia/apathia.alert", "@apathia/apathia.button", "@apathia/apathia.input", "@apathia/apathia.icon", "@apathia/apathia.shared", "@apathia/apathia.hooks", "@apathia/apathia.icon-svg"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.upload = {}, global.Vue, global.twind, global.alert, global.button, global.input, global.icon, global.shared, global.hooks, global["icon-svg"]));
})(this, function(exports2, vue, apathia_twind, apathia_alert, apathia_button, apathia_input, apathia_icon, apathia_shared, apathia_hooks, apathia_iconSvg) {
  "use strict";
  function useDragDrop(el, disabled, processFiles) {
    const dragging = vue.ref(false);
    const dragenter = (e) => {
      e.preventDefault();
      if (disabled.value)
        return;
      dragging.value = true;
    };
    const drop = (e) => {
      var _a;
      e.preventDefault();
      const fileList = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
      processFiles(fileList);
      dragging.value = false;
    };
    const dragover = (e) => {
      e.preventDefault();
    };
    const dragleave = (e) => {
      e.preventDefault();
      dragging.value = false;
    };
    apathia_hooks.useEventListener(el, "dragenter", dragenter);
    apathia_hooks.useEventListener(el, "drop", drop);
    apathia_hooks.useEventListener(el, "dragover", dragover);
    apathia_hooks.useEventListener(el, "dragleave", dragleave);
    return {
      dragging
    };
  }
  const KB = 1 << 10;
  const MB = 1 << 20;
  const GB = 1 << 30;
  const TB = 1 << 40;
  function sizeFormat(size, digits = 2) {
    if (size === "")
      return "";
    const nSize = +size;
    if (nSize < KB)
      return `${nSize}B`;
    if (nSize < MB)
      return `${(nSize / KB).toFixed(digits)}KB`;
    if (nSize < GB)
      return `${(nSize / MB).toFixed(digits)}MB`;
    if (nSize < TB)
      return `${(nSize / GB).toFixed(digits)}GB`;
    return `${(nSize / TB).toFixed(2)}TB`;
  }
  const _hoisted_1 = ["draggable"];
  const _hoisted_2 = ["multiple", "accept"];
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Upload"
    },
    __name: "Upload",
    props: {
      modelValue: {},
      valid: { type: Boolean, default: false },
      draggable: { type: Boolean, default: false },
      headers: { default: () => ({}) },
      action: {},
      name: { default: "file" },
      inputDisabled: { type: Boolean, default: false },
      noInput: { type: Boolean, default: false },
      buttonName: { default: "\u4E0A\u4F20" },
      withCredentials: { type: Boolean, default: false },
      multiple: { type: Boolean },
      data: { type: [Object, Function], default: () => ({}) },
      limit: { default: 5 },
      fileSize: {},
      accept: { default: "image/*" },
      disabled: { type: Boolean, default: false },
      onBeforeEachUpload: {},
      onBeforeAllUpload: {},
      onAfterEachUpload: {},
      onError: {},
      resolveUrl: { type: Function, default: (p) => p.data.location },
      checkUrl: {},
      https: { type: Boolean, default: false }
    },
    emits: ["update:modelValue", "update:valid"],
    setup(__props, { emit }) {
      const props = __props;
      const getStyles = () => ({
        trigger: apathia_twind.style`flex items-start border-0`,
        drag: apathia_twind.style`group flex justify-center text-content-primary py-4 flex-col items-center bg-fill-light 
    border(2 dashed line-accent) rounded cursor-pointer hover:(border-brand-primary text-content-accent)
    ${apathia_twind.css({ "min-height": "4rem", "min-width": "5rem" })}`,
        dragging: apathia_twind.style`border(brand-primary) rounded-md text-brand-primary`,
        disabled: apathia_twind.style`cursor-not-allowed hover:(border(& dashed brand-active) text-content-primary)`,
        clickText: apathia_twind.style`text-brand-primary group-hover:(text-brand-active)`,
        fileIcon: apathia_twind.style`block text-content-secondary group-hover:(text-content-accent) ${apathia_twind.css`
    width: 1.5rem !important;
  `}`
      });
      const styles = getStyles();
      const formDisabled = vue.inject("FormDisabled", vue.ref(false));
      const containerRef = vue.ref(null);
      const inputRef = vue.ref(null);
      vue.watch(
        [() => props.modelValue, () => props.multiple],
        async ([value, multiple]) => {
          if (!value)
            return;
          if (Array.isArray(value) && !multiple) {
            console.warn("[Upload] value should not be an array if multiple is false");
            emit("update:valid", false);
          } else if (!Array.isArray(value) && multiple) {
            console.warn("[Upload] value should be an array if multiple is true");
            emit("update:valid", false);
          } else {
            const needValidateUrls = multiple ? value : [value];
            const [urlsValid, checkErr] = await apathia_shared.promiseWrapper(
              Promise.all(needValidateUrls.map((url) => props.checkUrl(url)))
            );
            if (checkErr || !urlsValid) {
              emit("update:valid", false);
              return;
            }
            emit("update:valid", urlsValid.every(Boolean));
          }
        },
        { immediate: true }
      );
      const disableUpload = vue.computed(() => {
        const isBeyondLimit = props.multiple ? props.modelValue.length >= props.limit : false;
        return props.disabled || formDisabled.value || isBeyondLimit;
      });
      const { dragging } = useDragDrop(
        containerRef,
        disableUpload,
        (files) => {
          if (files) {
            uploadFiles(files);
          }
        }
      );
      const containerClasses = vue.computed(() => ({
        [styles.trigger]: !props.draggable
      }));
      const dragContainerClasses = vue.computed(() => ({
        [styles.drag]: props.draggable,
        [styles.dragging]: props.draggable && dragging.value,
        [styles.disabled]: props.draggable && disableUpload.value
      }));
      const uploadButtonStyles = vue.computed(() => ({
        margin: `0 0 0 ${!props.multiple && !props.noInput ? "0.25rem" : "0"}`,
        whiteSpace: "nowrap"
      }));
      const uploadFiles = async (files) => {
        if (!checkFileCount(files)) {
          return;
        }
        const [allowUploadAllRes, uploadAllErr] = await apathia_shared.promiseWrapper(
          props.onBeforeAllUpload ? props.onBeforeAllUpload(files) : Promise.resolve(true)
        );
        if (uploadAllErr || !allowUploadAllRes) {
          return;
        }
        const fileArr = Array.prototype.slice.call(files);
        for (const file of fileArr) {
          const [processedFile, processErr] = await apathia_shared.promiseWrapper(
            props.onBeforeEachUpload ? props.onBeforeEachUpload(file) : Promise.resolve(file)
          );
          if (processErr || !processedFile) {
            console.error(processErr || new Error("[Upload] invalid file"));
            return;
          }
          if (props.fileSize && processedFile.size > props.fileSize) {
            const filesizeText = sizeFormat(props.fileSize, 0);
            apathia_alert.toast.danger("\u9519\u8BEF", `\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${filesizeText}`);
            return;
          }
          await upload(processedFile);
        }
      };
      const upload = async (file) => {
        var _a, _b;
        if (inputRef.value) {
          inputRef.value.value = "";
        }
        const resp = await apathia_shared.request("POST", props.action, buildFormData(file), {
          ...props.headers,
          withCredentials: props.withCredentials
        });
        let [url, urlErr] = await apathia_shared.promiseWrapper(props.resolveUrl(resp));
        if (urlErr || url === null) {
          (_a = props.onError) == null ? void 0 : _a.call(props, urlErr);
          return;
        }
        if (props.https) {
          url = url.replace(/^https?/, "https");
        }
        const [urlRes, processErr] = await apathia_shared.promiseWrapper(
          props.onAfterEachUpload ? props.onAfterEachUpload(url, file) : Promise.resolve(url)
        );
        if (processErr || urlRes === null) {
          (_b = props.onError) == null ? void 0 : _b.call(props, processErr);
          return;
        }
        emit(
          "update:modelValue",
          props.multiple ? props.modelValue.concat(urlRes) : urlRes
        );
      };
      const buildFormData = (file) => {
        const data = {
          ...typeof props.data === "function" ? props.data(file) : props.data,
          [props.name]: file
        };
        return Object.keys(data).reduce((fd, key) => {
          if (data[key] !== "") {
            fd.append(key, data[key]);
          }
          return fd;
        }, new FormData());
      };
      const handleTriggerClick = () => {
        if (disableUpload.value)
          return;
        if (inputRef.value) {
          inputRef.value.value = "";
          inputRef.value.click();
        }
      };
      const handleFileChange = (e) => {
        const { files } = e.target;
        uploadFiles(files);
      };
      const checkFileCount = (files) => {
        if (!files || !files.length) {
          return false;
        }
        if (props.multiple) {
          if (props.modelValue.length + files.length > props.limit) {
            console.warn("[Upload] files count exceed");
            return false;
          }
          return true;
        }
        if (files.length > 1) {
          console.warn("[Upload] only one file allowed");
          return false;
        }
        return true;
      };
      const handleUrlInput = async (value) => {
        emit("update:modelValue", value);
        if (!props.checkUrl) {
          return;
        }
        const [urlValid, urlErr] = await apathia_shared.promiseWrapper(props.checkUrl(value));
        if (urlErr || !urlValid) {
          emit("update:modelValue", "");
          return;
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", vue.mergeProps(_ctx.$attrs, {
            ref_key: "containerRef",
            ref: containerRef,
            class: containerClasses.value,
            draggable: _ctx.draggable
          }), [
            _ctx.draggable ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              onClick: handleTriggerClick
            }, [
              vue.renderSlot(_ctx.$slots, "drag", {}, () => [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(dragContainerClasses.value)
                }, [
                  vue.createVNode(vue.unref(apathia_icon.Icon), { size: 50 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(apathia_iconSvg.UploadFilled))
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("p", null, [
                    vue.createTextVNode(" \u5C06\u6587\u4EF6\u62D6\u5165\u6B64\u5904\u6216\u8005 "),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(styles).clickText)
                    }, "\u70B9\u51FB\u9009\u62E9", 2)
                  ])
                ], 2)
              ])
            ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              !_ctx.multiple && !_ctx.noInput ? (vue.openBlock(), vue.createBlock(vue.unref(apathia_input.Input), {
                key: 0,
                "model-value": _ctx.modelValue,
                disabled: _ctx.inputDisabled || disableUpload.value,
                style: { "display": "inline-block" },
                clearable: "",
                "onUpdate:modelValue": handleUrlInput
              }, null, 8, ["model-value", "disabled"])) : vue.createCommentVNode("", true),
              vue.createElementVNode("div", {
                style: { "display": "inline-block" },
                onClick: handleTriggerClick
              }, [
                vue.renderSlot(_ctx.$slots, "button", {}, () => [
                  vue.createVNode(vue.unref(apathia_button.BaseButton), {
                    primary: "",
                    disabled: disableUpload.value,
                    style: vue.normalizeStyle(uploadButtonStyles.value)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(_ctx.buttonName), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "style"])
                ])
              ])
            ], 64))
          ], 16, _hoisted_1),
          vue.createElementVNode("input", {
            ref_key: "inputRef",
            ref: inputRef,
            type: "file",
            multiple: _ctx.multiple,
            accept: _ctx.accept,
            style: { "display": "none" },
            onChange: handleFileChange
          }, null, 40, _hoisted_2)
        ], 64);
      };
    }
  });
  exports2.Upload = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
