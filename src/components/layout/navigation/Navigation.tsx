import { FC } from 'react'
import Logo from './Logo'
import styles from './Navigation.module.scss'
import MenuContainer from './menuContainer/MenuContainer'
const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
