<template>
  <div :class="[styles.imgWrap, { [styles.errorHidden]: isError }]">
    <img
      :src="src"
      :alt="alt"
      :class="styles.img"
      :style="imgStyle"
      @error="handleError"
    />
    <!-- 蒙层 -->
    <div v-if="preview" :class="styles.mask" @click="handleClickOpenMash">
      <span :class="styles.hoverEnlarge" @click.stop="handleClickCopyLocation">
        <Icon :class="styles.maskIcon" :size="10">
          <CopyDocument />
        </Icon>
        <i :class="styles.iconText">复制地址</i>
      </span>
      <span :class="[styles.hoverEnlarge, styles.iconGap]">
        <Icon :class="styles.maskIcon" :size="10">
          <View />
        </Icon>
        <i :class="styles.iconText">预览</i>
      </span>
    </div>
  </div>

  <!-- 图片加载失败占位 -->
  <slot v-if="isError" name="error">
    <div :class="styles.error" :style="imgErrorStyle">
      <p>加载失败</p>
    </div>
  </slot>

  <!-- 预览 -->
  <Teleport to="body">
    <Transition v-bind="styles.transitionClass">
      <div
        v-if="mask"
        :class="styles.duration"
        @mousewheel.passive="handleMouseWheel"
      >
        <div :class="styles.shadeClass" @click="handleClickCloseMask">
          <ul :class="styles.options" @click="e => e.stopPropagation()">
            <!-- 关闭 -->
            <li :class="styles.optionIcons" @click="handleClickCloseMask">
              <Icon>
                <Close />
              </Icon>
            </li>
            <!-- 放大 -->
            <li :class="styles.optionIcons" @click="handleClickZoomIn">
              <Icon>
                <Plus />
              </Icon>
            </li>
            <!-- 缩小 -->
            <li :class="styles.optionIcons" @click="handleClickZoomOut">
              <Icon>
                <Minus />
              </Icon>
            </li>
            <!-- 右转90度 -->
            <li
              :class="[styles.optionIcons, styles.optionIconsSize]"
              @click="handleClickTurnRight"
            >
              <Icon>
                <RefreshRight />
              </Icon>
            </li>
            <!-- 左转90度 -->
            <li
              :class="[styles.optionIcons, styles.optionIconsSize]"
              @click="handleClickTurnLeft"
            >
              <Icon>
                <RefreshLeft />
              </Icon>
            </li>
          </ul>
          <div
            :class="styles.previewImgWrap"
            :style="`transform: translate3d(${translate.x}px, ${translate.y}px, 0px) scale3d(${scaleTimes}, ${scaleTimes}, 1) rotate(${rotateAngle}deg)`"
          >
            <img
              :src="src"
              :alt="alt"
              :class="styles.previewImg"
              @mousedown.prevent="handleMouseDown"
              @mousemove.prevent="handleMouseMove"
              @mouseup.prevent="handleMouseUp"
              @click="e => e.stopPropagation()"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, shallowReactive } from 'vue'
import { style, tw, css, keyframes } from '@apathia/apathia.twind'
import { Icon } from '@apathia/apathia.icon'
import { toast } from '@apathia/apathia.alert'
// import { resizeImage } from '@apathia/apathia.shared'
import {
  CopyDocument,
  Close,
  Plus,
  Minus,
  RefreshLeft,
  RefreshRight,
  View,
} from '@apathia/apathia.icon-svg'
import type { ImageProps } from './types'

