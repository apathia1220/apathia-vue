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

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { tw, css, keyframes, style } from '@apathia/apathia.twind'
import { CustomRender } from '@apathia/apathia.custom-render'
import type { RenderCustom } from '@apathia/apathia.custom-render'
import { showScrollbar } from './helper'
import { createModal } from './createModal'

export default defineComponent({
  name: 'Modal',

  components: {
    CustomRender,
  },

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
    render: {
      type: [String, Function] as PropType<RenderCustom>,
      default: () => null,
    },
    renderHeader: {
      type: [String, Function] as PropType<RenderCustom>,
      default: () => null,
    },
    top: {
      type: [Number, String],
      default: 60,
    },
    width: {
      type: [Number, String],
      default: 640,
    },
    showClose: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    keyboard: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    beforeClose: {
      type: Function as PropType<() => boolean>,
      default: () => true,
    },
  },

  emits: ['close', 'update:modelValue'],

  setup(props, ctx) {
    const { shadeRef, modalRef, widthStyle, close, isTemplate } = createModal(
      props,
      ctx,
    )

    return {
      ...initStyle(),
      shadeRef,
      modalRef,
      widthStyle,
      close,
      showScrollbar,
      isTemplate,
    }
  },
})

export function initStyle() {
  const slidein = keyframes`
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `
  const slideinCss = css({
    animation: '0.5s ease',
    animationName: slidein,
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
  const modalClass = style`mx-auto rounded bg-fill-white mb-8 -translate-y-5 ${slideinCss}`
  const modalHeaderClass = style`flex justify-between p-4 rounded-t text-content-primary border(b solid fill-neutral)`
  const modalContentClass = style`p-4`
  const delIconClass = style`font-medium self-start ml-3 cursor-pointer hover:(text-error-primary)`
  const titleClass = tw`text-lg`
  const subTitleClass = tw`text-content-accent text-sm mt-0.5`
  const transitionClass = {
    'leave-to-class': tw`opacity-0`,
  }
  const durationClass = tw`duration-500`

  return {
    shadeClass,
    modalClass,
    modalHeaderClass,
    delIconClass,
    modalContentClass,
    titleClass,
    subTitleClass,
    transitionClass,
    durationClass,
  }
}
</script>
