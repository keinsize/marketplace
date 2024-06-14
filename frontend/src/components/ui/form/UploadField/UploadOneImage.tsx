import cn from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import { MdOutlinePhotoCamera } from 'react-icons/md'

import SkeletonLoader from '../../skeleton-loader/SkeletonLoader'

import styles from './UploadField.module.scss'
import { useUpload } from './useUpload'

export interface ReplaceField {
	image?: string
	folder?: string
	onChange: (...event: any[]) => void
	className?: string
}

const ReplaceField: FC<ReplaceField> = ({
	image,
	folder,
	onChange,
	className
}) => {
	const { uploadImage, isLoading } = useUpload(onChange, folder)

	return (
		<div className={cn(styles.container, className)}>
			{isLoading ? (
				<SkeletonLoader
					count={1}
					className='w-full h-full'
				/>
			) : (
				image && (
					<div className={styles.field}>
						<label htmlFor='file-input'>
							<MdOutlinePhotoCamera />
						</label>
						<input
							className='hidden'
							id='file-input'
							type='file'
							onChange={uploadImage}
						/>
						<Image
							unoptimized
							priority
							src={image}
							alt=''
							width={192}
							height={192}
						/>
					</div>
				)
			)}
		</div>
	)
}

export default ReplaceField
