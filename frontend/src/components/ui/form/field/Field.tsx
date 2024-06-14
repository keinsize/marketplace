import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

import styles from './Field.module.scss'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', className, ...rest }, ref) => {
		return (
			<div className={cn(styles.field, className)}>
				<label>
					{placeholder && <span>{placeholder}</span>}
					<div className={styles.input}>
						<input
							ref={ref}
							type={type}
							{...rest}
						/>
						{error ? (
							<div
								className={styles.error}
								onClick={() => {
									toast.error(error.message?.toString())
								}}
							>
								<MdOutlineErrorOutline className={styles.error} />
							</div>
						) : (
							<div className='h-5 w-6' />
						)}
					</div>
				</label>
			</div>
		)
	}
)

export default Field
