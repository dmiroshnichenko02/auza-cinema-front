import { FC } from 'react'
import { IAdminTableItem } from './admin-table.interface'

import AdminActions from './AdminActions/AdminActions'
import styles from './AdminTable.module.scss'

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map(value => (
				<div key={value}>{value}</div>
			))}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>
	)
}

export default AdminTableItem
