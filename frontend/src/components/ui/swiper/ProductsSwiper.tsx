'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import 'swiper/scss/free-mode'
import 'swiper/scss/navigation'
import 'swiper/scss/thumbs'

import { IProduct } from '@/types/product.types'

import styles from './ProductsSwiper.module.scss'

import 'swiper/scss'

export function ProductsSwiper({
	product,
	className
}: {
	product: IProduct
	className?: string
}) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

	return (
		<div className={cn(styles.swiper, className)}>
			<Swiper
				onSwiper={swiper => setThumbsSwiper(swiper)}
				direction='vertical'
				slidesPerView={5.5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles.gallery}
			>
				{product.images.map(image => (
					<SwiperSlide
						className={styles.slide}
						key={image}
					>
						<Image
							src={image}
							alt=''
							width={80}
							height={80}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				thumbs={{
					swiper: thumbsSwiper,
					slideThumbActiveClass: styles.slideActive
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles.main}
				spaceBetween={20}
			>
				{product.images.map(image => (
					<SwiperSlide
						className={styles.slide}
						key={image}
					>
						<Image
							src={image}
							alt=''
							width={500}
							height={500}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
