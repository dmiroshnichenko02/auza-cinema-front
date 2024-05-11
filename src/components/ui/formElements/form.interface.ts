import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	ariaLabel?: string
}

export interface IFieldsProps {
	placeholder: string
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | any
}
type InputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldsProps

export interface IField extends InputPropsField {}
