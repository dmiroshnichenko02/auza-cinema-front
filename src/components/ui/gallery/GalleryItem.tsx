import { FC } from 'react'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			href={item.link}
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.vertical]: variant === 'vertical',
				[styles.horizontal]: variant === 'horizontal'
			})}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				layout='fill'
				draggable={false}
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<h2 className={styles.title}>{item.content.title}</h2>
					{item.content.subTitle && (
						<h4 className={styles.subTitle}>{item.content.subTitle}</h4>
					)}
				</div>
			)}
		</Link>
	)
}

export default GalleryItem
