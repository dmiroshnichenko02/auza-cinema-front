import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					src={slide.bigPoster}
					alt={slide.title}
					layout='fill'
					priority
					unoptimized
					draggable={false}
					className={styles.image}
				/>
			)}
			<div className={styles.content}>
				<h2 className={styles.heading}>{slide.title}</h2>
				<h2 className={styles.subHeading}>{slide.subTitle}</h2>
				<button className={styles.button} onClick={() => push(slide.link)}>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SlideItem
