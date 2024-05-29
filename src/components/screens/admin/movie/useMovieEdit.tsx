'use client'
import { getAdminUrl } from '@/configs/url.config'
import { MovieService } from '@/services/movie.service'
import { getKeys } from '@/utils/getKeys'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IMovieEditInput } from './movie-edit.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const router = useRouter()
	const pathname = usePathname()

	const id = String(pathname.split('/')[pathname.split('/').length - 1])

	const { isLoading } = useQuery({
		queryKey: ['movie', id],
		queryFn: () => MovieService.getById(id),
		select: ({ data }) => {
			getKeys(data).forEach(key => {
				setValue(key, data[key])
			})
		},
		throwOnError: error => {
			toastrError(error, 'Movie edit')
			return true
		},
		enabled: !!id
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update movie'],
		mutationFn: (data: IMovieEditInput) => MovieService.updateMovie(id, data),
		throwOnError: error => {
			toastrError(error, 'Movie edit')
			return true
		},
		onSuccess: () => {
			toastr.success('Movie edit', 'update was successful')
			router.push(getAdminUrl('movies'))
		}
	})

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
