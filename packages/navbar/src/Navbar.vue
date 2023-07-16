<template>
  <div :class="styles.wrapper">
    <ul ref="contentRef" :class="styles.layoutContainer">
      <li
        v-for="nav in list"
        :key="nav.value"
        :class="`${styles.layoutNav} ${
          isActive(nav) || isActiveParent(nav) ? styles.activeNav : ''
        }`"
        @click="parentBindClick(nav)"
      >
        <template v-if="!nav.children">
          <span
            v-if="nav.iconClass"
            :class="`${nav.iconClass} ${styles.icon}`"
          ></span>
          <slot name="label" :nav="nav">
            <span>{{ nav.label }}</span>
          </slot>
        </template>

        <template v-else>
          <Popper
            placement="bottom"
            trigger="hover"
            :popper-class="styles.childNavClass.popper"
            :show-arrow="false"
          >
            <span v-if="nav.iconClass" :class="nav.iconClass"></span>
            <slot name="label" :nav="nav">
              <span>{{ nav.label }}</span>
            </slot>
            <template #content>
              <li
                v-for="childNav in nav.children"
                :key="childNav.value"
                :class="`${styles.childNavClass.nav} ${
                  isActive(childNav) ? styles.childNavClass.activeNav : ''
                }`"
                @click="handle(childNav)"
              >
                <span
                  v-if="childNav.iconClass"
                  :class="`${childNav.iconClass} ${styles.icon}`"
                ></span>
                <slot name="label" :nav="childNav">
                  <span>{{ childNav.label }}</span>
                </slot>
              </li>
            </template>
          </Popper>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { noop } from '@apathia/apathia.shared'
import { useScrollX } from '@apathia/apathia.hooks'
import { Popper } from '@apathia/apathia.popper'
import { apply, style, css } from '@apathia/apathia.twind'
import type { NavNode, NavbarProps, ThemeType, NavbarEmits } from './types'

function initStyle(type: ThemeType) {
  const radius = css`
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  `
  const Theme = {
    default: {
      nav: apply`bg-fill-light hover:(bg-fill-gray) ${apply`${radius}`}`,
      activeNav: apply`bg-brand-primary text-content-white hover:(bg-brand-hover) ${apply`${radius}`}`,
    },
    underline: {
      nav: apply`border-transparent border-b-2 mx-1 hover:(text-brand-hover)`,
      activeNav: apply`text-brand-primary border-brand-primary border-b-2 hover:(text-brand-hover border-brand-hover)`,
    },
  }
  const theme = Theme[type] || Theme.default

  const primaryLayout = apply`block text-center text-sm cursor-pointer px-4 py-1.5 transition duration-300`

  const wrapper = style`overflow-hidden`
  const layoutContainer = style`flex items-center py-2 text-content-primary`
  const layoutNav = style`${theme.nav} ${primaryLayout}`
  const activeNav = style`${theme.activeNav}`
  const icon = style`mr-1`

  const childNavClass = {
    popper: style`p-0 rounded`,
    nav: `${style`px-4 py-1.5`} ${layoutNav}`,
    activeNav,
  }

  return {
    wrapper,
    layoutContainer,
    layoutNav,
    activeNav,
    icon,
    childNavClass,
  }
}

const props = withDefaults(defineProps<NavbarProps>(), {
  type: 'default',
  modelValue: '',
  trigger: 'hover',
  disabledParent: true,
})

const emit = defineEmits<NavbarEmits>()

function isParent(nodes: NavNode[], text: string | number) {
  return text && platMenu(nodes).some(n => n.value === text)
}

// type fix ?
function platMenu(nodes: NavNode[]): NavNode[] {
  return nodes.reduce<NavNode[]>((acc, cur) => {
    if (cur.children && Array.isArray(cur.children) && cur.children.length) {
      return acc.concat(platMenu(cur.children))
    }
    return acc.concat(cur)
  }, [])
}

const { modelValue } = toRefs(props)
const { contentRef } = useScrollX()
const styles = initStyle(props.type)

function isActive(nav: NavNode) {
  return nav.value === modelValue.value
}

function isActiveParent(nav: NavNode) {
  return nav.children && isParent(nav.children, modelValue.value)
}

function handle(nav: NavNode) {
  emit('update:modelValue', nav.value)
  emit('change', nav)
}

function parentBindClick(nav: NavNode) {
  if (!nav.children || (nav.children && !props.disabledParent)) {
    handle(nav)
  } else {
    noop()
  }
}
</script>
