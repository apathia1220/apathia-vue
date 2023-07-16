import { ref, defineComponent, inject, watch, computed, openBlock, createElementBlock, Fragment, createElementVNode, mergeProps, renderSlot, normalizeClass, createVNode, unref, withCtx, createTextVNode, createBlock, createCommentVNode, normalizeStyle, toDisplayString } from "vue";
import { style, css } from "@apathia/apathia.twind";
import { toast } from "@apathia/apathia.alert";
import { BaseButton } from "@apathia/apathia.button";
import { Input } from "@apathia/apathia.input";
import { Icon } from "@apathia/apathia.icon";
import { promiseWrapper, request } from "@apathia/apathia.shared";
import { useEventListener } from "@apathia/apathia.hooks";
import { UploadFilled } from "@apathia/apathia.icon-svg";
function useDragDrop(el, disabled, processFiles) {
  const dragging = ref(false);
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
  useEventListener(el, "dragenter", dragenter);
  useEventListener(el, "drop", drop);
  useEventListener(el, "dragover", dragover);
  useEventListener(el, "dragleave", dragleave);
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
const _sfc_main = defineComponent({
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
      trigger: style`flex items-start border-0`,
      drag: style`group flex justify-center text-content-primary py-4 flex-col items-center bg-fill-light 
    border(2 dashed line-accent) rounded cursor-pointer hover:(border-brand-primary text-content-accent)
    ${css({ "min-height": "4rem", "min-width": "5rem" })}`,
      dragging: style`border(brand-primary) rounded-md text-brand-primary`,
      disabled: style`cursor-not-allowed hover:(border(& dashed brand-active) text-content-primary)`,
      clickText: style`text-brand-primary group-hover:(text-brand-active)`,
      fileIcon: style`block text-content-secondary group-hover:(text-content-accent) ${css`
    width: 1.5rem !important;
  `}`
    });
    const styles = getStyles();
    const formDisabled = inject("FormDisabled", ref(false));
    const containerRef = ref(null);
    const inputRef = ref(null);
    watch(
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
          const [urlsValid, checkErr] = await promiseWrapper(
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
    const disableUpload = computed(() => {
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
    const containerClasses = computed(() => ({
      [styles.trigger]: !props.draggable
    }));
    const dragContainerClasses = computed(() => ({
      [styles.drag]: props.draggable,
      [styles.dragging]: props.draggable && dragging.value,
      [styles.disabled]: props.draggable && disableUpload.value
    }));
    const uploadButtonStyles = computed(() => ({
      margin: `0 0 0 ${!props.multiple && !props.noInput ? "0.25rem" : "0"}`,
      whiteSpace: "nowrap"
    }));
    const uploadFiles = async (files) => {
      if (!checkFileCount(files)) {
        return;
      }
      const [allowUploadAllRes, uploadAllErr] = await promiseWrapper(
        props.onBeforeAllUpload ? props.onBeforeAllUpload(files) : Promise.resolve(true)
      );
      if (uploadAllErr || !allowUploadAllRes) {
        return;
      }
      const fileArr = Array.prototype.slice.call(files);
      for (const file of fileArr) {
        const [processedFile, processErr] = await promiseWrapper(
          props.onBeforeEachUpload ? props.onBeforeEachUpload(file) : Promise.resolve(file)
        );
        if (processErr || !processedFile) {
          console.error(processErr || new Error("[Upload] invalid file"));
          return;
        }
        if (props.fileSize && processedFile.size > props.fileSize) {
          const filesizeText = sizeFormat(props.fileSize, 0);
          toast.danger("\u9519\u8BEF", `\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${filesizeText}`);
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
      const resp = await request("POST", props.action, buildFormData(file), {
        ...props.headers,
        withCredentials: props.withCredentials
      });
      let [url, urlErr] = await promiseWrapper(props.resolveUrl(resp));
      if (urlErr || url === null) {
        (_a = props.onError) == null ? void 0 : _a.call(props, urlErr);
        return;
      }
      if (props.https) {
        url = url.replace(/^https?/, "https");
      }
      const [urlRes, processErr] = await promiseWrapper(
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
      const [urlValid, urlErr] = await promiseWrapper(props.checkUrl(value));
      if (urlErr || !urlValid) {
        emit("update:modelValue", "");
        return;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", mergeProps(_ctx.$attrs, {
          ref_key: "containerRef",
          ref: containerRef,
          class: containerClasses.value,
          draggable: _ctx.draggable
        }), [
          _ctx.draggable ? (openBlock(), createElementBlock("div", {
            key: 0,
            onClick: handleTriggerClick
          }, [
            renderSlot(_ctx.$slots, "drag", {}, () => [
              createElementVNode("div", {
                class: normalizeClass(dragContainerClasses.value)
              }, [
                createVNode(unref(Icon), { size: 50 }, {
                  default: withCtx(() => [
                    createVNode(unref(UploadFilled))
                  ]),
                  _: 1
                }),
                createElementVNode("p", null, [
                  createTextVNode(" \u5C06\u6587\u4EF6\u62D6\u5165\u6B64\u5904\u6216\u8005 "),
                  createElementVNode("span", {
                    class: normalizeClass(unref(styles).clickText)
                  }, "\u70B9\u51FB\u9009\u62E9", 2)
                ])
              ], 2)
            ])
          ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !_ctx.multiple && !_ctx.noInput ? (openBlock(), createBlock(unref(Input), {
              key: 0,
              "model-value": _ctx.modelValue,
              disabled: _ctx.inputDisabled || disableUpload.value,
              style: { "display": "inline-block" },
              clearable: "",
              "onUpdate:modelValue": handleUrlInput
            }, null, 8, ["model-value", "disabled"])) : createCommentVNode("", true),
            createElementVNode("div", {
              style: { "display": "inline-block" },
              onClick: handleTriggerClick
            }, [
              renderSlot(_ctx.$slots, "button", {}, () => [
                createVNode(unref(BaseButton), {
                  primary: "",
                  disabled: disableUpload.value,
                  style: normalizeStyle(uploadButtonStyles.value)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.buttonName), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "style"])
              ])
            ])
          ], 64))
        ], 16, _hoisted_1),
        createElementVNode("input", {
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
export { _sfc_main as Upload };
