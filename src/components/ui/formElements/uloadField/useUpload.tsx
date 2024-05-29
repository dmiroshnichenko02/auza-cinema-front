'use client'
import { FileService } from '@/services/file.service'
import { toastrError } from '@/utils/toastrError'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.upload(data, folder),
		onSuccess: ({ data }) => {
			onChange(data[0].url)
		},
		throwOnError: error => {
			toastrError(error, 'Upload file')
			return true
		}
	})

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files

			if (!files?.length) return

			const formData = new FormData()
			formData.append('file', files[0])

			await mutateAsync(formData)

			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadFile, isLoading }), [uploadFile, isLoading])
}
