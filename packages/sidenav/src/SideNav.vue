<template>
  <ScrollContainer :size="7" v-bind="getScrollContainerProps()" auto-hide>
    <ul
      :class="showMini ? styles.sidenavMiniClass : styles.sidenavClass"
      v-bind="{ ...getContainerProps() }"
    >
      <slot name="menuTop"></slot>
      <div v-show="search && !showMini" :class="styles.sidenavInputWrap">
        <input
          v-bind="{ ...getSidenavInputProps() }"
          placeholder="search"
          :class="styles.sidenavInput"
        />
      </div>

      <SideNode
        v-for="node in filteredMenu"
        :key="node[activeKey]"
        :node="node"
        :active-key="activeKey"
        :key-field="keyField"
        :mini="showMini"
        :select-handler="selectNode"
      >
        <template
          #default="{
            mini: miniValue,
            activeParent: activeParentValue,
            expand: expandValue,
            activeItem: activeItemValue,
            onClick: clickHandler,
            node: nodeValue,
          }"
        >
          <slot
            :mini="miniValue"
            :activeParent="activeParentValue"
            :expand="expandValue"
            :activeItem="activeItemValue"
            :onClick="clickHandler"
            :node="nodeValue"
          ></slot>
        </template>
      </SideNode>

      <slot name="menuBottom"></slot>
    </ul>
  </ScrollContainer>
</template>

<script setup lang="ts">
import { style } from '@apathia/apathia.twind'
import { ScrollContainer } from '@apathia/apathia.scroll-container'
import SideNode from './SideNode.vue'
import type { SideNodeType, SideNavProps, SideNodeEmits } from './types'
import useSideNav from './useSideNav'

defineOptions({
  name: 'SideNav',
})

function initStyle() {
  const baseSidenav = 'block duration-100 text-content-secondary py-4 relative'
  return {
    sidenavClass: style`${baseSidenav} min-h-full`,
    sidenavMiniClass: style`${baseSidenav} w-12 min-h-full`,
    sidenavInputWrap: style`px-4`,
    sidenavInput: style`bg-fill-accent px-2 my-2 bg-opacity-30 h-9 outline-none text-content-accent rounded placeholder-content-neutral w-full focus:(bg-fill-gray text-content-primary)`,
  }
}

const props = withDefaults(defineProps<SideNavProps>(), {
  menuList: () => [],
  activeKey: '',
  mini: false,
  search: false,
  keyField: 'key',
})

const emit = defineEmits<SideNodeEmits>()

const {
  getContainerProps,
  getSidenavInputProps,
  filteredMenu,
  showMini,
  getScrollContainerProps,
} = useSideNav(props)
const styles = initStyle()

const selectNode = (node: SideNodeType) => emit('select', node)
</script>
