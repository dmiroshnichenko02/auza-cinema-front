'use client'

import { ITableItem } from '@/components/ui/adminTabel/admin-table.interface'
import { getAdminUrl } from '@/configs/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { ActorService } from '@/services/actor.service'
import { UserService } from '@/services/user.service'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const { push } = useRouter()

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['actors list', debouncedSearch],
		queryFn: () => ActorService.getAll(debouncedSearch),
		select: ({ data }) =>
			data.map((actor): ITableItem => {
				return {
					_id: actor._id,
					editUrl: getAdminUrl('actors/edit/' + actor._id),
					items: [actor.name, String(actor.countMovies)]
				}
			}),
		throwOnError: error => {
			toastrError(error, 'Actors list')
			return true
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete actor', debouncedSearch],
		mutationFn: (userId: string) => UserService.deleteUser(userId),
		throwOnError: error => {
			toastrError(error, 'Delete actor')
			return true
		},
		onSuccess: () => {
			toastr.success('Delete actor', 'delete was successful')
			queryData.refetch()
		}
	})

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create actor', debouncedSearch],
		mutationFn: () => ActorService.createActor(),
		throwOnError: error => {
			toastrError(error, 'Create actor')
			return true
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create actor', 'create was successful')
			push(getAdminUrl(`actors/edit/${_id}`))
		}
	})

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
