import { IOptions } from '@/components/ui/select/select.interface'
import { ActorService } from '@/services/actor.service'
import { toastrError } from '@/utils/toastrError'
import { useQuery } from '@tanstack/react-query'

export const useAdminActor = () => {
	const queryData = useQuery({
		queryKey: ['List of admin actor'],
		queryFn: () => ActorService.getAll(),
		select: ({ data }) =>
			data.map(
				(actor): IOptions => ({
					label: actor.name,
					value: actor._id
				})
			),
		throwOnError: error => {
			toastrError(error, 'Actor list on movie')
			return true
		}
	})

	return queryData
}
