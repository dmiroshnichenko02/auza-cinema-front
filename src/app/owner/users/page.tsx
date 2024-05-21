import UserList from '@/components/screens/admin/users/UserList'
import { NO_INDEX_PAGE } from '@/configs/seo.config'
import { FC } from 'react'

export const metadata = {
	title: 'User List page',
	description: 'User List page',
	...NO_INDEX_PAGE
}

const UsersPage: FC = () => {
	return <UserList />
}

export default UsersPage
