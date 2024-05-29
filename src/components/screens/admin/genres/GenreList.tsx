'use client'

import AdminNavigation from '@/components/ui/adminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/adminTabel/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/adminTabel/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { useGenres } from './useGenres'

const GenreList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync
	} = useGenres()

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
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</>
	)
}

export default GenreList
