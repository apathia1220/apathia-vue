import { ComputedRef, Ref, ref } from 'vue'
import { useEventListener } from '@apathia/apathia.hooks'
import { MaybeRef } from '@apathia/apathia.shared'

export function useDragDrop(
  el: MaybeRef<HTMLElement | null>,
  disabled: Ref<boolean> | ComputedRef<boolean>,
  processFiles: (files?: FileList) => void,
) {
  const dragging = ref(false)

  const dragenter = (e: Event) => {
    e.preventDefault()

    if (disabled.value) return
    dragging.value = true
  }

  // Set argument as type "Event" to fix useEventListener type issue
  const drop = (e: Event) => {
    e.preventDefault()

    const fileList = (e as DragEvent).dataTransfer?.files
    processFiles(fileList)
    dragging.value = false
  }

  const dragover = (e: Event) => {
    e.preventDefault()
  }

  const dragleave = (e: Event) => {
    e.preventDefault()

    dragging.value = false
  }

  useEventListener(el, 'dragenter', dragenter)
  useEventListener(el, 'drop', drop)
  useEventListener(el, 'dragover', dragover)
  useEventListener(el, 'dragleave', dragleave)

  return {
    dragging,
  }
}
