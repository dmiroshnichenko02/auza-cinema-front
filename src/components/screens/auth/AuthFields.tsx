import Field from '@/components/ui/formElements/Field'
import { validEmail } from '@/shared/regex'
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false
}) => {
	return (
		<>
			<Field
				placeholder='Email'
				error={errors.email}
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Invalid email'
					}
				})}
			/>

			<Field
				placeholder='Password'
				type='password'
				error={errors.email}
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more than 6 symbols'
								}
						  }
						: {}
				)}
			/>
		</>
	)
}

export default AuthFields
