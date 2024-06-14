'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FcShop } from 'react-icons/fc'
import { toast } from 'react-toastify'

import ReplaceField from '@/components/ui/form/UploadField/UploadOneImage'
import { Button } from '@/components/ui/form/button/Button'
import Field from '@/components/ui/form/field/Field'

import { IUserEdit } from '@/types/user.types'

import { useProfile } from '@/hooks/useProfile'

import { formatDate } from '@/utils/format-date'
import { validEmail } from '@/utils/regex'

import styles from './Profile.module.scss'
import { AuthService } from '@/services/auth/auth.service'
import { UsersService } from '@/services/users/users.service'

export function Profile() {
	const { push } = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue
	} = useForm<IUserEdit>()
	const { profile, isLoading } = useProfile()
	const queryClient = useQueryClient()

	const { mutate: update } = useMutation({
		mutationKey: ['edit profile'],
		mutationFn: (data: IUserEdit) => UsersService.updateProfile(data),
		onSuccess() {
			toast.success('Update was successful')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setValue('password', '')
		}
	})
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => {
			queryClient.resetQueries({ queryKey: ['profile'] })
			push('/')
		}
	})

	const onSubmit: SubmitHandler<IUserEdit> = data => {
		update(data)
	}

	useEffect(() => {
		if (profile && !isLoading) {
			setValue('address', profile.address)
			setValue('name', profile.name)
			setValue('email', profile.email)
		}
	}, [isLoading])

	return (
		profile && (
			<>
				<h1>{profile.name}'s profile</h1>
				<div className={styles.container}>
					<div className={styles.top}>
						<Controller
							name='avatar'
							control={control}
							defaultValue={profile.avatar}
							render={({ field: { value, onChange } }) => (
								<ReplaceField
									folder='avatars'
									image={value}
									onChange={onChange}
									className={styles.avatar}
								/>
							)}
						/>
						<div>
							<div className={styles.name}>{profile.name}</div>
							<p className={styles.info}>
								On the market since {formatDate(profile.createdAt)}
							</p>
							{profile.shop && (
								<div className={styles.shop}>
									<FcShop />
									<Link href={`/shops/${profile.shop.slug}`}>
										{profile.shop.name}
									</Link>
								</div>
							)}
						</div>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.fields}
					>
						<Field
							{...register('email', {
								required: 'Email is required!',
								pattern: {
									value: validEmail,
									message: 'Please enter a valid email'
								}
							})}
							placeholder='Email'
							error={errors.email}
							className={styles.field}
						/>
						<Field
							{...register('address', {})}
							placeholder='Address'
							className={styles.field}
						/>
						<Field
							{...register('password', {
								required: false,
								minLength: {
									value: 0 || 8,
									message: 'The password must contain at least 8 characters'
								},
								pattern: {
									value: /^[^\s]+(?:$|.*[^\s]+$)/i,
									message:
										'The entered value cannot start/end or contain a space'
								}
							})}
							placeholder='Password'
							type='password'
							error={errors.password}
							className={styles.field}
						/>

						<Button type='submit'>Save</Button>
					</form>
					<Button
						className={styles.logout}
						onClick={() => logout()}
					>
						Logout
					</Button>
				</div>
			</>
		)
	)
}
