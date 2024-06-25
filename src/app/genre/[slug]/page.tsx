import NotFound from '@/app/not-found'
import CatalogMovies from '@/components/ui/catalogMovies/CatalogMovies'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'

export async function getStaticPaths() {
	try {
		const { data: genres } = await GenreService.getAll()

		const paths = genres.map(genre => ({
			params: { slug: genre.slug }
		}))

		return {
			paths,
			fallback: 'blocking'
		}
	} catch {
		return {
			paths: [],
			fallback: false
		}
	}
}

const fetchData = async ({ params }: { params: { slug: string } }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(params.slug)

		const { data: movies } = await MovieService.getByGenres([genre._id])

		return {
			movies,
			genre
		}
	} catch (error) {
		return {}
	}
}

const GenrePage: FC<{ params: { slug: string } }> = async ({ params }) => {
	const { movies, genre } = await fetchData({ params })
	return genre ? (
		<CatalogMovies
			description={genre?.description}
			title={genre?.name}
			movies={movies || []}
		/>
	) : (
		<NotFound />
	)
}

export default GenrePage
