import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FcShop } from 'react-icons/fc'
import { toast } from 'react-toastify'

import Field from '@/components/ui/form/field/Field'

import { IShopEdit } from '@/types/shop.types'

import { useProfile } from '@/hooks/useProfile'

import styles from './Shop.module.scss'
import { ShopsService } from '@/services/shops/shops.service'

export interface IHeader {
	shop: { ownerId: string; name: string; id: string }
}

export function Header({ shop }: IHeader) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		getValues
	} = useForm<IShopEdit>({
		defaultValues: { name: shop.name }
	})
	const { profile } = useProfile()
	const [changingName, setChangingName] = useState(false)
	const { replace } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['shop', shop.id],
		mutationFn: (data: IShopEdit) => ShopsService.createOrUpdate(data),
		onSuccess(res) {
			replace(res.data.slug)
			setChangingName(false)
		},
		onError(error: unknown) {
			if (error instanceof AxiosError)
				if (error?.response?.data?.message)
					toast.error(error.response.data.message)
		}
	})

	const changeName: SubmitHandler<IShopEdit> = data => {
		mutate(data)
	}

	return (
		<div className={styles.header}>
			<FcShop />
			{shop.ownerId === profile?.id ? (
				changingName ? (
					<form onSubmit={handleSubmit(changeName)}>
						<Field
							className={styles.name}
							{...register('name', {
								required: 'Name is required!',
								minLength: {
									message: 'The store name must contain at least 3 characters',
									value: 3
								}
							})}
							error={errors.name}
						/>
						<button type='submit'>Save</button>
						<button onClick={() => setChangingName(false)}>Cancel</button>
					</form>
				) : (
					<>
						<span className={styles.name}>{shop.name}</span>
						<button onClick={() => setChangingName(true)}>Change name</button>
					</>
				)
			) : (
				<span className={styles.name}>{shop.name}</span>
			)}
		</div>
	)
}
