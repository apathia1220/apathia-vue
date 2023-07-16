import {
  getCurrentInstance,
  h,
  defineComponent,
  PropType,
  ref,
  nextTick,
  Fragment,
  Ref,
} from 'vue'
import { mountComponent, mountContainerDom } from '@apathia/apathia.shared'
import Popper from './Popper.vue'
import type { PopperProps as PopperPropType, PopperListProps } from './types'

const PopperDefaultProp = {
  modelValue: false,
  delayClose: 1000,
  trigger: 'manual',
}

const PopperContainer = defineComponent({
  name: 'PopperContainer',

  props: {
    popperList: {
      type: Array as PropType<Array<PopperListProps>>,
      default: () => [],
    },
  },

  emits: ['updateContainer', 'remove'],

  setup(props, { emit }) {
    const remove = (id: string) => emit('remove', id)
    const updateModelValue = (id: string, val: boolean) =>
      emit('updateContainer', val, id)

    return () =>
      h(
        Fragment,
        {},
        props.popperList.map(option =>
          h(Popper, {
            ...option.props,
            'onUpdate:modelValue': (e: boolean) =>
              updateModelValue(option.id, e),
            key: option.id,
            onAfterHide: () => remove(option.id),
          }),
        ),
      )
  },
})

const popperList = ref<PopperListProps[]>([]) as Ref<PopperListProps[]>

const getID = () => `${Math.random()}`
const removePopper = (id: string) => {
  const index = popperList.value.findIndex(item => item.id === id)
  popperList.value.splice(index, 1)
}
const addPopper = (props: PopperPropType) => {
  const id = getID()
  const popperInstance = { props: { ...PopperDefaultProp, ...props }, id }
  popperList.value.push(popperInstance)

  const { length } = popperList.value
  nextTick(() => {
    popperList.value[length - 1].props.modelValue = true
  })
}

const handleUpdateModelValue = (val: boolean, id: string) => {
  const index = popperList.value.findIndex(item => item.id === id)
  popperList.value[index].props.modelValue = val
}

export function usePoppertip() {
  const appContext = getCurrentInstance()?.appContext
  mountContainerDom('popper')
  mountComponent(
    h(PopperContainer, {
      popperList: popperList.value,
      onUpdateContainer: handleUpdateModelValue,
      onRemove: removePopper,
    }),
    '.apathia-popper',
    appContext,
  )

  return {
    popper: addPopper,
  }
}

export default Popper
