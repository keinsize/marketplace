import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = ({ className, ...rest }: SkeletonProps) => {
	return (
		<Skeleton
			{...rest}
			baseColor='#2E2E2E'
			highlightColor='#4E4E4E'
			className={className}
		/>
	)
}

export default SkeletonLoader
