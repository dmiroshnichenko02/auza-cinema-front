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
import { stripHtml } from 'string-strip-html'

import dynamic from 'next/dynamic'
import formStyles from '../../ui/formElements/adminForm.module.scss'
import { IMovieEditInput } from './movie-edit.interface'
import { useMovieEdit } from './useMovieEdit'

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/formElements/TextEditor'),
	{ ssr: false }
)

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

	return (
		<>
			<AdminNavigation />
			<Heading title='Edit genre' />
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
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
								/>
							</div>

							<Field
								{...register('icon', { required: 'Icon is required' })}
								placeholder='Icon'
								error={errors}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name='description'
							control={control}
							defaultValue=''
							render={({
								field: { value, onChange },
								fieldState: { error }
							}) => {
								return (
									<DynamicTextEditor
										onChange={onChange}
										value={value}
										error={error}
										placeholder='Description'
									/>
								)
							}}
							rules={{
								validate: {
									require: value => {
										return (
											(value && stripHtml(value).result.length > 0) ||
											'Description is required'
										)
									}
								}
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default MovieEdit
