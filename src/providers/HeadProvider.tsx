import { accentColor } from '@/configs/constants'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { FC, PropsWithChildren } from 'react'

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelay={200}
				height='3px'
			/>
			{children}
		</>
	)
}

export default HeadProvider
