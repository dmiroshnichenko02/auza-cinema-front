import { FC } from 'react'

import AdminNavigation from '@/components/ui/adminNavigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
	return (
		<div>
			<AdminNavigation />
			<Heading title='Some statistics' />
			<Statistics />
		</div>
	)
}

export default Admin
