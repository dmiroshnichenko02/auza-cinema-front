'use client'
import { getAdminUrl } from '@/configs/url.config'
import { GenreService } from '@/services/genre.service'
import { getKeys } from '@/utils/getKeys'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IGenreEditInput } from './genre-edit.interface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const router = useRouter()
	const pathname = usePathname()

	const id = String(pathname.split('/')[pathname.split('/').length - 1])

	const { isLoading } = useQuery({
		queryKey: ['genre', id],
		queryFn: () => GenreService.getById(id),
		select: ({ data }) => {
			getKeys(data).forEach(key => {
				setValue(key, data[key])
			})
		},
		throwOnError: error => {
			toastrError(error, 'Genre edit')
			return true
		},
		enabled: !!id
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update genre'],
		mutationFn: (data: IGenreEditInput) => GenreService.updateGenre(id, data),
		throwOnError: error => {
			toastrError(error, 'Genre edit')
			return true
		},
		onSuccess: () => {
			toastr.success('Genre edit', 'update was successful')
			router.push(getAdminUrl('genres'))
		}
	})

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
