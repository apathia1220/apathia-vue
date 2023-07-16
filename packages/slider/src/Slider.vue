<template>
  <div :class="styles.sliderWrap">
    <div
      :class="{
        [styles.slider]: true,
        [styles.sliderX]: !vertical,
        [styles.sliderY]: vertical,
      }"
      :style="sliderStyle"
      @click="handleTrackClick"
    >
      <div
        ref="trackRef"
        :class="{
          [styles.track]: true,
          [styles.trackX]: !vertical,
          [styles.trackY]: vertical,
          [styles.trackHover]: dragging,
        }"
      ></div>
      <div
        :class="{
          [styles.steps]: true,
          [styles.stepsX]: !vertical,
          [styles.stepsY]: vertical,
          [styles.stepsHover]: dragging,
        }"
        :style="stepsStyle"
      ></div>

      <!-- 放在选中的div后面，实现了 step 点的显示，层叠顺序 -->
      <Stops
        v-if="showSteps"
        :step="step"
        :min="min"
        :max="max"
        :vertical="vertical"
        :marks="marks"
      />
      <Popper
        v-if="showTooltip"
        ref="popperRef"
        v-model="popperVisible"
        dark
        :placement="vertical ? 'right' : 'bottom'"
        trigger="hover"
        :class="[styles.popperWrap, vertical ? styles.buttonY : styles.buttonX]"
        :style="btnEndStyle"
      >
        <div
          ref="buttonRef"
          :class="[styles.button, dragging ? styles.buttonHover : '']"
          @mousedown="startDrag"
        ></div>
        <template #content>
          {{ formatTooltip(modelValue) }}
        </template>
      </Popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef } from 'vue'
import { Popper } from '@apathia/apathia.popper'
import {
  useEventListener,
  useToggle,
  useInjectProp,
} from '@apathia/apathia.hooks'
import { style, css } from '@apathia/apathia.twind'
import { VueInstance } from '@apathia/apathia.shared'
import Stops from './Stop.vue'
import type { SliderProps, SliderEmits } from './types'

defineOptions({
  name: 'Slider',
})

const getSliderStyles = () => ({
  sliderWrap: style`text-2xl`,
  slider: style`group relative h-2 box-border inline-block`,
  sliderX: style`py-2 w-full`,
  sliderY: style`px-2`,
  track: style`absolute bg-fill-gray rounded transition group-hover:bg-fill-secondary`,
  trackX: style`h-1 w-full`,
  trackY: style`w-1 h-full`,
  trackHover: style`bg-fill-secondary`,
  steps: style`relative rounded bg-brand-primary group-hover:bg-brand-active`,
  stepsX: style`h-1`,
  stepsY: style`w-1 absolute bottom-0`,
  stepsHover: style`bg-brand-active`,
  button: style`group-hover:border-brand-active border(2 solid brand-primary) h-4 w-4 bg-fill-white rounded-lg cursor-pointer ${css`
    z-index: 1;
  `}`,
  popperWrap: style`absolute`,
  buttonHover: style`border-brand-active`,
  buttonX: style`-translate-x-1/2${css`
    top: 2px;
  `}`,
  buttonY: style`translate-y-1/2${css`
    left: 2px;
  `}`,
})

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  showTooltip: true,
  formatTooltip: (cur: number) => cur,
  marks: () => ({}),
})

const emit = defineEmits<SliderEmits>()

const isTouchEvent = (e: Event): e is TouchEvent => e.type.startsWith('touch')

const styles = getSliderStyles()

const trackRef = ref<HTMLElement | null>(null)
const moveRange = reactive<Record<'clientX' | 'clientY', [number, number]>>({
  clientX: [0, 0],
  clientY: [0, 0],
})

const disableDrag = useInjectProp('Form', false, toRef(props, 'disabled'))

const buttonRef = ref<HTMLElement | null>(null)
const buttonSize = ref(0)

const popperRef = ref<VueInstance | null>(null)
const popperVisible = ref(false)

