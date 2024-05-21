'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { INavItem } from './admin-navigation.interface'

import styles from './AdminNavigation.module.scss'

const AdminNavigationItem: FC<{ item: INavItem }> = ({
	item: { title, link }
}) => {
	const pathname = usePathname()

	return (
		<li>
			<Link href={link} className={cn({ [styles.active]: pathname === link })}>
				{title}
			</Link>
		</li>
	)
}

export default AdminNavigationItem
