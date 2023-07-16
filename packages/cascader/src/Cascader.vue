<template>
  <div ref="cascaderRef">
    <Nodes
      :focus="expand"
      :nodes="nodes"
      :show-all-levels="showAllLevels"
      :separator="separator"
      :placeholder="placeholder"
      :clearable="clearable"
      :search="search"
      @search-change="handleSearchChange"
      @update:focus="handleFocus"
      @remove="removeNode"
      @clear="clearAll"
    />

    <div :class="styles.dropdown">
      <div
        v-show="expand"
        v-auto-pos
        :class="styles.panelContainer"
        data-align="left"
      >
        <div
          v-for="(list, index) in lists"
          :key="index"
          :class="styles.scrollWrap"
          :style="{ height: customHeight }"
        >
          <div :class="styles.panel">
            <div
              v-for="node in list"
              :key="node.value"
              @click="onItemClick(node, index)"
              @mouseenter="onItemMouseOver(node, index)"
            >
              <slot
                :node="node"
                :active="activePathMap[node.fullKey]"
                :selected="selectedKeyMap[node.fullKey]"
                :leaf="node.leaf"
              >
                <div
                  :class="{
                    [styles.node]: true,
                    [styles.nodeDisabled]: node.disabled,
                    [styles.nodeActive]: activePathMap[node.fullKey],
                  }"
                >
                  <Checkbox
                    v-if="multiple && (changeOnSelect || node.leaf)"
                    :model-value="selectedKeyMap[node.fullKey]"
                    :class="styles.checkbox"
                    @update:model-value="checkChange($event, node)"
                    @click.stop
                  />
                  {{ node.label }}
                  <Icon v-if="!node.leaf" :class="styles.icon">
                    <ArrowRight />
                  </Icon>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { onClickOutside } from '@apathia/apathia.hooks'
import { Checkbox } from '@apathia/apathia.checkbox'
import { Icon } from '@apathia/apathia.icon'
import { autoPos as vAutoPos } from '@apathia/apathia.shared'
import { style, css } from '@apathia/apathia.twind'
import Nodes from './Nodes.vue'
import type { CascaderProps, CascaderNode, ValueType } from './types'
import { ArrowRight } from '@apathia/apathia.icon-svg'

defineOptions({
  name: 'Cascader',
  inheritAttrs: false,
})

const generateKey = (val: string | number) => `_${val}_`

const looseEqual = (a: unknown, b: unknown) => a == b

const looseEqualArray = (a: unknown[], b: unknown[]) =>
  a.length === b.length && a.every((v: any, i: any) => looseEqual(v, b[i]))

const mergeArray = (oldArr: CascaderNode[], newArr: CascaderNode[]) => {
  const oldMap = oldArr.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.fullKey] = true
    return acc
  }, {})
  const newItems = newArr.filter(item => !oldMap[item.fullKey])
  return oldArr.concat(newItems)
}

const getCascaderStyles = () => ({
  dropdown: style`absolute z-dropdown`,
  panelContainer: style`flex mt-1 border border-line-accent rounded bg-content-white shadow`,
  scrollWrap: style`border-r border-line-accent overflow-hidden w-48 last-child:border-r-0 `,
  panel: style`overflow-scroll ${css`
    width: calc(100% + 28px);
    height: calc(100% + 38px);
  `}`,
  node: style`relative h-12 px-2 flex items-center cursor-pointer mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis hover:(bg-fill-light rounded) text-sm`,
  nodeDisabled: style`text-content-neutral cursor-not-allowed`,
  nodeActive: style`text-brand-active text-base`,
  checkbox: style`h-auto pl-1`,
  icon: style`absolute right-4 text-sm`,
})

const props = withDefaults(defineProps<CascaderProps>(), {
  placeholder: '请选择',
  emitPath: true,
  clearable: false,
  showAllLevels: true,
  changeOnSelect: false,
  separator: '/',
  data: () => [],
  trigger: 'click',
  fieldNames: () => ({} as Record<'label' | 'value' | 'children', string>),
  multiple: false,
  search: false,
})

const emit = defineEmits([
  'update:modelValue',
  'select',
  'search-change',
  'focus-change',
])

const expand = ref(false)
const cascaderRef = ref<HTMLElement | null>(null)
onClickOutside(cascaderRef, () => {
  expand.value = false
})

