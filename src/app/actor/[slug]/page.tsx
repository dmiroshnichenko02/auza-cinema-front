import NotFound from '@/app/not-found'
import CatalogMovies from '@/components/ui/catalogMovies/CatalogMovies'
import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'

export async function getStaticPaths() {
	try {
		const { data: actors } = await ActorService.getAll()

		const paths = actors.map(actor => ({
			params: { slug: actor.slug }
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
		const { data: actor } = await ActorService.getBySlug(params.slug)

		const { data: movies } = await MovieService.getByActor(actor._id)

		return {
			movies,
			actor
		}
	} catch (error) {
		return {}
	}
}

const ActorPage: FC<{ params: { slug: string } }> = async ({ params }) => {
	const { movies, actor } = await fetchData({ params })
	return actor ? (
		<CatalogMovies title={actor?.name} movies={movies || []} />
	) : (
		<NotFound />
	)
}

export default ActorPage
