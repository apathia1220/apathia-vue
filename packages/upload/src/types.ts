import type { MaybePromise } from '@apathia/apathia.shared'

export type UploadProps = {
  modelValue: string[] | string
  valid: boolean
  draggable: boolean
  headers: Record<string, string>
  action: string
  name: string
  inputDisabled: boolean
  noInput: boolean
  buttonName: string
  withCredentials: boolean
  multiple: boolean
  data: Record<string, string> | ((file: File) => Record<string, string>)
  limit: number
  fileSize: number
  accept: string
  disabled: boolean
  onBeforeEachUpload: (file: File) => MaybePromise<File>
  onBeforeAllUpload: (files: FileList | null) => MaybePromise<boolean>
  onAfterEachUpload: (url: string, file: File) => MaybePromise<string>
  onError: (...args: unknown[]) => void
  resolveUrl: (p: unknown) => MaybePromise<string>
  checkUrl: (url: string) => MaybePromise<boolean>
  https: boolean
}

export type UploadEmits = {
  'update:modelValue': [urlRes: string | string[]]
  'update:valid': [valid: boolean]
}
