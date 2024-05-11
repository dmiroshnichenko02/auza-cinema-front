'use client'

import { useAuth } from '@/hooks/useAuth'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

import Button from '@/components/ui/formElements/Button'
import Heading from '@/components/ui/heading/Heading'
import styles from './Auth.module.scss'
import AuthFields from './AuthFields'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: RegisterInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const login = (data: any) => {
		alert(data)
	}
	const register = (data: any) => {
		alert(data)
	}

	const onSubmit: SubmitHandler<IAuthInput> = data => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			register(data)
		}

		reset()
	}

	return (
		<section className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading title={'Auth'} className='mb-6' />

				<AuthFields
					register={RegisterInput}
					formState={formState}
					isPasswordRequired
				/>

				<div className={styles.buttons}>
					<Button
						type='submit'
						ariaLabel='Login'
						onClick={() => setType('login')}
						disabled={isLoading}
					>
						Login
					</Button>
					<Button
						type='submit'
						ariaLabel='Register'
						onClick={() => setType('register')}
						disabled={isLoading}
					>
						Register
					</Button>
				</div>
			</form>
		</section>
	)
}

export default Auth
