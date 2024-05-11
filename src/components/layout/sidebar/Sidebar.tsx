import { FC } from 'react'
import styles from './Sidebar.module.scss'
import MoviesContainer from './moviesContainer/MoviesContainer'
import Search from './search/Search'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	)
}

export default Sidebar