const normalize = (
  nodes: Record<string, any>[],
  name?: string[],
  path?: (string | number)[],
  key?: string,
): CascaderNode[] => {
  const {
    label: labelField = 'label',
    value: valueField = 'value',
    children: childrenField = 'children',
  } = props.fieldNames

  return nodes.map(node => {
    const children = node[childrenField]
    const label = node[labelField] as string
    const value = node[valueField] as string | number
    const currentKey = generateKey(node[valueField])
    const fullPath = (path || []).concat(value)
    const fullName = (name || []).concat(label)
    const fullKey = key ? `${key}@${currentKey}` : `${currentKey}`
    const hasChildren = children && children.length !== 0

    return {
      label,
      value,
      fullPath,
      fullName,
      fullKey,
      disabled: !!node.disabled,
      leaf: !hasChildren,
      children: hasChildren
        ? normalize(children, fullName, fullPath, fullKey)
        : undefined,
    } as CascaderNode
  })
}
const lists = ref<CascaderNode[][]>([])

// 搜索的时候，每次修改data都会生成新的nodeTree，allNodeTrees 就是所有出现的结果集合
// 用这个存所有的结果
const allNodeTree = ref<CascaderNode[]>([])

const nodeTree = ref<CascaderNode[]>([])

watch(
  () => props.data,
  val => {
    const newTree = normalize(val)
    nodeTree.value = newTree
    if (props.search) {
      allNodeTree.value = mergeArray(allNodeTree.value, newTree)
      lists.value = [nodeTree.value]
    } else {
      allNodeTree.value = newTree
    }
  },
  {
    immediate: true,
  },
)

const allNodes = computed(() => {
  const flatten = (nodes: CascaderNode[], all?: CascaderNode[]) => {
    const nodeList = all || []
    nodes.forEach(node => {
      const { children, ...other } = node
      nodeList.push(other)
      if (children) flatten(children, nodeList)
    })
    return nodeList
  }

  return flatten(allNodeTree.value)
})

const nodeMap = computed(() => {
  return allNodes.value.reduce<Record<string, CascaderNode>>((map, node) => {
    map[`${node.fullKey}`] = node
    return map
  }, {})
})

const currentKey = ref('')
const resolveKey = (
  value: ValueType,
  compareFn: (n: CascaderNode, value: ValueType) => boolean,
) => {
  const nodes = allNodes.value.filter(node => compareFn(node, value))

  if (!nodes.length) return ''

  if (nodes.length !== 1) {
    console.warn(
      'value is not unique in the given data, consider set emitPath true and provide fullPath',
    )
    return ''
  }
  return nodes[0].fullKey
}
const fullKeys = computed(() => {
  const value = props.modelValue

  // for multiple
  if (props.multiple) {
    let keys = []

    // first, modelValue should be an array when multiple is true
    if (!Array.isArray(value)) {
      console.warn(
        '[Cascader] modelValue must be an array when multiple is true',
      )
      return []
    }

    if (props.emitPath) {
      if (value.some((v: any) => !Array.isArray(v))) {
        console.log(
          '[Cascader] modelValue must be an array of array when emitPath is true',
        )
        return []
      }
      keys = value
        .map((item: any) =>
          resolveKey(item, (node: CascaderNode, value: ValueType) =>
            looseEqualArray(node.fullPath, value as string[]),
          ),
        )
        .filter(Boolean)
    } else {
      keys = value
        .map((item: any) =>
          resolveKey(item, (node: CascaderNode, value: ValueType) =>
            looseEqual(node.value, value),
          ),
        )
        .filter(Boolean)
    }

    // check if all values are valid
    if (!keys.every(key => validKey.value[`${key}`])) {
      console.warn('[Cascader] invalid value')
      return []
    }
    return keys
  }

  // for single
  let key = ''
  if (props.emitPath) {
    if (!Array.isArray(value)) {
      console.warn('[Cascader] value must be a Array if emitPath is true')
      return []
    }

    if (!value.length) {
      return []
    }
    key = resolveKey(value, (node: CascaderNode, value: ValueType) =>
      looseEqualArray(node.fullPath, value as string[]),
    )
  } else {
    key = resolveKey(value, (node: CascaderNode, value: ValueType) =>
      looseEqual(node.value, value),
    )
  }

  // val 有值，但是值不是有效的
  if (
    ((Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && value.toString())) &&
    !validKey.value[key]
  ) {
    console.warn('[Cascader] invalid value')
    return []
  }
  return key ? [key] : []
})

const selectedKeyMap = computed(() =>
  fullKeys.value.reduce<Record<string, boolean>>((map, fullKey) => {
    map[fullKey] = true
    return map
  }, {}),
)

const customHeight = computed(() => {
  if (props.height == undefined) return '14rem'
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return /^[0-9]{1,20}$/.test(props.height.trim())
      ? props.height + 'px'
      : props.height
  }
})

const nodes = computed(() =>
  fullKeys.value.map(fullKey => nodeMap.value[fullKey]),
)

