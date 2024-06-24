import { FC } from 'react'
import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import formStyles from '../../ui/formElements/Form.module.scss'
import styles from './Select.module.scss'
import { IOptions, ISelect } from './select.interface'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	field,
	options,
	placeholder,
	error,
	isLoading,
	isMulti
}) => {
	const onChange = (newValue: OnChangeValue<IOptions, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOptions[]).map((item: IOptions) => item.value)
				: (newValue as IOptions).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix='custom-select'
					placeholder={''}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
