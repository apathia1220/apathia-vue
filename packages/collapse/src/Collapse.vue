<template>
  <slot name="toggleHeader" :show="show" :toggle-show="toggleShow">
    <div
      :class="[styles.headerClass, disabled ? styles.headerDisableClass : '']"
      @click="handleClick"
    >
      <span
        v-if="showArrow"
        :style="{ transform: `rotate(${show ? 90 : 0}deg)` }"
      >
        <Icon :class="styles.icon">
          <ArrowRight />
        </Icon>
      </span>
      <slot name="header">
        <div>{{ header }}</div>
      </slot>
    </div>
  </slot>
  <CollapseTransition :duration="duration">
    <div v-show="show">
      <slot></slot>
    </div>
  </CollapseTransition>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { Icon } from '@apathia/apathia.icon'
import { useToggle } from '@apathia/apathia.hooks'
import { style } from '@apathia/apathia.twind'
import CollapseTransition from './CollapseTransition'
import { ArrowRight } from '@apathia/apathia.icon-svg'
import type { CollapseProps } from './types'

defineOptions({
  name: 'Collapse',
})

const props = withDefaults(defineProps<CollapseProps>(), {
  expand: true,
  duration: 400,
  header: 'header',
  showArrow: true,
  disabled: false,
})

const [show, toggleShow, setShow] = useToggle(props.expand)
const styles = initStyle()

watch(
  () => props.expand,
  (val: boolean) => setShow(val),
)

const handleClick = () => {
  if (!props.disabled) {
    toggleShow()
  }
}

function initStyle() {
  const headerClass = style`flex items-center h-10 leading-10 bg-fill-light rounded cursor-pointer`
  const rollClass = style`rotate-90 translate-y-0.5 duration-300`
  const headerDisableClass = style`cursor-not-allowed`
  const icon = style`mx-2 transition`

  return {
    headerClass,
    rollClass,
    headerDisableClass,
    icon,
  }
}
</script>
