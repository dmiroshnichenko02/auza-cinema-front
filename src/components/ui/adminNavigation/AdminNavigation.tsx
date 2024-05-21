import { FC } from 'react'
import styles from './AdminNavigation.module.scss'
import AdminNavigationItem from './AdminNavigationItem'
import { navItems } from './admin-navigation.data'

const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map(item => (
					<AdminNavigationItem item={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
