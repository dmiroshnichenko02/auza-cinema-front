'use client'

import { ITableItem } from '@/components/ui/adminTabel/admin-table.interface'
import { getAdminUrl } from '@/configs/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { GenreService } from '@/services/genre.service'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const { push } = useRouter()

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['genres list', debouncedSearch],
		queryFn: () => GenreService.getAll(debouncedSearch),
		select: ({ data }) =>
			data.map((genre): ITableItem => {
				return {
					_id: genre._id,
					editUrl: getAdminUrl('genres/edit/' + genre._id),
					items: [genre.name, genre.slug]
				}
			}),
		throwOnError: error => {
			toastrError(error, 'Genres list')
			return true
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete genre', debouncedSearch],
		mutationFn: (genreId: string) => GenreService.deleteGenre(genreId),
		throwOnError: error => {
			toastrError(error, 'Delete genre')
			return true
		},
		onSuccess: () => {
			toastr.success('Delete genre', 'delete was successful')
			queryData.refetch()
		}
	})

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create genre', debouncedSearch],
		mutationFn: () => GenreService.createGenre(),
		throwOnError: error => {
			toastrError(error, 'Create genre')
			return true
		},
		onSuccess: ({ data: _id }) => {
			toastr.success('Create genre', 'create was successful')
			push(getAdminUrl(`genres/edit/${_id}`))
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
