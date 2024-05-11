import { FC } from 'react'
import { IMovieList } from './movie-list.interface'

import Link from 'next/link'
import MovieItem from './MovieItem'
import styles from './MovieList.module.scss'

const MovieList: FC<IMovieList> = ({ movies, link, title }) => {
	return (
		<div className={styles.list}>
			<h3 className={styles.heading}>{title}</h3>
			{movies.map(movie => (
				<MovieItem movie={movie} key={movie._id} />
			))}
			<Link href={link} className={styles.button}>
				See more
			</Link>
		</div>
	)
}

export default MovieList
