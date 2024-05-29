'use client'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/adminNavigation/AdminNavigation'
import Button from '@/components/ui/formElements/Button'
import Field from '@/components/ui/formElements/Field'
import SlugField from '@/components/ui/formElements/slugField/SlugField'
import Heading from '@/components/ui/heading/Heading'
import generateSlug from '@/utils/string/generateSlug'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IActorEditInput } from './actor-edit.interface'

import UploadFile from '@/components/ui/formElements/uloadField/UploadFile'
import dynamic from 'next/dynamic'
import formStyles from '../../../ui/formElements/adminForm.module.scss'
import { useActorEdit } from './useActorEdit'

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/formElements/TextEditor'),
	{ ssr: false }
)

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		setValue,
		register,
		control,
		formState: { errors },
		getValues
	} = useForm<IActorEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<>
			<AdminNavigation />
			<Heading title='Edit actor' />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', { required: 'Name is required' })}
								placeholder='Name'
								error={errors}
							/>

							<div>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
								/>
							</div>
						</div>
						<Controller
							name='photo'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => {
								return (
									<UploadFile
										onChange={onChange}
										value={value}
										error={error}
										folder='actors'
										placeholder='Photo'
									/>
								)
							}}
							rules={{
								required: 'Photo is required'
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default ActorEdit
