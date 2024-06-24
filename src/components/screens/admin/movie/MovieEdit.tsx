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
import { IMovieEditInput } from './movie-edit.interface'

import UploadFile from '@/components/ui/formElements/uloadField/UploadFile'
import dynamic from 'next/dynamic'
import formStyles from '../../../ui/formElements/adminForm.module.scss'
import { useAdminActor } from './useAdminActor'
import { useAdminGenre } from './useAdminGenre'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		setValue,
		register,
		control,
		formState: { errors },
		getValues
	} = useForm<IMovieEditInput>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { isLoading: isGenresLoading, data: genres } = useAdminGenre()
	const { isLoading: isActorsLoading, data: actors } = useAdminActor()

	return (
		<>
			<AdminNavigation />
			<Heading title='Edit movie' />
			{isLoading ? (
				<SkeletonLoader count={5} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Title is required!'
							})}
							placeholder='Title'
							error={errors.title}
						/>
						<SlugField
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
							register={register}
							error={errors.slug}
						/>
						<Field
							{...register('parameters.country', {
								required: 'Country is required!'
							})}
							placeholder='Country'
							error={errors.parameters?.country}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.duration', {
								required: 'Duration is required!'
							})}
							placeholder='Duration (min.)'
							error={errors.parameters?.duration}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.year', {
								required: 'Year is required!'
							})}
							placeholder='Year'
							error={errors.parameters?.year}
							style={{ width: '31%' }}
						/>

						<Controller
							name='genres'
							control={control}
							rules={{
								required: 'Please select at least one genre!'
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder='Genres'
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
								/>
							)}
						/>
						<Controller
							name='actors'
							control={control}
							rules={{
								required: 'Please select at least one actor!'
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder='Actors'
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
								/>
							)}
						/>

						<Controller
							name='poster'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadFile
									placeholder='Poster'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Poster is required!'
							}}
						/>

						<Controller
							name='bigPoster'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadFile
									placeholder='Big poster'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Big poster is required!'
							}}
						/>

						<Controller
							name='videoUrl'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => (
								<UploadFile
									placeholder='Video'
									error={error}
									folder='movies'
									value={value}
									onChange={onChange}
									style={{ marginTop: -25 }}
									isNoImage
								/>
							)}
							rules={{
								required: 'Video is required!'
							}}
						/>
					</div>

					<Button>Update</Button>
				</form>
			)}
		</>
	)
}

export default MovieEdit
