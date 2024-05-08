import SearchField from '@/components/ui/searchField/SearchField'
import { FC } from 'react'
import styles from './Search.module.scss'
import SearchList from './searchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
