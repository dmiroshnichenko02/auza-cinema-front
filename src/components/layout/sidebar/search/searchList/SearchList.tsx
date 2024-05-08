import { getMovieUrl } from '@/configs/url.config'
import { IMovie } from '@/shared/types/movie.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SearchList.module.scss'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map(movie => (
					<Link href={getMovieUrl(movie.slug)} key={movie._id}>
						<Image
							src={movie.poster}
							width={50}
							height={50}
							alt={movie.title}
							objectFit='cover'
							objectPosition='top'
							draggable={false}
						/>
						<span>{movie.title}</span>
					</Link>
				))
			) : (
				<h3 className='text-white text-center my-4'>Movies not found</h3>
			)}
		</div>
	)
}

export default SearchList
