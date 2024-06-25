import CatalogMovies from '@/components/ui/catalogMovies/CatalogMovies'
import { getMoviesUrl } from '@/configs/api.config'
import { IMovie } from '@/shared/types/movie.types'
import { FC } from 'react'

const fetchData = async () => {
	try {
		const data: IMovie[] = await fetch(getMoviesUrl('/most-popular'), {
			next: {
				revalidate: 3600
			}
		}).then(res => res.json())
		return data
	} catch (error) {
		return []
	}
}

const TrendingPage: FC = async () => {
	const movies = await fetchData()

	return (
		<CatalogMovies
			description='Trending movies and series in excellent quality: legal, safe, without ads'
			title='Trending movies'
			movies={movies || []}
		/>
	)
}

export default TrendingPage
