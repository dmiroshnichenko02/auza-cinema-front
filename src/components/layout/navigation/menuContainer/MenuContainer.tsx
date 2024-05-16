'use client'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import GenreMenu from './genres/GenreMenu'
import { firstMenu, userMenu } from './menu.data'

const DynamicMenu = dynamic(() => import('./Menu'), { ssr: false })

const MenuContainer: FC = () => {
	return (
		<div>
			<DynamicMenu menu={firstMenu} />
			<GenreMenu />
			<DynamicMenu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