onMounted(() => {
  if (trackRef.value) {
    const { x, y, height, width } = trackRef.value.getBoundingClientRect()
    moveRange.clientX = props.vertical ? [0, 0] : [x, x + width]
    moveRange.clientY = props.vertical ? [y, y + height] : [0, 0]
  }
  if (buttonRef.value) {
    buttonSize.value = buttonRef.value.offsetWidth
  }
})

const [dragging, , setDragging] = useToggle(false)
const btnEndStyle = computed(() => {
  const value = `${
    ((props.modelValue - props.min) / props.max - props.min) * 100
  }%`
  return props.vertical ? { bottom: value } : { left: value }
})
const sliderStyle = computed(() =>
  props.vertical ? { height: `${props.height}px` } : {},
)
const stepsStyle = computed(() => {
  const value = `${
    ((props.modelValue - props.min) / props.max - props.min) * 100
  }%`
  return props.vertical ? { height: value } : { width: value }
})

const stopFns: ((...args: any[]) => any)[] = []
const startDrag = (e: MouseEvent) => {
  if (disableDrag.value) {
    return
  }
  e.preventDefault()
  setDragging(true)
  stopFns.push(useEventListener(window, 'mousemove', handleDragging))
  stopFns.push(useEventListener(window, 'touchmove', handleDragging))
  stopFns.push(useEventListener(window, 'mouseup', stopDrag))
  stopFns.push(useEventListener(window, 'touchend', stopDrag))
  stopFns.push(useEventListener(window, 'contextmenu', stopDrag))
}
const stopDrag = () => {
  setDragging(false)
  stopFns.forEach(fn => fn && fn())
  popperVisible.value = false
}

const resolveValueInRange = (targetPos: number, posRange: [number, number]) => {
  // targetPos 一定在posRange中间
  const valueRange = [props.min, props.max]
  const step = props.step
  const totalPixels = posRange[1] - posRange[0]
  const stepPixels = totalPixels / ((valueRange[1] - valueRange[0]) / step)
  const deltaPixel = targetPos - posRange[0]

  let result = props.vertical ? props.max : props.min
  const stepFn = (cur: number) => (props.vertical ? cur - step : cur + step)
  let beginPixel = 0

  while (beginPixel <= totalPixels) {
    if (beginPixel <= deltaPixel && deltaPixel <= beginPixel + stepPixels) {
      break
    }
    beginPixel += stepPixels
    result = stepFn(result)
  }

  // 看看靠近哪边？
  return deltaPixel - beginPixel > beginPixel + stepPixels - deltaPixel
    ? stepFn(result)
    : result
}
const getFinalValue = (position: { clientX: number; clientY: number }) => {
  const trackEl = trackRef.value
  if (!trackEl) {
    return 0
  }

  // 实时获取位置
  const rect = trackEl.getBoundingClientRect()
  const positionRange: [number, number] = props.vertical
    ? [rect.y, rect.y + rect.height]
    : [rect.x, rect.x + rect.width]

  if (
    (!props.vertical && position.clientX >= positionRange[1]) ||
    (props.vertical && position.clientY <= positionRange[0])
  ) {
    return props.max
  }
  if (
    (!props.vertical && position.clientX <= positionRange[0]) ||
    (props.vertical && position.clientY >= positionRange[1])
  ) {
    return props.min
  }

  return resolveValueInRange(
    props.vertical ? position.clientY : position.clientX,
    positionRange,
  )
}
const handleDragging = (e: MouseEvent | TouchEvent) => {
  if (dragging.value) {
    handleTrackClick(e)

    if (
      popperRef.value &&
      popperRef.value.update &&
      typeof popperRef.value.update === 'function'
    ) {
      popperRef.value && popperRef.value.update()
    }
    popperVisible.value = true
  }
}
const handleTrackClick = (e: MouseEvent | TouchEvent) => {
  if (!disableDrag.value) {
    const value = getFinalValue(getClientPosition(e))

    let valueInRange = true
    if (props.valueRange !== undefined) {
      const [rangeMin = props.min, rangeMax = props.max] = props.valueRange
      valueInRange = value >= rangeMin && value <= rangeMax
    }
    if (valueInRange) {
      emit('update:modelValue', value)
    }
  }
}

const getClientPosition = (e: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number

  if (isTouchEvent(e)) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  return {
    clientX,
    clientY,
  }
}
</script>
