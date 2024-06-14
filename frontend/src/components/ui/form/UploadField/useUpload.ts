import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { validImageTypes } from '@/config/config'

import { FileService } from '@/services/file/file.service'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string,
	images?: string[]
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder, images) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.upload(data, folder),
		onSuccess({ data }) {
			if (!images) {
				onChange(data[0].url)
			} else {
				onChange(images.push(data[0].url))
			}
		},
		onError(error: unknown) {
			if (error instanceof AxiosError)
				if (error?.response?.data?.message)
					toast.error(error.response.data.message)
		}
	})

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				if (!validImageTypes.includes(files[0].type)) {
					setIsLoading(false)
					toast.error('Unsupported image type')
				} else {
					const formData = new FormData()
					formData.append('image', files[0])
					await mutateAsync(formData)
					setIsLoading(false)
				}
			} else {
				setIsLoading(false)
			}
		},
		[mutateAsync]
	)

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading])
}
