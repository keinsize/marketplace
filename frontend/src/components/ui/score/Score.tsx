import cn from 'clsx'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export function Score({
	score,
	className
}: {
	score: number
	className?: string
}) {
	score = Math.floor(score)

	return (
		<div className={cn('flex', className)}>
			{Array.from({ length: score }, (_, i) => (
				<span key={i}>
					<AiFillStar color='FFB800' />
				</span>
			))}
			{Array.from({ length: 5 - score }, (_, i) => (
				<span key={i}>
					<AiOutlineStar color='FFB800' />
				</span>
			))}
		</div>
	)
}
