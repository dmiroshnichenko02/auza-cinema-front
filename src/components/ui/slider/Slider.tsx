import { FC } from 'react'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

import { CSSTransition } from 'react-transition-group'
import SliderItem from './SlideItem'
import styles from './Slider.module.scss'
import SlideArrow from './slideArrow/SlideArrow'

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleArrowClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow
					variant='left'
					clickHandler={() => handleArrowClick('prev')}
				/>
			)}

			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames='slide-animation'
				unmountOnExit
			>
				<SliderItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isNext && (
				<SlideArrow
					variant='right'
					clickHandler={() => handleArrowClick('next')}
				/>
			)}
		</div>
	)
}

export default Slider
