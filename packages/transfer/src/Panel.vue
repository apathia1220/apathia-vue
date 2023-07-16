<template>
  <div :class="styles.panel">
    <div :class="styles.titleBar">
      <Checkbox
        v-model="checkAll"
        :indeterminate="indeterminate"
        @update:model-value="onCheckAllChange"
      />
      <span :class="styles.title">{{ title }}</span>
      <!-- /> -->
      <span :class="styles.counter"
        >{{ checkedLength }} / {{ data.length }}</span
      >
    </div>
    <div v-if="filterable" :class="styles.filter">
      <Input
        :model-value="searchWords"
        :placeholder="filterPlaceholder"
        suffix="v-icon-search"
        @update:model-value="onSearchInput"
      />
    </div>
    <div :class="styles.list">
      <ScrollContainer :size="5" hide-horizontal>
        <!-- TODO: transition? -->
        <div>
          <div
            v-for="(item, index) in filterList"
            :key="index"
            :class="styles.item"
          >
            <Checkbox
              :model-value="!!checked[item.value]"
              :class="{
                [styles.checkbox]: true,
                [styles.disabledCheckbox]: item.disabled,
              }"
              :disabled="item.disabled"
              @update:model-value="onItemCheckChange($event, item.value)"
            >
              <slot name="item" :option="item" :index="index">
                <span>{{ item.label }}</span>
              </slot>
            </Checkbox>
          </div>
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import { ScrollContainer } from '@apathia/apathia.scroll-container'
import { Input } from '@apathia/apathia.input'
import { Checkbox } from '@apathia/apathia.checkbox'
import type {
  Key,
  TransferDataItem,
  CheckedMap,
  PanelProps,
  PanelEmits,
} from './types'
import { apply, tw } from '@apathia/apathia.twind'

defineOptions({
  name: 'Panel',
})

const getPanelStyles = () => ({
  panel: tw`${apply`border-line-accent border rounded`}`,
  titleBar: tw`${apply`flex justify-between items-center bg-fill-light py-4 px-2 text-xs`}`,
  title: tw`${apply`font-medium`}`,
  counter: tw`${apply`w-14 text-right`}`,
  filter: tw`${apply`m-2`}`,
  list: tw`${apply`h-80`}`, // 2.5 * 8
  item: tw`${apply`text-base p-2 hover:(bg-fill-light) transition-all duration-300 ease-in text-left`}`,
  checkbox: tw`${apply`mr-2`}`,
  disabledCheckbox: tw`${apply`cursor-not-allowed`}`,
})

const props = withDefaults(defineProps<PanelProps>(), {
  filterPlaceholder: '请输入搜索内容',
  defaultChecked: () => [],
  filterMethod: (searchWords: string, option: TransferDataItem) =>
    option.label.includes(searchWords),
})

const emit = defineEmits<PanelEmits>()

const checkAll = ref(false)
const indeterminate = ref(false)
const searchWords = ref('')

const checked = ref<CheckedMap>({} as CheckedMap)

const filterList = computed(() => {
  if (!props.filterable) return props.data
  return props.data.filter(cur =>
    searchWords.value ? props.filterMethod(searchWords.value, cur) : true,
  )
})
const checkedLength = computed(
  () => Object.entries(checked.value).filter(([, value]) => value).length,
)
const checkableLength = computed(
  () => filterList.value.filter(cur => !cur.disabled).length,
)

const setChecked = (c: Key[]) => {
  checked.value = props.data.reduce<CheckedMap>((acc, cur) => {
    if (c.includes(cur.value)) {
      acc[cur.value] = true
    }
    return acc
  }, {})
  emit(
    'update:modelValue',
    Object.entries(checked.value)
      .filter(([, value]) => value)
      .map(([key]) => key),
  )
}
const onCheckAllChange = (value: boolean) => {
  emit(
    'update:modelValue',
    value
      ? filterList.value.filter(cur => !cur.disabled).map(cur => cur.value)
      : [],
  )
}
// eslint-disable-next-line prefer-arrow-callback
const onSearchInput = debounce(function handleInput(value: string) {
  searchWords.value = value

  // filtered
  const validKeys = filterList.value.map(cur => cur.value)

  emit(
    'update:modelValue',
    Object.entries(checked.value)
      .filter(([key, val]) => val && validKeys.includes(key))
      .map(([key]) => key),
  )
}, 500)
const onItemCheckChange = (isChecked: boolean, itemValue: Key) => {
  const newChecked = {
    ...checked.value,
    [itemValue]: isChecked,
  }

  emit(
    'update:modelValue',
    Object.entries(newChecked)
      .filter(([, value]) => value)
      .map(([key]) => key),
  )
}

watch(
  () => props.modelValue,
  value => {
    checked.value = filterList.value.reduce<CheckedMap>((acc, cur) => {
      acc[cur.value] = value.includes(cur.value)
      return acc
    }, {})

    if (checkedLength.value !== 0) {
      checkAll.value = checkedLength.value === checkableLength.value
      indeterminate.value = !checkAll.value
    } else {
      checkAll.value = false
      indeterminate.value = false
    }
  },
  { immediate: true },
)

watch(
  () => props.defaultChecked,
  value => {
    if (value.length) {
      setChecked(value)
    }
  },
  { immediate: true },
)

const styles = getPanelStyles()
</script>
