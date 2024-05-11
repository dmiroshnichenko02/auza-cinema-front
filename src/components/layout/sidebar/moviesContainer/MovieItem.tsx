import MaterialIcon from '@/components/ui/MaterialIcon'
import { getGenreUrl, getMovieUrl } from '@/configs/url.config'
import { IMovie } from '@/shared/types/movie.types'
import { getGenresListEach } from '@/utils/movie/getGenresList'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					draggable={false}
					src={movie.poster}
					alt={movie.title}
					width={65}
					height={97}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<div>
					<h4 className={styles.title}>{movie.title}</h4>
					<div className={styles.genres}>
						{movie.genres.map((genre, index) => (
							<Link href={getGenreUrl(genre.slug)} key={genre._id}>
								{getGenresListEach(index, movie.genres.length, genre.name)}
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name='MdStarRate' />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
