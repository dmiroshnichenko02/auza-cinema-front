'use client'
import { getAdminUrl } from '@/configs/url.config'
import { ActorService } from '@/services/actor.service'
import { getKeys } from '@/utils/getKeys'
import { toastrError } from '@/utils/toastrError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const router = useRouter()
	const pathname = usePathname()

	const id = String(pathname.split('/')[pathname.split('/').length - 1])

	const { isLoading } = useQuery({
		queryKey: ['actor', id],
		queryFn: () => ActorService.getById(id),
		select: ({ data }) => {
			getKeys(data).forEach(key => {
				setValue(key, data[key])
			})
		},
		throwOnError: error => {
			toastrError(error, 'Actor edit')
			return true
		},
		enabled: !!id
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update actor'],
		mutationFn: (data: IActorEditInput) => ActorService.updateActor(id, data),
		throwOnError: error => {
			toastrError(error, 'Actor edit')
			return true
		},
		onSuccess: () => {
			toastr.success('Actor edit', 'update was successful')
			router.push(getAdminUrl('actors'))
		}
	})

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
