'use client'

import AdminNavigation from '@/components/ui/adminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/adminTabel/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/adminTabel/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { useMovies } from './useMovies'

const MovieList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync
	} = useMovies()

	return (
		<>
			<AdminNavigation />
			<Heading title='Users' />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genres', 'Rating']}
				tableItems={data || []}
			/>
		</>
	)
}

export default MovieList
