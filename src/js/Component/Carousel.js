import Thumbnail from './Thumbnail';

/**
 * Component that shows all images for a post
 */
export default function Carousel(props) {
	const { images, setMainPic } = props;

	return (
		<div className="uk-light uk-position-relative" data-uk-slider>
			<div className="uk-slider-container">
				<ul className="uk-slider-items uk-child-width-1-3 uk-grid">
					{images.map((x, i) => (
						<li key={i}>
							<Thumbnail
								setMainPic={setMainPic}
								src={x.thumbnail}
								original={x.original}
							/>
						</li>
					))}
				</ul>
			</div>
			{/*
			<button
				data-uk-slidenav-previous
				data-uk-slider-item="previous"
				className="uk-position-center-left-out uk-slidenav-large"
			/>
			<button
				data-uk-slidenav-next
				data-uk-slider-item="next"
				className="uk-position-center-right-out uk-slidenav-large"
			/>
			*/}
		</div>
	);
}
