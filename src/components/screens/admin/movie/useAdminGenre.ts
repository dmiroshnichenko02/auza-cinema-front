import { IOptions } from '@/components/ui/select/select.interface'
import { GenreService } from '@/services/genre.service'
import { toastrError } from '@/utils/toastrError'
import { useQuery } from '@tanstack/react-query'

export const useAdminGenre = () => {
	const queryData = useQuery({
		queryKey: ['List of admin genre'],
		queryFn: () => GenreService.getAll(),
		select: ({ data }) =>
			data.map(
				(genre): IOptions => ({
					label: genre.name,
					value: genre._id
				})
			),
		throwOnError: error => {
			toastrError(error, 'Genre list on movie')
			return true
		}
	})

	return queryData
}
