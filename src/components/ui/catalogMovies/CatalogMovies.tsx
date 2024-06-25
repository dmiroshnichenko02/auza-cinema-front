import { FC } from 'react'

import { getMovieUrl } from '@/configs/url.config'
import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'
import styles from './CatalogMovies.module.scss'
import { ICatalog } from './catalog.interface'

const CatalogMovies: FC<ICatalog> = ({ title, description, movies }) => {
	return (
		<>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description title={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map(movie => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							link: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title
							}
						}}
						variant='horizontal'
					/>
				))}
			</section>
		</>
	)
}

export default CatalogMovies
