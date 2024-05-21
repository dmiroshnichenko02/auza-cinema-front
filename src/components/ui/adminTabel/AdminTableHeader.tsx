import cn from 'clsx'
import { FC } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map(value => (
				<h4 key={value}>{value}</h4>
			))}
			<h4>Actions</h4>
		</div>
	)
}

export default AdminTableHeader
