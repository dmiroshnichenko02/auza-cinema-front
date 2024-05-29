'use client'

import { ITableItem } from '@/components/ui/adminTabel/admin-table.interface'
import { getAdminUrl } from '@/configs/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'
import { UserService } from '@/services/user.service'
import { getGenresList } from '@/utils/movie/getGenresList'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const { push } = useRouter()

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['movies list', debouncedSearch],
		queryFn: () => MovieService.getAll(debouncedSearch),
		select: ({ data }) =>
			data.map((movie): ITableItem => {
				return {
					_id: movie._id,
					editUrl: getAdminUrl('movies/edit/' + movie._id),
					items: [
						movie.title,
						getGenresList(movie.genres),
						String(movie.rating)
					]
				}
			}),
		throwOnError: error => {
			toastrError(error, 'Movies list')
			return true
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete movie', debouncedSearch],
		mutationFn: (userId: string) => UserService.deleteUser(userId),
		throwOnError: error => {
			toastrError(error, 'Delete movie')
			return true
		},
		onSuccess: () => {
			toastr.success('Delete movie', 'delete was successful')
			queryData.refetch()
		}
	})

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create movie', debouncedSearch],
		mutationFn: () => MovieService.createMovie(),
		throwOnError: error => {
			toastrError(error, 'Create movie')
			return true
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create movie', 'create was successful')
			push(getAdminUrl(`movies/edit/${_id}`))
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
