import { ref, computed } from 'vue'
import type { ComputedRef, SetupContext } from 'vue'
import type { TransferDataItem, Key } from './types'
import type { TransferProps, TransferEmits } from './types'

export default (
  userProps: Readonly<ComputedRef<TransferProps>>,
  emit: SetupContext<TransferEmits>['emit'],
) => {
  const selectedSource = ref<Key[]>([])
  const selectedTarget = ref<Key[]>([])

  const processedData = computed(() =>
    userProps.value.data.map(cur => ({
      value: cur[userProps.value.propKeys.value] as Key,
      label: cur[userProps.value.propKeys.label] as string,
      disabled: cur[userProps.value.propKeys.disabled] as boolean,
    })),
  )
  const valueMap = computed(() =>
    processedData.value.reduce<Record<string, TransferDataItem>>((acc, cur) => {
      acc[`${cur.value}`] = cur
      return acc
    }, {}),
  )

  const source = computed(() =>
    processedData.value.filter(
      cur => !userProps.value.modelValue.includes(cur.value),
    ),
  )
  const target = computed(() => {
    const res = userProps.value.modelValue.map(v => valueMap.value[v])
    const valid = res.filter(cur => typeof cur !== 'undefined')

    if (res.length !== valid.length) {
      console.warn('[Transfer] invalid value')
    }
    return valid
  })

  const resolve = (oldValue: Key[], addValue: Key[]) => {
    if (userProps.value.targetOrder === 'unshift')
      return addValue.concat(oldValue)
    if (userProps.value.targetOrder === 'push') return oldValue.concat(addValue)

    const all = oldValue.concat(addValue)
    return processedData.value
      .filter(({ value }) => all.includes(value))
      .map(({ value }) => value)
  }
  const addAll = () => {
    const added = source.value
      .filter(cur => !cur.disabled)
      .map(cur => cur.value)
    emit('update:modelValue', resolve(userProps.value.modelValue, added))
    emit('select', added)
    selectedSource.value = []
  }
  const removeAll = () => {
    emit('update:modelValue', [])
    emit('remove', userProps.value.modelValue)
    selectedSource.value = []
  }
  const addSelected = () => {
    emit(
      'update:modelValue',
      resolve(userProps.value.modelValue, selectedSource.value),
    )
    emit('select', selectedSource.value)
    selectedSource.value = []
  }
  const removeSelected = () => {
    emit(
      'update:modelValue',
      userProps.value.modelValue.filter(
        cur => !selectedTarget.value.includes(cur),
      ),
    )
    emit('remove', selectedTarget.value)
    selectedTarget.value = []
  }

  return {
    selectedSource,
    selectedTarget,
    processedData,
    valueMap,
    source,
    target,
    resolve,
    addAll,
    removeAll,
    addSelected,
    removeSelected,
  }
}