const validKey = computed(() => {
  return allNodes.value
    .filter(node => (props.changeOnSelect ? true : node.leaf))
    .reduce<Record<string, boolean>>(
      (acc, node) => ({
        ...acc,
        [node.fullKey]: true,
      }),
      {},
    )
})
const activePathMap = computed(() => {
  // 当前正在操作，则操作线上所有的都是被激活的
  const currentKeyWayMap = currentKey.value
    ? allNodes.value.reduce<Record<string, boolean>>((map, node) => {
        if (currentKey.value.indexOf(node.fullKey) === 0) {
          map[node.fullKey] = true
        }
        return map
      }, {})
    : {}

  return {
    ...selectedKeyMap.value,
    ...currentKeyWayMap,
    [currentKey.value]: true,
  }
})

const handleFocus = (val: boolean) => {
  emit('focus-change', val)
  if (val) {
    open()
  }
}

const open = () => {
  expand.value = true
  if (props.multiple) {
    lists.value = [nodeTree.value]
    return
  }

  // for single
  const [cur] = fullKeys.value
  if (cur) {
    lists.value = resolveLists(cur)
  } else {
    lists.value = [nodeTree.value]
  }
}
const expandLists = (start: number, len: number, inserted: CascaderNode[]) => {
  lists.value.splice(start, len, inserted)
}

const resolveLists = (fullKey: string) => {
  const lists = [nodeTree.value]

  let node = nodeTree.value.find(item => fullKey.indexOf(item.fullKey) === 0)
  while (node && node.fullKey !== fullKey) {
    if (node && node.children) {
      lists.push(node.children)
      node = node.children.find(item => fullKey.indexOf(item.fullKey) === 0)
    }
  }

  return lists
}

const removeNode = (node: CascaderNode) => {
  if (props.multiple) {
    removeNodeValue(node)
    return
  }
  // set to empty
  replaceWithNodeValue()
}
const clearAll = () => {
  emit('update:modelValue', props.multiple || props.emitPath ? [] : '')
}

const selectNode = (node: CascaderNode) => {
  emit('select', node)
  currentKey.value = node.fullKey

  // 叶子结点或者 changeOnSelect 为true（任何一个节点都可以点击）
  if (node.leaf || props.changeOnSelect) {
    if (!selectedKeyMap.value[node.fullKey]) {
      replaceWithNodeValue(node)
    }

    // 是否已经被选中
    const selected = selectedKeyMap.value[node.fullKey]
    if (props.multiple) {
      // 反选
      checkChange(!selected, node)
    } else {
      // 未选中，则选中。
      if (!selected) {
        replaceWithNodeValue(node)
      }
    }
    if (node.leaf && !props.multiple) {
      expand.value = false
    }
  }
}

const onItemClick = (node: CascaderNode, depth: number) => {
  if (!node.disabled) {
    selectNode(node)
    if (!node.leaf && node.children) {
      expandLists(depth + 1, lists.value.length - depth, node.children)
    }
  }
}
const onItemMouseOver = (node: CascaderNode, depth: number) => {
  if (!node.disabled) {
    if (props.trigger === 'hover') {
      currentKey.value = node.fullKey
      if (!node.leaf && node.children) {
        expandLists(depth + 1, lists.value.length - depth, node.children)
      }
    }
  }
}

const checkChange = (checked: boolean, node: CascaderNode) => {
  if (checked) {
    addNodeValue(node)
  } else {
    removeNodeValue(node)
  }
}

// for multiple
const removeNodeValue = (node: CascaderNode) => {
  if (props.emitPath) {
    emit(
      'update:modelValue',
      (props.modelValue as Array<any>).filter(
        i => !looseEqualArray(i, node.fullPath),
      ),
    )
    return
  }
  emit(
    'update:modelValue',
    (props.modelValue as Array<any>).filter(i => i !== node.value),
  )
}

// for multiple
const addNodeValue = (node: CascaderNode) => {
  if (props.emitPath) {
    emit('update:modelValue', [
      ...(props.modelValue as Array<any>),
      node.fullPath,
    ])
    return
  }
  emit('update:modelValue', [...(props.modelValue as Array<any>), node.value])
}

// only for single modelValue
const replaceWithNodeValue = (node?: CascaderNode) => {
  // set to empty
  if (!node) {
    emit('update:modelValue', props.emitPath ? [] : '')
    return
  }
  emit('update:modelValue', props.emitPath ? node.fullPath : node.value)
}

const onInput = (value: string) => {
  if (!value) {
    currentKey.value = ''
    emit('update:modelValue', props.emitPath ? [] : '')
  }
}

onMounted(() => {
  if (props.autoFocus) {
    open()
  }
})

const handleSearchChange = (search: string) => {
  emit('search-change', search)
}

const styles = getCascaderStyles()
</script>
