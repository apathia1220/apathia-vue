<template>
  <div ref="affixRef">
    <div ref="pointRef" :class="classes" :style="styles">
      <slot></slot>
    </div>
    <div v-show="slot" :style="slotStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { tw, apply } from '@apathia/apathia.twind'
import type { AffixProps, AffixEmit } from './types'

defineOptions({
  name: 'Affix',
})

const props = withDefaults(defineProps<AffixProps>(), {
  offsetTop: 0,
})

const emit = defineEmits<AffixEmit>()

const affixRef = ref<HTMLElement | null>(null)
const pointRef = ref<HTMLElement | null>(null)
const affix = ref<boolean>(false)
const styles = ref<{
  top?: string
  bottom?: string
  left?: string
  width?: string
}>({})

const slot = ref(false)
const slotStyle = ref<{ height?: string; width?: string }>({})

const offsetType = computed(() =>
  props.offsetBottom !== undefined && props.offsetBottom >= 0
    ? 'bottom'
    : 'top',
)

const fixedStyles = tw`${apply`fixed z-50`}`
const classes = computed(() => ({
  [fixedStyles]: affix.value,
}))

const getWindowScroll = (top = false) =>
  window[top ? 'pageYOffset' : 'pageXOffset']

const getOffset = (elem: HTMLElement) => {
  const rect = elem.getBoundingClientRect()
  const scrollTop = getWindowScroll(true)
  const scrollLeft = getWindowScroll()
  const docEl = window.document.body || {}
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft,
  }
}

const isElHidden = (elem: HTMLElement) => elem.offsetParent === null

const handleScroll = () => {
  const el = affixRef.value
  if (!el) {
    return
  }

  const scrollTop = getWindowScroll(true)
  const elOffset = getOffset(el)
  const isHidden = isElHidden(el)
  const windowHeight = window.innerHeight
  const elHeight = el.getElementsByTagName('div')[0].offsetHeight

  const isLeftChanged =
    styles.value && styles.value.left !== `${elOffset.left}px`
  if (!isHidden && isLeftChanged && affix) {
    styles.value.left = `${elOffset.left}px`
  }

  // Fixed Top
  if (
    elOffset.top - props.offsetTop < scrollTop &&
    offsetType.value === 'top' &&
    !affix.value
  ) {
    if (!pointRef.value || !affixRef.value) {
      return
    }

    affix.value = true
    slot.value = true
    styles.value = {
      top: `${props.offsetTop}px`,
      left: `${elOffset.left}px`,
      width: `${affixRef.value.offsetWidth}px`,
    }
    emit('change', true)
  } else if (
    elOffset.top - props.offsetTop > scrollTop &&
    offsetType.value === 'top' &&
    affix
  ) {
    slot.value = false
    slotStyle.value = {}
    affix.value = false
    styles.value = {}
    emit('change', false)
  }

  // Fixed Bottom
  if (
    props.offsetBottom !== undefined &&
    elOffset.top + props.offsetBottom + elHeight > scrollTop + windowHeight &&
    offsetType.value === 'bottom' &&
    !affix.value
  ) {
    if (!affixRef.value) {
      return
    }

    affix.value = true
    styles.value = {
      bottom: `${props.offsetBottom}px`,
      left: `${elOffset.left}px`,
      width: `${affixRef.value.offsetWidth}px`,
    }
    emit('change', true)
  } else if (
    props.offsetBottom !== undefined &&
    elOffset.top + props.offsetBottom + elHeight < scrollTop + windowHeight &&
    offsetType.value === 'bottom' &&
    affix
  ) {
    affix.value = false
    styles.value = {}
    emit('change', false)
  }
}

const handleResize = () => {
  const el = affixRef.value
  if (!el) {
    return
  }

  const elOffset = getOffset(el)
  if (affix.value) {
    const style: {
      left?: string
      width?: string
      top?: string
      bottom?: string
    } = {
      left: `${elOffset.left}px`,
      width: `${el.offsetWidth}px`,
    }
    if (offsetType.value === 'top') {
      style.top = `${props.offsetTop}px`
    } else {
      style.bottom = `${props.offsetBottom || 0}px`
    }
    styles.value = style
  }
  handleScroll()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>
./type
