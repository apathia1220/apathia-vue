<template>
  <div
    :class="[styles.stopWrap, vertical ? styles.stopWrapY : styles.stopWrapX]"
  >
    <div
      v-for="(count, index) in stepCount + 1"
      :key="index"
      :class="[styles.stop, vertical ? styles.stopY : styles.stopX]"
      :style="{
        [vertical ? 'bottom' : 'left']: `${(1 / stepCount) * index * 100}%`,
      }"
    >
      <span
        :class="[
          styles.stopText,
          vertical ? styles.stopTextY : styles.stopTextX,
        ]"
        :style="(marks[getValueByStep(count - 1)] || {}).style"
      >
        {{ (marks[getValueByStep(count - 1)] || {}).label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { style } from '@apathia/apathia.twind'
import type { StopProps } from './types'

defineOptions({
  name: 'Stop',
})

const getStopStyles = () => ({
  stopWrap: style`absolute`,
  stopWrapX: style`w-full h-1 top-2`,
  stopWrapY: style`h-full w-1`,
  stop: style`w-1 h-1 absolute inline-block bg-fill-white rounded-full`,
  stopX: style``,
  stopY: style``,
  stopText: style`inline-block whitespace-nowrap`,
  stopTextX: style`-translate-x-1/2 pt-3`,
  stopTextY: style`-translate-y-1/2 pl-3`,
})

const props = withDefaults(defineProps<StopProps>(), {
  marks: () => ({}),
})

const stepCount = computed(() => (props.max - props.min) / props.step)
const getValueByStep = (s: number) => props.min + props.step * s
const styles = getStopStyles()
</script>
