import { FC } from 'react'

import cn from 'clsx'
import parse from 'html-react-parser'

const Description: FC<{ title: string; className?: string }> = ({
	title,
	className = ''
}) => {
	return (
		<div
			className={cn('text-lg font-light text-white text-opacity-60', className)}
		>
			{parse(title)}
		</div>
	)
}

export default Description
