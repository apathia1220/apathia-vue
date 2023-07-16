import { defineComponent, ref, onMounted, onUnmounted, watch, openBlock, createBlock, unref, mergeProps, toRef, createElementBlock, normalizeClass, createVNode, createElementVNode } from "vue";
import { Input } from "@apathia/apathia.input";
import flatpickr from "flatpickr";
import { Mandarin } from "flatpickr/./dist/l10n/zh";
import { tw, css, apply, style } from "@apathia/apathia.twind";
import { useInjectProp } from "@apathia/apathia.hooks";
const defaultConfig = {
  clearIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  confirmIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  confirmText: "OK ",
  clearText: "CLEAR ",
  showAlways: false,
  theme: "light"
};
function confirmDatePlugin(pluginConfig) {
  const config = Object.assign(Object.assign({}, defaultConfig), pluginConfig);
  let btnContainer;
  let confirmBtn;
  let clearBtn;
  return function plugin(fp) {
    const hooks = Object.assign({
      onKeyDown(_, __, ___, e) {
        if (fp.config.enableTime && e.key === "Tab" && (e.target === fp.amPM || !fp.secondElement && e.target === fp.minuteElement || e.target === fp.secondElement)) {
          e.preventDefault();
          confirmBtn.focus();
        } else if (e.key === "Enter" && e.target === confirmBtn) {
          fp.close();
        }
      },
      onReady() {
        if (fp.calendarContainer === void 0)
          return;
        clearBtn = fp._createElement("div", "clear-btn", config.clearText);
        confirmBtn = fp._createElement("div", "confirm-btn", config.confirmText);
        btnContainer = fp._createElement("div", `flatpickr-confirm ${config.showAlways ? "visible" : ""} ${config.theme}Theme`, "");
        confirmBtn.tabIndex = -1;
        btnContainer.appendChild(clearBtn);
        clearBtn.innerHTML += config.clearIcon;
        btnContainer.appendChild(confirmBtn);
        confirmBtn.innerHTML += config.confirmIcon;
        clearBtn.addEventListener("click", () => {
          fp.clear();
          fp.close();
        });
        confirmBtn.addEventListener("click", fp.close);
        fp.calendarContainer.appendChild(btnContainer);
      }
    }, !config.showAlways ? {
      onChange(_, dateStr) {
        const showCondition = fp.config.enableTime || fp.config.mode === "multiple";
        if (dateStr && !fp.config.inline && showCondition) {
          return btnContainer.classList.add("visible");
        }
        btnContainer.classList.remove("visible");
        return true;
      }
    } : {});
    return hooks;
  };
}
function RangeSelectPlugin(range, change) {
  return function plugin(fp) {
    return {
      onKeyDown() {
      },
      onReady() {
        const container = document.createElement("div");
        const containerClass = tw(css`
          position: absolute;
          top: 0;
          left: -100px;
          width: 100px;
          box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6,
            0 -1px 0 #e6e6e6;
          border-radius: 5px;
          height: 100%;
          overflow: auto;
          background-color: #fff;
        `);
        container.className = containerClass;
        Object.entries(range).forEach(([key, val]) => {
          const itemEl = document.createElement("div");
          const itemClass = tw(css`
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              ${apply`hover:(bg-brand-500 text-white)`}
            `);
          itemEl.className = itemClass;
          itemEl.innerText = key;
          itemEl.onclick = () => {
            change(val);
            fp.close();
          };
          container.appendChild(itemEl);
        });
        fp.calendarContainer.appendChild(container);
      }
    };
  };
}
var Datepicker_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = defineComponent({
  ...{
    name: "Datepicker"
  },
  __name: "Datepicker",
  props: {
    options: { default: () => ({}) },
    modelValue: {},
    dateFormat: { default: "Y-m-d H:i:S" },
    timestamp: { type: Boolean, default: false },
    range: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "rangeChange"],
  setup(__props, { emit }) {
    const props = __props;
    const EnableTimeRegExp = /H|h|G|k/;
    const EnableSecondsRegExp = /S|s/;
    const TimeRegExpMap = {
      "Y-m": "$1-$2",
      "Y-m-d": "$1-$2-$3",
      "Y-m-d H:i": "$1-$2-$3 $4:$5",
      "Y-m-d H:i:S": "$1-$2-$3 $4:$5:$6",
      "Y-m-d H:i:s": "$1-$2-$3 $4:$5:$6",
      "Y-m-d h:i:s": "$1-$2-$3 $4:$5:$6"
    };
    const date2stamp = (date) => date.getTime() / 1e3;
    const stamp2datestr = (stamp) => new Date(stamp * 1e3 + 8 * 3600 * 1e3).toJSON().substr(0, 19).replace("T", " ");
    let fpInstance = null;
    const containerRef = ref(null);
    const inputValue = ref(props.modelValue);
    const initFlatpicker = () => {
      const options = {
        locale: Mandarin,
        defaultHour: 0,
        time_24hr: true,
        minDate: void 0,
        maxDate: void 0,
        dateFormat: props.dateFormat,
        plugins: [
          confirmDatePlugin({
            confirmText: "\u786E\u5B9A ",
            clearText: "\u6E05\u7A7A ",
            showAlways: true
          })
        ],
        onChange: (selectedDates, dateStr) => {
          const value = props.timestamp ? selectedDates[0] ? date2stamp(selectedDates[0]) : 0 : dateStr;
          inputValue.value = dateStr;
          emit("update:modelValue", value);
          emit("change", {
            dateStr,
            value
          });
        },
        onOpen: (selectedDates, dateStr, instance) => {
          instance.set("minDate", props.options.minDate);
          instance.set("maxDate", props.options.maxDate);
        },
        onClose: (selectedDates, dateStr, instance) => {
          instance.set("minDate", "");
          instance.set("maxDate", "");
        },
        enableTime: false,
        enableSeconds: false,
        ...props.options || {}
      };
      const rangeChange = (v) => {
        emit("rangeChange", v);
      };
      if (Object.keys(props.range).length) {
        options.plugins.push(RangeSelectPlugin(props.range, rangeChange));
      }
      if (EnableTimeRegExp.test(options.dateFormat)) {
        options.enableTime = true;
      }
      if (EnableSecondsRegExp.test(options.dateFormat)) {
        options.enableSeconds = true;
      }
      if (props.options.noCalendar) {
        options.onValueUpdate = (selectedDates, dateStr) => {
          emit("update:modelValue", dateStr);
        };
      }
      if (containerRef.value) {
        fpInstance = flatpickr(containerRef.value.inputRef, options);
        resetModelValue(props.modelValue);
      }
    };
    onMounted(() => {
      initFlatpicker();
    });
    onUnmounted(() => {
      fpInstance == null ? void 0 : fpInstance.destroy();
    });
    function resetModelValue(newVal) {
      if (props.timestamp && typeof newVal === "number") {
        const timeRegExp = TimeRegExpMap[props.dateFormat];
        inputValue.value = newVal ? stamp2datestr(newVal).replace(
          /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/,
          timeRegExp
        ) : "";
        fpInstance == null ? void 0 : fpInstance.setDate(inputValue.value);
      } else {
        inputValue.value = newVal || "";
        fpInstance == null ? void 0 : fpInstance.setDate(newVal || "");
      }
    }
    watch(
      () => props.modelValue,
      (newVal) => {
        resetModelValue(newVal);
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.options,
      (newOptions) => {
        if (fpInstance == null) {
          return;
        }
        Object.keys(newOptions).forEach((key) => {
          if (newOptions[key] !== void 0) {
            fpInstance == null ? void 0 : fpInstance.set(key, newOptions[key]);
          }
        });
        if (newOptions.enableTime && fpInstance && fpInstance.minuteElement) {
          fpInstance.minuteElement.style.display = "none";
        }
      },
      { deep: true }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Input), mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        type: "text",
        class: "datepicker-control",
        "model-value": inputValue.value,
        readonly: "readonly"
      }, _ctx.$attrs), null, 16, ["model-value"]);
    };
  }
});
const _sfc_main = defineComponent({
  __name: "DatepickerGroup",
  props: {
    startTime: {},
    endTime: {},
    dateFormat: { default: "Y-m-d H:i:S" },
    timestamp: { type: Boolean, default: false },
    disabled: { type: Boolean, default: void 0 },
    startDateOptions: { default: () => ({}) },
    endDateOptions: { default: () => ({}) },
    range: { default: () => ({}) }
  },
  emits: ["update:startTime", "update:endTime"],
  setup(__props, { emit }) {
    const props = __props;
    const getStyles = () => ({
      layout: style`flex items-center`,
      divider: style`mx-2`
    });
    const disableInput = useInjectProp(
      "FormDisabled",
      false,
      toRef(props, "disabled")
    );
    const startOptions = ref({
      ...props.startDateOptions,
      dateFormat: props.dateFormat,
      maxDate: void 0
    });
    const endOptions = ref({
      ...props.endDateOptions,
      dateFormat: props.dateFormat,
      minDate: void 0
    });
    const styles = getStyles();
    watch(
      () => [props.startTime, props.endTime],
      ([s, e]) => {
        if (!s) {
          endOptions.value.minDate = void 0;
        }
        if (!e) {
          startOptions.value.maxDate = void 0;
        }
      }
    );
    function startDateChange({
      dateStr,
      value
    }) {
      endOptions.value.minDate = dateStr;
      emit("update:startTime", value);
    }
    function endDateChange({
      dateStr,
      value
    }) {
      startOptions.value.maxDate = dateStr;
      emit("update:endTime", value);
    }
    function rangeChange(newVal) {
      const [start, end] = newVal;
      emit("update:startTime", start);
      emit("update:endTime", end);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(styles).layout)
      }, [
        createVNode(_sfc_main$1, {
          "model-value": _ctx.startTime,
          options: startOptions.value,
          timestamp: _ctx.timestamp,
          range: _ctx.range,
          placeholder: "\u5F00\u59CB\u65F6\u95F4",
          disabled: unref(disableInput),
          onChange: startDateChange,
          onRangeChange: rangeChange
        }, null, 8, ["model-value", "options", "timestamp", "range", "disabled"]),
        createElementVNode("span", {
          class: normalizeClass(unref(styles).divider)
        }, "-", 2),
        createVNode(_sfc_main$1, {
          "model-value": _ctx.endTime,
          options: endOptions.value,
          timestamp: _ctx.timestamp,
          range: _ctx.range,
          placeholder: "\u7ED3\u675F\u65F6\u95F4",
          disabled: unref(disableInput),
          onChange: endDateChange,
          onRangeChange: rangeChange
        }, null, 8, ["model-value", "options", "timestamp", "range", "disabled"])
      ], 2);
    };
  }
});
export { _sfc_main$1 as Datepicker, _sfc_main as DatepickerGroup };
