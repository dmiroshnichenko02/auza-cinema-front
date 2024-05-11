import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { MovieService } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import MovieList from './MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['Popular movies in sidebar'],
		queryFn: () => MovieService.getMostPopularMovies(),
		select: ({ data }) => data
	})

	return isLoading ? (
		<div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
	) : (
		<MovieList link='/trending' title='Popular movies' movies={data || []} />
	)
}

export default PopularMovies
