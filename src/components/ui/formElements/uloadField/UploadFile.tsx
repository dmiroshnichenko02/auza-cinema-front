import { FC } from 'react'
import styles from '../Form.module.scss'
import { IUploadField } from '../form.interface'
import { useUpload } from './useUpload'

import cn from 'clsx'
import Image from 'next/image'
import SkeletonLoader from '../../SkeletonLoader'

const UploadFile: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	folder,
	value,
	isNoImage = false,
	style
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)
	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type='file' onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className='w-full h-full' />
						) : (
							value && <Image src={value} alt='' layout='fill' unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadFile
