import Admin from '@/components/screens/admin/home/Admin'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'Manage',
	description: 'Manage page',
	...NO_INDEX_PAGE
}

const OwnerPage: FC = () => {
	return (
		<>
			<Admin />
		</>
	)
}

export default OwnerPage
