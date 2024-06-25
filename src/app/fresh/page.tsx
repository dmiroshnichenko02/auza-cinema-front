import CatalogMovies from '@/components/ui/catalogMovies/CatalogMovies'
import { getMoviesUrl } from '@/configs/api.config'
import { IMovie } from '@/shared/types/movie.types'
import { FC } from 'react'

const fetchData = async () => {
	try {
		const data: IMovie[] = await fetch(getMoviesUrl(''), {
			next: {
				revalidate: 3600
			}
		}).then(res => res.json())
		return data
	} catch (error) {
		return []
	}
}

const FreshPage: FC = async () => {
	const movies = await fetchData()

	return (
		<CatalogMovies
			description='New movies and series in excellent quality: legal, safe, without ads'
			title='Fresh movies'
			movies={movies || []}
		/>
	)
}

export default FreshPage
