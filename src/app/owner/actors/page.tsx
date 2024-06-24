import ActorList from '@/components/screens/admin/actor/actors/ActorList'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'Actor List page',
	description: 'Actor List page',
	...NO_INDEX_PAGE
}

const ActorPage: FC = () => {
	return <ActorList />
}

export default ActorPage
