<template>
  <div
    v-if="!target"
    v-bind="{ ...getTargetProps(), ...$attrs }"
    :class="styles.popper"
  >
    <slot></slot>
  </div>
  <transition
    v-if="render"
    v-bind="transitionClass"
    @after-leave="handleAfterHide"
  >
    <div
      v-if="hasMounted"
      v-show="visibility"
      v-bind="{ ...getContentProps() }"
      :class="`${styles.content} ${popperClass}`"
    >
      <CustomRender :render="render" />
      <div
        v-show="showArrow"
        v-bind="{ ...getArrowProps() }"
        :class="styles.arrowBase"
      ></div>
    </div>
  </transition>
  <teleport v-else to=".apathia-popper" :disabled="!appendToBody">
    <transition v-bind="transitionClass" @after-leave="handleAfterHide">
      <div
        v-if="hasMounted"
        v-show="visibility"
        v-bind="{ ...getContentProps() }"
        :class="`${styles.content} ${popperClass}`"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div
          v-if="showArrow"
          v-bind="{ ...getArrowProps() }"
          :class="styles.arrowBase"
        ></div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { Instance as PopperInstance } from '@popperjs/core'
import { tw } from '@apathia/apathia.twind'
import { CustomRender } from '@apathia/apathia.custom-render'
import { usePopper } from './usePopper'
import type { PopperProps, PopperEmits } from './types'

defineOptions({
  name: 'Popper',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopperProps>(), {
  distance: 15,
  skidding: 0,
  trigger: 'click',
  dark: false,
  placement: 'top',
  transitionClass: () => ({
    'enter-active-class': tw`transition-opacity duration-200`,
    'leave-active-class': tw`transition-opacity duration-200`,
    'enter-from-class': tw`opacity-0`,
    'leave-to-class': tw`opacity-0`,
  }),
  showArrow: true,
  delay: 300,
  disabled: false,
  modelValue: undefined,
  popperClass: '',
  appendToBody: true,
  render: undefined,
  target: undefined,
  delayClose: undefined,
})

const emit = defineEmits<PopperEmits>()

const {
  visibility,
  getArrowStyle,
  hasMounted,
  getContentProps,
  getArrowProps,
  getTargetProps,
  show,
  close,
  update,
} = usePopper(props, {
  emitVisible: (val: boolean) => {
    emit('update:modelValue', val)
  },
  emitHide: (val: boolean, instance: PopperInstance | null) => {
    emit('hide', val, instance)
  },
  emitShow: (val: boolean, instance: PopperInstance | null) => {
    emit('show', val, instance)
  },
})

defineExpose({ update })

if (
  props.trigger === 'manual' ||
  props.trigger === 'hover' ||
  props.trigger === 'click'
) {
  watch(
    () => props.modelValue,
    val => {
      if (val !== undefined && !props.disabled) {
        if (val) {
          show()
        } else {
          close()
        }
      }
    },
  )
}

const handleAfterHide = () => {
  emit('afterHide')
}

const getArrowStyles = (dark: boolean) => {
  if (dark) {
    return getArrowStyle('content-white', 'content-primary', 'content-primary')
  }
  return getArrowStyle('content-accent', 'fill-white', 'fill-light')
}
const styles = computed(() => ({
  popper: tw`inline-block`,
  ...getArrowStyles(props.dark),
}))
</script>
