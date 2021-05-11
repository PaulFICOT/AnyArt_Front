import Thumbnail from './Thumbnail';

export default function Carousel(props) {
	const { images, onClick } = props;

	return (
		<div
			className="uk-position-relative uk-visible-toggle uk-light"
			tabindex="-1"
			data-uk-slider
		>
			<a href="" data-uk-slidenav-next data-uk-slider-item="previous"></a>
			<a href="" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
			<ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
				{images.map((x, i) => (
					<li>
						<Thumbnail key={i} handleClick={onClick} src={x} />
					</li>
				))}
			</ul>
			<ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
		</div>
	);
}
