import Heading from '@/components/ui/heading/Heading'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'Page not found',
	...NO_INDEX_PAGE
}

const NotFound: FC = () => {
	return <Heading title='404 - Page not found' />
}

export default NotFound
