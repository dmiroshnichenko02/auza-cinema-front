import { EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react'
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

type TypeEditorPropsField = EditorProps & IFieldsProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

export interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}
