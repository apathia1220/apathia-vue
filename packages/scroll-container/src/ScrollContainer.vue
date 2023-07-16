<template>
  <div
    ref="scrollContainerRef"
    :class="styles.scrollContainer"
    @mouseenter="() => (focus = true)"
    @mouseleave="() => (focus = false)"
  >
    <component
      :is="tag"
      ref="wrapRef"
      :style="scrollAreaStyle"
      @scroll.passive="handleAreaScroll"
    >
      <slot></slot>
    </component>

    <Scrollbar
      v-if="showScrollY"
      type="vertical"
      :class="styles.scrollbarY"
      :style="scrollbarYStyle"
      :length="verticalSlideHeight"
      :size="trackSize"
      :move="moveY"
      :hide="hideScrollbar"
      @change="onSlideYChange"
    />

    <Scrollbar
      v-if="showScrollX"
      type="horizontal"
      :class="styles.scrollbarX"
      :style="scrollbarXStyle"
      :length="horizontalSlideWidth"
      :size="trackSize"
      :move="moveX"
      :hide="hideScrollbar"
      @change="onSlideXChange"
    />
  </div>
</template>

<script setup lang="ts">
import ElementResizeDetectorMaker from 'element-resize-detector'
import {
  ref,
  computed,
  watch,
  reactive,
  onMounted,
  nextTick,
  onBeforeUnmount,
} from 'vue'
import { raf } from '@apathia/apathia.shared'
import { style, apply, tw, css } from '@apathia/apathia.twind'
import Scrollbar from './Scrollbar.vue'
import type { ScrollContainerProps } from './types'

defineOptions({
  name: 'ScrollContainer',
})

const SIDEBAR_SIDE_MAP = {
  thick: 20,
  normal: 15,
  thin: 10,
}

const getContainerStyles = () => {
  const scrollbar = apply`absolute bottom-0 right-0`
  return {
    scrollContainer: style`relative h-full overflow-hidden${css`
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
      }
    `}`,
    scrollbarY: tw`${scrollbar}${apply`top-0`}`,
    scrollbarX: tw`${scrollbar}${apply`left-0`}`,
  }
}

const props = withDefaults(defineProps<ScrollContainerProps>(), {
  size: 'normal',
  tag: 'div',
})

const emit = defineEmits(['update:scrollTop', 'update:scrollLeft'])

const focus = ref(false)
const position = reactive({
  top: 0,
  left: 0,
})
const scrollContainerRef = ref<HTMLDivElement | null>(null)
const wrapRef = ref<HTMLDivElement | null>(null)
const container = reactive({
  height: 0,
  width: 0,
})
const scrollArea = reactive({
  height: 0,
  width: 0,
})

const trackSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  if (['thick', 'normal', 'thin'].includes(props.size)) {
    return SIDEBAR_SIDE_MAP[props.size]
  }
  return SIDEBAR_SIDE_MAP.normal
})
// 不管是否显示滚动条，都应该能滚动
const scrollAreaStyle = computed(() => ({
  height: 'calc(100% + 15px)',
  width: 'calc(100% + 15px)',
  overflow: 'scroll',
}))
const hideScrollbar = computed(() => props.autoHide && !focus.value)

const maxTop = computed(() => scrollArea.height - container.height)
const maxLeft = computed(() => scrollArea.width - container.width)

const moveX = computed(() => {
  if (maxLeft.value === 0) return 0
  // left / maxLeft = scrollLeft / scrollerXSpace
  return (
    (position.left * (container.width - horizontalSlideWidth.value)) /
    maxLeft.value
  )
})
const showScrollX = computed(
  () => scrollArea.width > container.width + 15 && !props.hideHorizontal,
)
const scrollbarXStyle = computed(() => {
  if (scrollArea.height < container.height + 15) {
    return {
      top: `${scrollArea.height - trackSize.value}px`,
    }
  }
  return {
    bottom: 0,
  }
})
// scrollerXWidth / containerWidth = containerWidth / scrollAreaWidth
const horizontalSlideWidth = computed(() =>
  Math.max(
    (container.width * container.width) / scrollArea.width,
    trackSize.value,
  ),
)

const moveY = computed(() => {
  if (maxTop.value === 0) return 0
  // top / maxTop = scrollerYTop / scrollerYSpace
  // scrollerYHeight / containerHeight = containerHeight / scrollAreaHeight
  return (
    (position.top * (container.height - verticalSlideHeight.value)) /
    maxTop.value
  )
})
const showScrollY = computed(
  () => scrollArea.height > container.height + 15 && !props.hideVertical,
)
const scrollbarYStyle = computed(() => {
  if (scrollArea.width < container.width + 15) {
    return {
      left: `${scrollArea.width - trackSize.value}px`,
    }
  }
  return {
    right: 0,
  }
})
// top / maxTop = scrollerYTop / scrollerYSpace
// scrollerYHeight / containerHeight = containerHeight / scrollAreaHeight
const verticalSlideHeight = computed(() =>
  Math.max(
    (container.height * container.height) / scrollArea.height,
    trackSize.value,
  ),
)

