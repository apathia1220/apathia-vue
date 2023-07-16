<template>
  <div>
    <CustomRender :render="render" />
    <CustomRender
      v-if="renderFooter"
      :render="renderFooter"
      :confirm="confirm"
      :cancel="cancel"
    />
    <div v-else :class="btnLayout">
      <BaseButton secondary @click="cancel">{{ cancelText }}</BaseButton>
      <BaseButton primary @click="confirm">{{ confirmText }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@apathia/apathia.button'
import { CustomRender } from '@apathia/apathia.custom-render'
import { tw, apply } from '@apathia/apathia.twind'
import type { ConfirmProps } from './types'

defineOptions({
  name: 'Confirm',
})

const props = withDefaults(defineProps<ConfirmProps>(), {
  confirmText: '确认',
  cancelText: '取消',
  btnPosition: 'right',
})

const btnLayout = initStyle(props.btnPosition)

function initStyle(pos: 'left' | 'center' | 'right') {
  const baseLayout = apply`mt-4 flex`

  const position = {
    left: apply`justify-start`,
    center: apply`justify-center`,
    right: apply`justify-end`,
  }

  return tw`${baseLayout} ${position[pos] || position.left}`
}
</script>
