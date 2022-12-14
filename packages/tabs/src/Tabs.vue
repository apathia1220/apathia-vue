<template>
  <div :class="style.outContainerClass">
    <ul ref="contentRef" :class="style.containerClass">
      <li
        v-for="(tab, index) in list"
        :key="index"
        :class="[
          style.tabClass,
          modelValue === tab ? style.tabActiveClass : '',
        ]"
        @click="changeNav(tab)"
      >
        {{ showLabel(tab) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { useScrollX } from '@apathia/apathia.hooks'
import { tw, apply } from '@apathia/apathia.twind'

const styleFn = (str: string) => tw`${apply`${str}`}`

function initStyle(undeline: boolean) {
  const Theme = {
    default: {
      tab: 'rounded hover:(text-brand-active) list-none',
      tabActive: 'bg-brand-light text-brand-active',
    },
    underline: {
      tab: 'border-b-2 border-transparent hover:(text-brand-active) list-none',
      tabActive: 'border-brand-active text-brand-active',
    },
  }

  const theme = undeline ? Theme.underline : Theme.default

  return {
    outContainerClass: styleFn('p-1 overflow-hidden text-lg'),
    containerClass: styleFn('flex'),
    tabClass: styleFn(
      `font-medium m-1 p-2 cursor-pointer duration-300 ${theme.tab}`,
    ),
    tabActiveClass: styleFn(`${theme.tabActive}`),
  }
}

type TabItem = string | number | { [k: string]: any }

interface TabsProps {
  modelValue: string | number
  list: Array<TabItem>
  underline?: boolean
  showLabel?: Function
}

const props = withDefaults(defineProps<TabsProps>(), {
  underline: false,
  showLabel: (tab: TabItem) => tab
})

const emit = defineEmits(['update:modelValue', 'navChange'])

const style = initStyle(props.underline)
const { contentRef } = useScrollX()

function changeNav(tab: TabItem) {
  emit('update:modelValue', tab)
  emit('navChange', tab)
}
</script>

