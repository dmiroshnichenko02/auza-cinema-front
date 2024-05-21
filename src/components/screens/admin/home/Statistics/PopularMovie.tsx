'use client'

import { MovieService } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import SubHeading from '@/components/ui/heading/SubHeading'
import { getMovieUrl } from '@/configs/url.config'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../Admin.module.scss'

const PopularMovie: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['admin most popular'],
		queryFn: () => MovieService.getMostPopularMovies(),
		select: ({ data }) => data[0]
	})

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title='The most popular movie' />
			{isLoading ? (
				<SkeletonLoader className='h-48' />
			) : (
				data && (
					<>
						<h3>Opened {data.countOpened} times</h3>
						<Link href={getMovieUrl(data.slug)}>
							<Image
								src={data.bigPoster}
								width={285}
								height={176}
								alt={data.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
