<template>
  <template v-if="isTemplate">
    <Teleport to=".apathia-modal">
      <Transition v-bind="transitionClass" @after-leave="showScrollbar">
        <div v-if="modelValue" :class="durationClass">
          <div ref="shadeRef" :class="shadeClass">
            <div ref="modalRef" :style="widthStyle" :class="modalClass">
              <div :class="modalHeaderClass">
                <slot name="header" :close="close">
                  <div>
                    <p :class="titleClass">{{ title }}</p>
                    <p v-if="subTitle" :class="subTitleClass">{{ subTitle }}</p>
                  </div>
                  <span v-if="showClose" :class="delIconClass" @click="close"
                    >✕</span
                  >
                </slot>
              </div>
              <div :class="modalContentClass">
                <slot :close="close"></slot>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  <template v-else>
    <div v-show="modelValue" ref="shadeRef" :class="shadeClass">
      <div ref="modalRef" :style="widthStyle" :class="modalClass">
        <CustomRender v-if="renderHeader" :render="renderHeader" />
        <div v-else :class="modalHeaderClass">
          <div>
            <p :class="titleClass">{{ title }}</p>
            <p v-if="subTitle" :class="subTitleClass">{{ subTitle }}</p>
          </div>
          <span v-if="showClose" :class="delIconClass" @click="close">✕</span>
        </div>
        <div :class="modalContentClass">
          <CustomRender :render="render" />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { tw, css, keyframes, style } from '@apathia/apathia.twind'
import { CustomRender } from '@apathia/apathia.custom-render'
import { showScrollbar } from './helper'
import { createModal } from './createModal'
import type { ModalProps, ModalEmits } from './types'

defineOptions({
  name: 'Modal',
})

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  title: '',
  subTitle: '',
  render: () => null,
  renderHeader: () => null,
  top: 60,
  width: 640,
  showClose: true,
  maskClosable: false,
  keyboard: true,
  beforeClose: () => true,
})

const emits = defineEmits<ModalEmits>()

const slots = defineSlots()

const { shadeRef, modalRef, widthStyle, close, isTemplate } = createModal(
  props,
  emits,
  slots,
)

const slideIn = keyframes`
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `
const slideInCss = css({
  animation: '0.5s ease',
  animationName: slideIn,
  animationFillMode: 'forwards',
})

const flash = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `
const flashCss = css({
  animation: '0.5s ease',
  animationName: flash,
})

const shadeClass = style`fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`
const modalClass = style`mx-auto rounded bg-fill-white mb-8 -translate-y-5 ${slideInCss}`
const modalHeaderClass = style`flex justify-between p-4 rounded-t text-content-primary border(b solid fill-neutral)`
const modalContentClass = style`p-4`
const delIconClass = style`font-medium self-start ml-3 cursor-pointer hover:(text-error-primary)`
const titleClass = tw`text-lg`
const subTitleClass = tw`text-content-accent text-sm mt-0.5`
const transitionClass = {
  'leave-to-class': tw`opacity-0`,
}
const durationClass = tw`duration-500`
</script>