const updateValue = (left: number, top: number) => {
  emit('update:scrollLeft', left)
  emit('update:scrollTop', top)
}
const updateScrollContainer = (left: number, top: number) => {
  if (wrapRef.value) {
    wrapRef.value.scrollLeft = left
    wrapRef.value.scrollTop = top
  }
}
const handleAreaScroll = (event: Event) => {
  const el = event.target as HTMLDivElement
  position.top = el.scrollTop
  position.left = el.scrollLeft
  updateValue(position.left, position.top)
}

const getSafePosition = (targetLeft: number, targetTop: number) => {
  const res = {
    left: position.left,
    top: position.top,
  }
  if (targetTop < 0) {
    res.top = 0
  } else if (targetTop > maxTop.value) {
    res.top = maxTop.value
  } else {
    res.top = targetTop
  }
  if (targetLeft < 0) {
    res.left = 0
  } else if (targetLeft > maxLeft.value) {
    res.left = maxLeft.value
  } else {
    res.left = targetLeft
  }
  return res
}
// can be called by parent
const scrollTo = (targetLeft: number, targetTop: number, duration = 0) => {
  const { left: finalLeft, top: finalTop } = getSafePosition(
    targetLeft,
    targetTop,
  )
  if (position.top === finalTop && position.left === finalLeft) {
    updateValue(position.left, position.top)
    return
  }

  // animation ease in and out
  // https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
  const cosParameterY = (position.top - finalLeft) / 2
  const cosParameterX = (position.left - finalLeft) / 2
  let scrollCount = 0
  let oldTimestamp = 0

  const step = (newTimestamp: number) => {
    if (oldTimestamp !== 0) {
      scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration
      if (scrollCount >= Math.PI) {
        position.top = finalTop
        position.left = finalLeft
      } else {
        position.top =
          cosParameterY + finalTop + cosParameterY * Math.cos(scrollCount)
        position.left =
          cosParameterX + finalLeft + cosParameterX * Math.cos(scrollCount)
      }
      updateScrollContainer(position.left, position.top)
    }
    if (!(scrollCount >= Math.PI)) {
      oldTimestamp = newTimestamp
      raf(step)
    }
  }

  if (duration > 0) {
    raf(step)
  } else {
    // no animation
    position.top = finalTop
    position.left = finalTop
    updateScrollContainer(finalLeft, finalTop)
    updateValue(position.left, position.top)
  }
}
// can be called by parent
const scrollBy = (targetLeft: number, targetTop: number, duration = 0) => {
  scrollTo(position.left + targetLeft, position.top + targetTop, duration)
}

const onSlideXChange = (params: { offset: number; duration?: number }) => {
  // offset / maxLeft = left / scrollWidth - containerWidth
  const left =
    (params.offset * (scrollArea.width - container.width)) /
    (container.width - horizontalSlideWidth.value)
  scrollTo(left, position.top, params.duration || 0)
}

const onSlideYChange = (params: { offset: number; duration?: number }) => {
  // offset / maxTop = top / (scrollHeight - containerHeight)
  const top =
    (params.offset * (scrollArea.height - container.height)) /
    (container.height - verticalSlideHeight.value)
  scrollTo(position.left, top, params.duration)
}

let watchedElem: HTMLElement | null = null
// let resizeOb: ReturnType<typeof setupResizeObserver>|null = null
let erd: ReturnType<typeof ElementResizeDetectorMaker> | null = null
const setupResizeObserver = (ele: HTMLElement) => {
  erd = ElementResizeDetectorMaker()
  watchedElem = ele
  erd.listenTo(ele, () => {
    getDomSize()
  })
}
const getDomSize = () => {
  const wrapEl = wrapRef.value
  if (!wrapEl) return
  const listEl = wrapEl.firstElementChild

  if (!listEl || !scrollContainerRef.value) return
  const { height: containerHeight, width: containerWidth } =
    scrollContainerRef.value.getBoundingClientRect()
  // const {
  //   height: scrollAreaHeight,
  //   width: scrollAreaWidth,
  // } = listEl.getBoundingClientRect()
  container.height = containerHeight
  container.width = containerWidth

  // scrollArea.height = scrollAreaHeight
  // scrollArea.width = scrollAreaWidth
  scrollArea.width = listEl.scrollWidth
  scrollArea.height = listEl.scrollHeight
}

watch(
  [() => props.scrollLeft, () => props.scrollTop],
  (values: (number | undefined)[]) => {
    const [newLeft, newTop] = values
    scrollTo(
      typeof newLeft === 'number' ? newLeft : position.left,
      typeof newTop === 'number' ? newTop : position.top,
      0,
    )
  },
  { immediate: true },
)

onMounted(() => {
  nextTick(() => {
    // children dom has been rendered
    if (!wrapRef.value || !wrapRef.value.firstElementChild) {
      return
    }
    setupResizeObserver(wrapRef.value.firstElementChild as HTMLElement)
  })
})
onBeforeUnmount(() => {
  if (erd && watchedElem) {
    erd.uninstall(watchedElem)
  }
  window.removeEventListener('resize', getDomSize)
})

// expose
defineExpose({
  scrollBy,
  scrollTo,
})

const styles = getContainerStyles()
</script>
