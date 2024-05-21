'use client'

import { AdminService } from '@/services/admin.service'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import styles from '../Admin.module.scss'

const CountUsers: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['admin user counter'],
		queryFn: () => AdminService.getCountUsers(),
		select: ({ data }) => data
	})

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<>
						<div className={styles.number}>{data}</div>
						<div className={styles.description}>users</div>
					</>
				)}
			</div>
		</div>
	)
}

export default CountUsers
