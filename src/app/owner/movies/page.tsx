import MovieList from '@/components/screens/admin/movies/MovieList'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'Movie List page',
	description: 'Movie List page',
	...NO_INDEX_PAGE
}

const MoviePage: FC = () => {
	return <MovieList />
}

export default MoviePage
