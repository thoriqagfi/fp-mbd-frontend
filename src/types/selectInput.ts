import { RegisterOptions } from 'react-hook-form'

export type SelectInputProps = {
  id: string
  titleLabel: string
  options: string[]
  registerType?: RegisterOptions
  errorMessage?: string
}