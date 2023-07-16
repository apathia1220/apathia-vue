<template>
  <span :class="styles.arrowWrap">
    <span
      :class="{
        [styles.arrow]: true,
        [styles.active]: active,
      }"
      @click="sortChange"
    >
      <Icon :size="14">
        <SortUp v-if="sort.order === 'asc'" />
        <SortDown v-else />
      </Icon>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { style } from '@apathia/apathia.twind'
import { Icon } from '@apathia/apathia.icon'
import { SortUp, SortDown } from '@apathia/apathia.icon-svg'
import type { SortEmits, SortProps } from './types'

defineOptions({
  name: 'TableSorter',
})

const props = defineProps<SortProps>()

const emit = defineEmits<SortEmits>()

const active = computed(() => props.prop === props.sort.prop)

function sortChange() {
  const newOrder = active.value && props.sort.order === 'desc' ? 'asc' : 'desc'
  emit('sort-change', { prop: props.prop, order: newOrder })
}

const getStyles = () => ({
  arrowWrap: style`inline-block pl-px align-middle`,
  arrow: style`text-content-neutral cursor-pointer`,
  arrowIcon: style`h-3.5 w-3.5 align-middle`,
  active: style`text-content-accent`,
})
const styles = getStyles()
</script>
