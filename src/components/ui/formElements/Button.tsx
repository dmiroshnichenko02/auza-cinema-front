import cn from 'clsx'
import { FC } from 'react'
import { IButton } from './form.interface'

import styles from './Form.module.scss'

const Button: FC<IButton> = ({ children, className, ariaLabel, ...rest }) => {
	return (
		<button
			className={cn(styles.button, className)}
			{...rest}
			aria-label={ariaLabel}
		>
			{children}
		</button>
	)
}

export default Button
