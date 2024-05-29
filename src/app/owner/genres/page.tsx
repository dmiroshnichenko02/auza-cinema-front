import GenreList from '@/components/screens/admin/genres/GenreList'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'Genre List page',
	description: 'Genre List page',
	...NO_INDEX_PAGE
}

const GenrePage: FC = () => {
	return <GenreList />
}

export default GenrePage
