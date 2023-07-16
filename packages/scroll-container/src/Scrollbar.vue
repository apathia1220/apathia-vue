<template>
  <div
    ref="trackContainerRef"
    :class="styles.track"
    :style="trackStyle"
    @click="handleTrackClick"
    @wheel.passive="handleTrackScroll"
  >
    <div :style="slideStyle" :class="styles.slide" @mousedown="startDrag"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { throttle } from 'lodash-es'
import { style } from '@apathia/apathia.twind'
import type { ScrollbarProps, ScrollbarEmits } from './types'

defineOptions({
  name: 'Scrollbar',
})

const getBarStyles = () => ({
  track: style`transition-opacity group`,
  slide: style`bg-fill-neutral group-hover:bg-fill-accent`,
})

const props = defineProps<ScrollbarProps>()

const emit = defineEmits<ScrollbarEmits>()

const trackPosition = reactive({
  clientX: 0,
  clientY: 0,
})
const track = ref(0)
const dragging = ref(false)
const trackContainerRef = ref<HTMLDivElement | null>(null)

const fields = computed<{
  track: 'offsetWidth' | 'offsetHeight'
  size: 'height' | 'width'
  length: 'height' | 'width'
  slideTranslate: 'translateX' | 'translateY'
  mouseClient: 'clientX' | 'clientY'
  scrollDelta: 'deltaX' | 'deltaY'
}>(() => {
  const isHorizontal = props.type === 'horizontal'
  return {
    track: isHorizontal ? 'offsetWidth' : 'offsetHeight',
    size: isHorizontal ? 'height' : 'width', // size 作用的属性
    length: isHorizontal ? 'width' : 'height', // length 作用的属性
    slideTranslate: isHorizontal ? 'translateX' : 'translateY', // `translate${posField}`, // 滑块移动作用的属性
    mouseClient: isHorizontal ? 'clientX' : 'clientY', // `client${posField}`, // 跟随鼠标的属性
    scrollDelta: isHorizontal ? 'deltaX' : 'deltaY', // `delta${posField}`, // scroll事件的属性
  }
})
const trackStyle = computed(() => ({
  borderRadius: `${props.size / 2}px`,
  [fields.value.size]: `${props.size}px`,
  opacity: props.hide && !dragging.value ? 0 : 1,
}))

const slideStyle = computed(() => ({
  borderRadius: `${props.size / 2}px`,
  [fields.value.length]: `${props.length}px`,
  transform: `${fields.value.slideTranslate}(${props.move}px)`,
  [fields.value.size]: '100%',
}))

const handleTrackClick = (event: MouseEvent) => {
  const offset =
    event[fields.value.mouseClient] - trackPosition[fields.value.mouseClient]
  emit('change', { offset: calculate(offset), duration: 300 })
}
const calculate = (offset: number) => {
  let res = 0
  if (offset < props.length / 2) {
    res = 0
  } else if (offset > track.value - props.length / 2) {
    res = track.value - props.length
  } else {
    res = offset - props.length / 2
  }
  return res
}
// eslint-disable-next-line prefer-arrow-callback
const handleTrackScroll = throttle(function cb(event: WheelEvent) {
  emit('change', {
    offset: props.move + event[fields.value.scrollDelta],
  })
}, 16)
const handleDragSlide = (event: MouseEvent) => {
  if (!dragging.value) return

  const offset = calculate(
    event[fields.value.mouseClient] - trackPosition[fields.value.mouseClient],
  )
  emit('change', { offset })
  event.preventDefault()
  event.stopPropagation()
}
const startDrag = () => {
  dragging.value = true
  document.addEventListener('mousemove', handleDragSlide)
  // document.addEventListener('touchmove', handleDragSlide)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
}
const stopDrag = () => {
  dragging.value = false
  document.removeEventListener('mousemove', handleDragSlide)
  // document.removeEventListener('touchmove', handleDragSlide)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

onMounted(() => {
  if (!trackContainerRef.value) return

  const { x, y } = trackContainerRef.value.getBoundingClientRect()
  trackPosition.clientX = x
  trackPosition.clientY = y
  if (trackContainerRef.value) {
    track.value = trackContainerRef.value[fields.value.track]
  }
})

const styles = getBarStyles()
</script>
