import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { NextPageAuth } from '@/shared/types/auth.types'

export const metadata = {
	title: 'Manage',
	description: 'Manage page',
	...NO_INDEX_PAGE
}

const OwnerPage: NextPageAuth = () => {
	return <div>page</div>
}

OwnerPage.isOnlyAdmin = true

export default OwnerPage
