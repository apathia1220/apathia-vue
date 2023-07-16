<template>
  <div :class="styles.layout">
    <DatePicker
      :model-value="startTime"
      :options="startOptions"
      :timestamp="timestamp"
      :range="range"
      placeholder="开始时间"
      :disabled="disableInput"
      @change="startDateChange"
      @rangeChange="rangeChange"
    />
    <span :class="styles.divider">-</span>
    <DatePicker
      :model-value="endTime"
      :options="endOptions"
      :timestamp="timestamp"
      :range="range"
      placeholder="结束时间"
      :disabled="disableInput"
      @change="endDateChange"
      @rangeChange="rangeChange"
    />
  </div>
</template>

<script setup lang="ts">
import flatpickr from 'flatpickr'
import { ref, toRef, watch } from 'vue'
import { style } from '@apathia/apathia.twind'
import { useInjectProp } from '@apathia/apathia.hooks'
import DatePicker from './Datepicker.vue'
import type { RangeItem, GroupProps, GroupEmits } from './types'

const getStyles = () => ({
  layout: style`flex items-center`,
  divider: style`mx-2`,
})

const props = withDefaults(defineProps<GroupProps>(), {
  dateFormat: 'Y-m-d H:i:S',
  timestamp: false,
  disabled: undefined,
  startDateOptions: () => ({}),
  endDateOptions: () => ({}),
  range: () => ({}),
})

const emit = defineEmits<GroupEmits>()

const disableInput = useInjectProp(
  'FormDisabled',
  false,
  toRef(props, 'disabled'),
)

const startOptions = ref<flatpickr.Options.Options>({
  ...props.startDateOptions,
  dateFormat: props.dateFormat,
  maxDate: undefined,
})
const endOptions = ref<flatpickr.Options.Options>({
  ...props.endDateOptions,
  dateFormat: props.dateFormat,
  minDate: undefined,
})

const styles = getStyles()

watch(
  () => [props.startTime, props.endTime],
  ([s, e]) => {
    if (!s) {
      endOptions.value.minDate = undefined
    }
    if (!e) {
      startOptions.value.maxDate = undefined
    }
  },
)
function startDateChange({
  dateStr,
  value,
}: {
  dateStr: string
  value: string | number
}) {
  endOptions.value.minDate = dateStr
  emit('update:startTime', value)
}

function endDateChange({
  dateStr,
  value,
}: {
  dateStr: string
  value: string | number
}) {
  startOptions.value.maxDate = dateStr
  emit('update:endTime', value)
}

function rangeChange(newVal: RangeItem) {
  const [start, end] = newVal
  emit('update:startTime', start)
  emit('update:endTime', end)
}
</script>