// css
const flash = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`
const flashCss = css({
  animation: '0.5s ease',
  animationName: flash,
})

const styles = {
  imgWrap: style`relative inline-block`,
  img: style`w-full h-auto align-middle bg-fill-gray`,
  mask: style`
      absolute inset-0 cursor-pointer
      bg-fill-primary bg-opacity-50 opacity-0 transition-all
      text-content-white flex justify-center items-center text-center text-sm
      hover:opacity-100
    `,
  iconText: style`ml-1`,
  iconGap: style`ml-4`,
  maskIcon: style`inline-block fill-current text-xs`,
  transitionClass: {
    leaveToClass: tw`opacity-0`,
  },
  duration: tw`duration-500`,
  shadeClass: style`z-50 fixed inset-0 h-full bg-fill-gray bg-opacity-50 overflow-auto ${flashCss}`,
  options: style`
      m-0 p-0 absolute w-full
      flex flex-row-reverse items-center
      text-content-white bg-fill-white bg-opacity-10
      pointer-events-auto z-10
    `,
  optionIcons: style`p-3 ml-4 text-xl cursor-pointer`,
  optionIconsSize: style`text-lg`,
  previewImgWrap: style`fixed inset-0 flex justify-center items-center`,
  previewImg: style`max-w-full max-h-full cursor-grab select-none transition-all bg-fill-gray`,
  error: style`flex justify-center items-center bg-fill-light text-fill-gray text-xs`,
  errorHidden: style`hidden`,
  hoverEnlarge: style`hover:text-lg transition-all`,
}

const props = withDefaults(defineProps<ImageProps>(), {
  alt: 'img',
  preview: true,
})

const mask = ref(false) // 是否显示预览蒙层

// 计算缩略图 url
// const previewImage = computed(() => {
//   const suffix =
//     props.width && props.height
//       ? `${props.width}x${props.height}`
//       : props.width
//       ? `${props.width}x0`
//       : props.height
//       ? `0x${props.height}`
//       : '160x100'
//   const path = props.src.replace(/^https?:/, '')

//   return resizeImage(path, suffix)
// })

// 转px格式
const toPx = (val?: number | string) => {
  if (!val) return
  const [num] = (val + '').split('px')
  return num + 'px'
}

// 缩略图尺寸。为保证图片宽高比，只需设置一个属性
const imgStyle = computed(() => {
  const width = toPx(props.width)
  const height = toPx(props.height)
  if (width) {
    // 设置了 width，用 width
    return { width }
  } else if (height) {
    // 只设置了 height，用 height
    return { height }
  } else {
    // 默认值
    return { width: '160px' }
  }
})

// 图片占位尺寸，宽高都需设置
const imgErrorStyle = computed(() => {
  const width = toPx(props.width)
  const height = toPx(props.height)
  if (width && height) {
    return { width, height }
  } else {
    return {
      width: width ? width : '160px',
      height: height ? height : '100px',
    }
  }
})

const isError = ref(false)

// 图片加载失败
const handleError = () => {
  isError.value = true
}

const clearOptions = () => {
  scaleTimes.value = 1
  rotateAngle.value = 0
  translate.x = 0
  translate.y = 0
}

// 复制图片地址
const handleClickCopyLocation = () => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', props.src)
  input.select()
  if (document.execCommand('copy')) toast.success('复制图片地址成功')
  document.body.removeChild(input)
}

// 蒙层
const handleClickOpenMash = () => {
  const body = document.querySelector('body')
  if (body) {
    body.style.overflowY = 'hidden'
    mask.value = true
  }
}
const handleClickCloseMask = () => {
  const body = document.querySelector('body')
  if (body) {
    body.style.overflowY = 'auto'
    mask.value = false
  }
  // 清一下 options
  clearOptions()
}

// Options
// - 缩放
const scaleTimes = ref(1)
const handleClickZoomIn = () => {
  // 放大
  scaleTimes.value += 0.25
}
const handleClickZoomOut = () => {
  // 缩小 最小为原大小的0.75
  if (scaleTimes.value >= 1) scaleTimes.value -= 0.25
}

// - 旋转
const rotateAngle = ref(0)
const handleClickTurnLeft = () => {
  // 向左旋转90度
  rotateAngle.value -= 90
}
const handleClickTurnRight = () => {
  // 向右旋转90度
  rotateAngle.value += 90
}

// 平移 拖拽图片
const translate = shallowReactive({
  x: 0, // 向右平移
  y: 0, // 向下平移
})
let downPosition: null | Record<string, number> = null
const handleMouseDown = (e: MouseEvent) => {
  downPosition = {
    downX: e.clientX - translate.x, // 要处理一下上次的平移
    downY: e.clientY - translate.y,
  }
}
const handleMouseMove = (e: MouseEvent) => {
  if (downPosition) {
    const { downX, downY } = downPosition
    translate.x = e.clientX - downX
    translate.y = e.clientY - downY
  }
}
const handleMouseUp = () => {
  downPosition = null
}

// 鼠标滚轮事件 缩放
const handleMouseWheel = (e: WheelEvent) => {
  let direction = e.deltaY > 0 ? 'down' : 'up'
  if (direction === 'up') {
    // 滑轮向上滚动
    handleClickZoomIn()
  } else {
    // 滑轮向下滚动
    handleClickZoomOut()
  }
}
</script>
