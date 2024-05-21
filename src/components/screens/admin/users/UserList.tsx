'use client'

import AdminNavigation from '@/components/ui/adminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/adminTabel/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/adminTabel/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { useUsers } from './useUsers'

const UserList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

	return (
		<>
			<AdminNavigation />
			<Heading title='Users' />

			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date created']}
				tableItems={data || []}
			/>
		</>
	)
}

export default UserList
