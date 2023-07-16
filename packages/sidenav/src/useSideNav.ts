import { ref, computed, onMounted } from 'vue'
import { useToggle } from '@apathia/apathia.hooks'
import type { SideNodeType, SideNavProps } from './types'

export default function useSideNav(props: SideNavProps) {
  const filteredMenu = ref<SideNodeType[]>([])
  const scrollTop = ref(0)
  const filterKeyMap = computed(() =>
    createKeyMap(props.menuList as SideNodeType[]),
  )

  filteredMenu.value = props.menuList as SideNodeType[]

  const [isHover, toggleHover] = useToggle(false)
  const showMini = computed(() => (props.mini ? !isHover.value : false))

  function createKeyMap(menu: SideNodeType[], parentNode?: SideNodeType) {
    let keyMap = {} as Record<string, SideNodeType>

    for (const node of menu) {
      keyMap[node.text || ''] = parentNode || node
      if (node.children) {
        keyMap = {
          ...keyMap,
          ...createKeyMap(node.children, parentNode || node),
        }
      }
    }

    return keyMap
  }

  onMounted(() => {
    setTimeout(() => {
      // TODO 优化虚拟滚动条
      scrollTop.value = scrollToExpand()
    }, 400)
  })

  function onInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement
    filteredMenu.value =
      value === ''
        ? (props.menuList as SideNodeType[])
        : filterMenu(filterKeyMap.value, value)
  }

  function getSidenavInputProps() {
    return {
      onInput,
    }
  }

  function getScrollContainerProps() {
    return scrollTop.value ? { scrollTop: scrollTop.value } : {}
  }

  function getContainerProps() {
    return {
      onMouseenter: toggleHover,
      onMouseleave: toggleHover,
    }
  }

  return {
    getContainerProps,
    getSidenavInputProps,
    getScrollContainerProps,
    filteredMenu,
    showMini,
  }
}

function filterMenu(
  keyMap: Record<string, SideNodeType>,
  keyword: string,
): SideNodeType[] {
  const keyWordList = Object.keys(keyMap)
  return keyWordList.filter(x => x.includes(keyword)).map(y => keyMap[y])
}

function scrollToExpand() {
  const containerHeight = window.innerHeight
  const el = document.querySelector('#expandSideNode')
  if (!el) return 0
  const scrollTop = (el as HTMLElement).offsetTop - containerHeight / 2
  return scrollTop >= 0 ? scrollTop : 0
}
