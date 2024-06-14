'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/form/button/Button'
import Field from '@/components/ui/form/field/Field'

import { IAuthForm } from '@/types/auth.types'

import { validEmail } from '@/utils/regex'

import styles from './Auth.module.scss'
import { AuthService } from '@/services/auth/auth.service'

export function Auth() {
	const queryClient = useQueryClient()
	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IAuthForm>()
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => AuthService.main(type, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			reset()
			push('/')
		},
		onError(error: unknown) {
			if (error instanceof AxiosError)
				if (error?.response?.data?.message)
					toast.error(error.response.data.message)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Authorization</h1>

				<Field
					{...register('email', {
						required: 'Email is required!',
						pattern: {
							value: validEmail,
							message: 'Please enter a valid email'
						}
					})}
					placeholder='EMAIL'
					error={errors.email}
				/>
				<Field
					{...register('password', {
						required: 'Password is required!',
						minLength: {
							value: 8,
							message: 'The password must contain at least 8 characters'
						},
						pattern: {
							value: /^[^\s]+(?:$|.*[^\s]+$)/i,
							message: 'The entered value cannot start/end or contain a space'
						}
					})}
					placeholder='PASSWORD'
					type='password'
					error={errors.password}
				/>

				<div className={styles.buttons}>
					<Button
						type='submit'
						onClick={() => setType('login')}
					>
						Login
					</Button>
					<Button
						type='submit'
						onClick={() => setType('register')}
					>
						Register
					</Button>
				</div>
			</form>
		</div>
	)
}
