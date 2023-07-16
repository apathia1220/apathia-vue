import flatpickr from 'flatpickr'
import type { PluginConfig } from './types'

const defaultConfig: PluginConfig = {
  clearIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  confirmIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  confirmText: 'OK ',
  clearText: 'CLEAR ',
  showAlways: false,
  theme: 'light',
}

function confirmDatePlugin(pluginConfig: PluginConfig) {
  const config = {
    ...defaultConfig,
    ...pluginConfig,
  }
  let btnContainer: HTMLElement
  let confirmBtn: HTMLElement
  let clearBtn: HTMLElement

  return function plugin(fp: flatpickr.Instance) {
    const hooks = {
      onKeyDown(_: any, __: any, ___: any, e: KeyboardEvent) {
        if (
          fp.config.enableTime &&
          e.key === 'Tab' &&
          (e.target === fp.amPM ||
            (!fp.secondElement && e.target === fp.minuteElement) ||
            e.target === fp.secondElement)
        ) {
          e.preventDefault()
          confirmBtn.focus()
        } else if (e.key === 'Enter' && e.target === confirmBtn) {
          fp.close()
        }
      },

      onReady() {
        if (fp.calendarContainer === undefined) return

        // eslint-disable-next-line no-underscore-dangle
        clearBtn = fp._createElement<HTMLDivElement>(
          'div',
          'clear-btn',
          config.clearText,
        )

        // eslint-disable-next-line no-underscore-dangle
        confirmBtn = fp._createElement<HTMLDivElement>(
          'div',
          'confirm-btn',
          config.confirmText,
        )

        // eslint-disable-next-line no-underscore-dangle
        btnContainer = fp._createElement(
          'div',
          `flatpickr-confirm ${config.showAlways ? 'visible' : ''} ${
            config.theme
          }Theme`,
          '',
        )

        // clearBtn.tabIndex = -1;
        confirmBtn.tabIndex = -1
        btnContainer.appendChild(clearBtn)
        clearBtn.innerHTML += config.clearIcon

        btnContainer.appendChild(confirmBtn)
        confirmBtn.innerHTML += config.confirmIcon

        clearBtn.addEventListener('click', () => {
          fp.clear()
          fp.close()
        })
        confirmBtn.addEventListener('click', fp.close)
        fp.calendarContainer.appendChild(btnContainer)
      },
      ...(!config.showAlways
        ? {
            onChange(_: any, dateStr: string) {
              const showCondition =
                fp.config.enableTime || fp.config.mode === 'multiple'
              if (dateStr && !fp.config.inline && showCondition) {
                return btnContainer.classList.add('visible')
              }
              btnContainer.classList.remove('visible')
              return true
            },
          }
        : {}),
    }

    return hooks
  }
}

export default confirmDatePlugin
