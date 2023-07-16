import { TransitionGroup, defineComponent, ref, PropType, h } from 'vue'
import { style, tw } from '@apathia/apathia.twind'
import { mountComponent } from '@apathia/apathia.shared'
import BaseAlert from './Alert.vue'
import type { AlertProps, AlertListProps, Alerter } from './types'

const AlertContainer = defineComponent({
  name: 'AlertContainer',

  props: {
    alertList: {
      type: Array as PropType<Array<AlertListProps>>,
      default: () => [],
    },
  },

  emits: ['remove'],

  setup(props, { emit }) {
    const remove = (index: string) => emit('remove', index)

    const rootClass =
      style`left-1/2 -translate-x-1/2 w-96 fixed z-alert top-1` + ' alert-open'
    const transitionGroupClass = {
      'enter-from-class': tw`opacity-0`,
      'leave-to-class': tw`opacity-0`,
      'leave-active-class': tw`absolute w-full`,
    }

    return () =>
      h(
        'div',
        {
          class: rootClass,
        },
        [
          h(
            TransitionGroup,
            { ...transitionGroupClass, tag: 'div' },
            {
              default: () =>
                props.alertList.map(option =>
                  h(BaseAlert, {
                    ...option.props,
                    key: option.id,
                    onClose: () => {
                      remove(option.id)
                    },
                  }),
                ),
            },
          ),
        ],
      )
  },
})

const alertList = ref<Array<AlertListProps>>([])

const remove = (id: string) => {
  const index = alertList.value.findIndex(item => item.id === id)
  alertList.value.splice(index, 1)
}
const getID = () => `${Date.now()}`

const Alert = ((props: AlertProps) => {
  const id: string = getID()
  alertList.value.push({ props, id })

  if (!document.querySelector('.apathia-alert')) {
    // 在第一次调用的时候挂载一次
    const alertContainerDom = document.createElement('div')
    alertContainerDom.className = 'apathia-alert'
    document.body.appendChild(alertContainerDom)
    mountComponent(
      h(AlertContainer, { alertList: alertList.value, onRemove: remove }),
      alertContainerDom,
    )
  }
}) as Alerter

Alert.closeAll = () => (alertList.value = [])

Alert.info = (title, message, props) =>
  Alert({ type: 'info', title, message, ...props })
Alert.warning = (title, message, props) =>
  Alert({ type: 'warning', title, message, ...props })
Alert.danger = (title, message, props) =>
  Alert({ type: 'danger', title, message, ...props })
Alert.success = (title, message, props) =>
  Alert({ type: 'success', title, message, ...props })
Alert.default = (title, message, props) =>
  Alert({ type: 'default', title, message, ...props })

export default Alert
