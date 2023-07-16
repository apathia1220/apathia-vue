<template>
  <Input
    ref="containerRef"
    type="text"
    class="datepicker-control"
    :model-value="inputValue"
    readonly="readonly"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import {
  watch,
  ref,
  onMounted,
  onUnmounted,
  ComponentPublicInstance,
} from 'vue'
import { Input } from '@apathia/apathia.input'
import flatpickr from 'flatpickr'
import ConfirmPlugin from './confirmPlugin'
import { Mandarin } from 'flatpickr/./dist/l10n/zh'
import RangeSelectPlugin from './rangeSelectPlugin'
import type { DateFormatType, RangeItem, DateProps, DateEmits } from './types'

defineOptions({
  name: 'Datepicker',
})

const EnableTimeRegExp = /H|h|G|k/
const EnableSecondsRegExp = /S|s/

const TimeRegExpMap: Record<DateFormatType, string> = {
  'Y-m': '$1-$2',
  'Y-m-d': '$1-$2-$3',
  'Y-m-d H:i': '$1-$2-$3 $4:$5',
  'Y-m-d H:i:S': '$1-$2-$3 $4:$5:$6',
  'Y-m-d H:i:s': '$1-$2-$3 $4:$5:$6',
  'Y-m-d h:i:s': '$1-$2-$3 $4:$5:$6',
}

const date2stamp = (date: Date) => date.getTime() / 1000
const stamp2datestr = (stamp: number) =>
  new Date(stamp * 1000 + 8 * 3600 * 1000)
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ')

const props = withDefaults(defineProps<DateProps>(), {
  options: () => ({}),
  dateFormat: 'Y-m-d H:i:S',
  timestamp: false,
  range: () => ({}),
})

const emit = defineEmits<DateEmits>()
let fpInstance: flatpickr.Instance | null = null
const containerRef = ref<ComponentPublicInstance | null>(null)
const inputValue = ref(props.modelValue)

const initFlatpicker = () => {
  const options = {
    // default options
    locale: Mandarin,
    defaultHour: 0,
    time_24hr: true,
    minDate: undefined,
    maxDate: undefined,
    dateFormat: props.dateFormat,
    plugins: [
      ConfirmPlugin({
        confirmText: '确定 ',
        clearText: '清空 ',
        showAlways: true,
      }),
    ],

    onChange: (selectedDates: Date[], dateStr: string) => {
      const value = props.timestamp
        ? selectedDates[0]
          ? date2stamp(selectedDates[0])
          : 0
        : dateStr
      inputValue.value = dateStr
      emit('update:modelValue', value)
      emit('change', {
        dateStr,
        value,
      })
    },
    // fix: 设置了minDate,maxDate的情况下，如果小于 minDate 或者大于maxDate 就显示为空的问题
    onOpen: (
      selectedDates: Date[],
      dateStr: string,
      instance: flatpickr.Instance,
    ) => {
      instance.set('minDate', props.options.minDate)
      instance.set('maxDate', props.options.maxDate)
    },
    onClose: (
      selectedDates: Date[],
      dateStr: string,
      instance: flatpickr.Instance,
    ) => {
      instance.set('minDate', '')
      instance.set('maxDate', '')
    },
    enableTime: false,
    enableSeconds: false,
    ...(props.options || {}),
  }
  const rangeChange = (v: RangeItem) => {
    emit('rangeChange', v)
  }
  if (Object.keys(props.range).length) {
    options.plugins.push(RangeSelectPlugin(props.range, rangeChange))
  }

  if (EnableTimeRegExp.test(options.dateFormat)) {
    options.enableTime = true
  }
  if (EnableSecondsRegExp.test(options.dateFormat)) {
    options.enableSeconds = true
  }

  if (props.options.noCalendar) {
    options.onValueUpdate = (selectedDates: Date[], dateStr: string) => {
      emit('update:modelValue', dateStr)
    }
  }

  if (containerRef.value) {
    fpInstance = flatpickr((containerRef.value as any).inputRef, options)
    resetModelValue(props.modelValue)
  }
}

onMounted(() => {
  initFlatpicker()
})

onUnmounted(() => {
  fpInstance?.destroy()
})

// TODO: 这里是不是可以优化一下
function resetModelValue(newVal: number | string | undefined) {
  if (props.timestamp && typeof newVal === 'number') {
    const timeRegExp = TimeRegExpMap[props.dateFormat]
    // 0 要特殊处理一下
    inputValue.value = newVal
      ? stamp2datestr(newVal).replace(
          /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/,
          timeRegExp,
        )
      : ''
    fpInstance?.setDate(inputValue.value)
  } else {
    inputValue.value = newVal || ''
    fpInstance?.setDate(newVal || '')
  }
}

watch(
  () => props.modelValue,
  newVal => {
    resetModelValue(newVal)
  },
  {
    immediate: true,
  },
)

watch(
  () => props.options,
  newOptions => {
    if (fpInstance == null) {
      return
    }
    ;(
      Object.keys(newOptions) as Array<keyof flatpickr.Options.Options>
    ).forEach(key => {
      if (newOptions[key] !== undefined) {
        fpInstance?.set(key, newOptions[key])
      }
    })
    if (newOptions.enableTime && fpInstance && fpInstance.minuteElement) {
      fpInstance.minuteElement.style.display = 'none'
    }
  },
  { deep: true },
)
</script>

<style lang="scss">
@import './style/datepicker';
</style>
