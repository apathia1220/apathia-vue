import flatpickr from 'flatpickr'
import { tw, css, apply } from '@apathia/apathia.twind'
import type { RangeConfig, RangeChange } from './types'

export default function (range: RangeConfig, change: RangeChange) {
  return function plugin(fp: flatpickr.Instance) {
    return {
      onKeyDown() {},
      onReady() {
        const container = document.createElement('div')
        const containerClass = tw(css`
          position: absolute;
          top: 0;
          left: -100px;
          width: 100px;
          box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6,
            0 -1px 0 #e6e6e6;
          border-radius: 5px;
          height: 100%;
          overflow: auto;
          background-color: #fff;
        `)
        container.className = containerClass

        Object.entries(range).forEach(([key, val]) => {
          const itemEl = document.createElement('div')

          const itemClass = tw(
            css`
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              ${apply`hover:(bg-brand-500 text-white)`}
            `,
          )
          itemEl.className = itemClass
          itemEl.innerText = key
          itemEl.onclick = () => {
            change(val)
            fp.close()
          }
          container.appendChild(itemEl)
        })
        fp.calendarContainer.appendChild(container)
      },
    } as const
  }
}
