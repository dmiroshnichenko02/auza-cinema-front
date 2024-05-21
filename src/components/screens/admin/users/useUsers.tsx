'use client'

import { ITableItem } from '@/components/ui/adminTabel/admin-table.interface'
import { getAdminUrl } from '@/configs/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user.service'
import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery({
		queryKey: ['users list', debouncedSearch],
		queryFn: () => UserService.getAll(debouncedSearch),
		select: ({ data }) =>
			data.map((user): ITableItem => {
				return {
					_id: user._id,
					editUrl: getAdminUrl('users/edit/' + user._id),
					items: [user.email, convertMongoDate(user.createdAt)]
				}
			}),
		throwOnError: error => {
			toastrError(error, 'Users list')
			return true
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete user', debouncedSearch],
		mutationFn: (userId: string) => UserService.deleteUser(userId),
		throwOnError: error => {
			toastrError(error, 'Delete user')
			return true
		},
		onSuccess: () => {
			toastr.success('Delete user', 'delete was successful')
			queryData.refetch()
		}
	})

	console.log(searchTerm, queryData.data)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
