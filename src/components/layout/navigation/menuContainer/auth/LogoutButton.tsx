'use client'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { useActions } from '@/hooks/useActions'
import Link from 'next/link'
import { FC, MouseEvent } from 'react'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		logout()
	}

	return (
		<li className='li'>
			<Link href='/' onClick={handleLogout}>
				<MaterialIcon name='MdLogout' />
				<span>Logout</span>
			</Link>
		</li>
	)
}

export default LogoutButton
