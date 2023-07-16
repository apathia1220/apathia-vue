import { isRef, Ref } from 'vue'
import { apply, tw, css } from '@apathia/apathia.twind'
import type { RefType } from './types'

export const isHTMLElement = (val: unknown): val is HTMLElement =>
  val instanceof HTMLElement

export const isRefType = (val: unknown): val is RefType => isRef(val)

export const isRefBoolean = (val: unknown): val is Ref<boolean> =>
  isRef(val) ? typeof val.value === 'boolean' : false

export const getArrowStyle = (color: string, bgc: string, borderc: string) => {
  const getArrowBase = () => {
    const popperArrowBefore = css`
      width: 10px;
      height: 10px;
      &:before {
        ${apply`
          absolute bg-content-primary inset-0 z-0 box-border transform rotate-45 
          border-solid border border-${borderc} bg-${bgc}
        `}
        content: ' ';
        width: 10px;
        height: 10px;
      }
    `
    return apply`absolute z-0 ${popperArrowBefore}`
  }
  const arrowBase = tw(getArrowBase())

  const getContent = () => {
    const placeMap = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }
    const placeArr = Object.keys(placeMap) as Array<keyof typeof placeMap>
    const arrowPosition = placeArr.map(
      v =>
        css`
          &[data-popper-placement^=${v}] .${arrowBase} {
            ${placeMap[v]}: -5px;
          }
        `,
    )

    const borderMap = {
      top: 'left',
      bottom: 'right',
      left: 'bottom',
      right: 'top',
    }
    const borderArr = Object.keys(borderMap) as Array<keyof typeof borderMap>
    const arrowBorder = borderArr.map(
      v =>
        css`
        &[data-popper-placement^=${v}] .${arrowBase}{
          &:before {
            border-${borderMap[v]}-color: transparent;
            border-${v}-color: transparent;
          }
        }
      `,
    )

    return apply`bg-${bgc} max-w-md box-border rounded border-solid border border-${borderc} 
    p-3 z-50 text(${color} justify sm) shadow break-all ${arrowPosition} ${arrowBorder}`
  }
  const content = getContent()

  return {
    arrowBase,
    content: tw`${content}`,
  }
}
