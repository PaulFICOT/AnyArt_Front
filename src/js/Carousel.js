import Thumbnail from './Thumbnail';

export default function Carousel(props) {
	const { images, onClick } = props;

	return (
		<div
			className="uk-position-relative uk-visible-toggle uk-light"
			data-uk-slider
		>
			<button data-uk-slidenav-next data-uk-slider-item="previous"></button>
			<ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
				{images.map((x, i) => (
					<li key={i}>
						<Thumbnail handleClick={onClick} src={x} />
					</li>
				))}
			</ul>
			<button data-uk-slidenav-previous data-uk-slider-item="previous"></button>
			<ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
		</div>
	);
}
