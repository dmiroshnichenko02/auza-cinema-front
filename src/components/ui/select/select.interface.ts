import { ControllerRenderProps } from 'react-hook-form'
import { IFieldsProps } from '../formElements/form.interface'

import { Options } from 'react-select'

export interface IOptions {
	value: string
	label: string
}

export interface ISelect extends IFieldsProps {
	options: Options<IOptions>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}
