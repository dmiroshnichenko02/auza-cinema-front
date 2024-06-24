import { errorCatch } from '@/api/api.heplers'
import HomePage from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getActorsUrl, getMoviesUrl } from '@/configs/api.config'
import { getMovieUrl } from '@/configs/url.config'
import { IActor, IMovie } from '@/shared/types/movie.types'
import { getGenresList } from '@/utils/movie/getGenresList'
import { FC } from 'react'

const fetchData = async () => {
	try {
		const data: IMovie[] = await fetch(getMoviesUrl(''), {
			cache: 'force-cache'
		}).then(res => res.json())

		const dataTrending: IMovie[] = await fetch(getMoviesUrl('/most-popular'), {
			cache: 'force-cache'
		}).then(res => res.json())

		const dataActors: IActor[] = await fetch(getActorsUrl(''), {
			cache: 'force-cache'
		}).then(res => res.json())

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map(a => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorsUrl(a.slug),
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`
			}
		}))

		const slides: ISlide[] = data.slice(0, 5).map(m => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster
		}))

		const trends: IGalleryItem[] = dataTrending.slice(0.7).map(m => ({
			name: m.title,
			posterPath: m.poster,
			link: getMovieUrl(m.slug)
		}))

		return {
			actors,
			slides,
			trends
		}
	} catch (error) {
		console.log(errorCatch(error))

		return {
			slides: [],
			actors: [],
			trends: []
		}
	}
}

const Home: FC<IHome> = async () => {
	const { slides, actors, trends } = await fetchData()

	return (
		slides && (
			<HomePage slides={slides} actors={actors} trendingMovies={trends} />
		)
	)
}

export default Home
