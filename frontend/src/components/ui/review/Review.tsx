import Image from 'next/image'

import { IReview } from '@/types/reviews.types'

import { formatDate } from '@/utils/format-date'

import { Score } from '../score/Score'

import styles from './Review.module.scss'

export function Review({ review }: { review: IReview }) {
	return (
		<div className={styles.review}>
			<div className={styles.main}>
				<div className={styles.author}>
					<div className={styles.avatar}>
						<Image
							alt=''
							src={review.owner.avatar}
							fill
						/>
					</div>
					<div>
						<div className={styles.name}>{review.owner.name}</div>
						<div className={styles.date}>{formatDate(review.createdAt)}</div>
					</div>
				</div>
				<Score
					score={review.score}
					className={styles.score}
				/>
			</div>
			<div className={styles.comment}>{review.comment}</div>
		</div>
	)
}
