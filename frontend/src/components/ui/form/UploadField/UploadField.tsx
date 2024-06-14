// import cn from 'clsx'
// import Image from 'next/image'
// import { CSSProperties, FC } from 'react'
// import { FieldError } from 'react-hook-form'

// import SkeletonLoader from '../../skeleton-loader/SkeletonLoader'

// import styles from './UploadField.module.scss'
// import { useUpload } from './useUpload'

// export interface IUploadField {
// 	folder?: string
// 	images?: string[]
// 	onChange: (...event: any[]) => void
// 	placeholder: string
// 	error?: FieldError
// 	style?: CSSProperties
// }

// const UploadField: FC<IUploadField> = ({
// 	placeholder,
// 	error,
// 	style,
// 	images,
// 	folder,
// 	onChange
// }) => {
// 	const { uploadImage, isLoading } = useUpload(onChange, images, folder)

// 	return (
// 		<div
// 			className={cn(styles.field, styles.uploadField)}
// 			style={style}
// 		>
// 			<div className={styles.uploadFlex}>
// 				<label htmlFor='file-input'>
// 					<img src='https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png' />
// 				</label>
// 				<input
// 					className='hidden'
// 					id='file-input'
// 					type='file'
// 					onChange={uploadImage}
// 				/>
// 				<div className={styles.uploadImageContainer}>
// 					{isLoading ? (
// 						<SkeletonLoader
// 							count={1}
// 							className='w-full h-full'
// 						/>
// 					) : (
// 						images &&
// 						images.map(image => (
// 							<Image
// 								src={image}
// 								alt=''
// 								layout='fill'
// 							/>
// 						))
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default UploadField
