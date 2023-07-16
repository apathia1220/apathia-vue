<template>
  <div :class="styles.transfer">
    <Panel
      v-model="selectedSource"
      :class="styles.panel"
      :data="source"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :filter-method="filterMethod"
      :title="titles[0]"
      :default-checked="leftDefaultChecked"
    >
      <template #item="{ option, index }">
        <slot name="source-item" :option="option" :index="index"> </slot>
      </template>
    </Panel>
    <div :class="styles.buttonWrapper">
      <div>
        <BaseButton
          small
          :class="styles.button"
          :disabled="source.length === 0"
          @click="addAll"
        >
          <Icon>
            <DArrowLeft />
          </Icon>
        </BaseButton>
      </div>
      <div>
        <BaseButton
          small
          :class="styles.button"
          :disabled="selectedSource.length === 0"
          @click="addSelected"
        >
          <Icon>
            <ArrowRight />
          </Icon>
        </BaseButton>
      </div>
      <div>
        <BaseButton
          small
          :class="styles.button"
          :disabled="selectedTarget.length === 0"
          @click="removeSelected"
        >
          <Icon>
            <ArrowLeft />
          </Icon>
        </BaseButton>
      </div>
      <div>
        <BaseButton
          small
          :class="styles.button"
          :disabled="target.length === 0"
          @click="removeAll"
        >
          <Icon>
            <DArrowLeft />
          </Icon>
        </BaseButton>
      </div>
    </div>
    <Panel
      v-model="selectedTarget"
      :class="styles.panel"
      :data="target"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :filter-method="filterMethod"
      :title="titles[1]"
      :default-checked="rightDefaultChecked"
    >
      <template #item="{ option, index }">
        <slot name="source-item" :option="option" :index="index"> </slot>
      </template>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@apathia/apathia.icon'
import { BaseButton } from '@apathia/apathia.button'
import useTransfer from './useTransfer'
import Panel from './Panel.vue'
import { apply, tw } from '@apathia/apathia.twind'
import {
  ArrowLeft,
  ArrowRight,
  DArrowLeft,
  DArrowRight,
} from '@apathia/apathia.icon-svg'
import type {
  TransferDataItem as DataItem,
  TransferEmits,
  TransferProps,
} from './types'

defineOptions({
  name: 'Transfer',
})

const getTransferStyles = () => ({
  transfer: tw`${apply`flex`}`,
  panel: tw`${apply`w-48`}`,
  buttonWrapper: tw`${apply`self-center text-center mx-4`}`,
  button: tw`${apply`w-12 my-0.5`}`,
})

const props = withDefaults(defineProps<TransferProps>(), {
  filterPlaceholder: '请输入搜索内容',
  filterMethod: (word: string, option: DataItem) =>
    option.label.indexOf(word) > -1,
  targetOrder: 'original',
  titles: () => ['列表1', '列表2'],
  propKeys: () => ({
    value: 'value',
    label: 'label',
    disabled: 'disabled',
  }),
  leftDefaultChecked: () => [],
  rightDefaultChecked: () => [],
})

const emit = defineEmits<TransferEmits>()

const userProps = computed(() => ({
  modelValue: props.modelValue,
  data: props.data,
  filterable: props.filterable,
  filterPlaceholder: props.filterPlaceholder,
  filterMethod: props.filterMethod,
  targetOrder: props.targetOrder,
  titles: props.titles,
  propKeys: props.propKeys,
  leftDefaultChecked: props.leftDefaultChecked,
  rightDefaultChecked: props.rightDefaultChecked,
}))

const {
  selectedSource,
  selectedTarget,

  source,
  target,

  addAll,
  removeAll,
  addSelected,
  removeSelected,
} = useTransfer(userProps, emit)

const styles = getTransferStyles()
</script>
