'use client'

import Gallery from '@/components/ui/gallery/Gallery'
import Heading from '@/components/ui/heading/Heading'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'
import { FC } from 'react'
import { IHome } from './home.interface'

export const metadata = {
	title: 'Watch movies online',
	description: 'Watch movies online'
}

const HomePage: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<>
			<Heading
				title='Watch movies online'
				className='text-gray-300 mb-8 text-xl'
			/>

			{slides.length && <Slider slides={slides} />}
			<div className='my-10'>
				<SubHeading title='Trending Now' />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>
			<div>
				<SubHeading title='Best Actors' />
				{actors.length && <Gallery items={actors} />}
			</div>
		</>
	)
}

export default HomePage
