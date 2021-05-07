import Carousel from './Carousel';
import Page from './Page';

export default function Viewer() {
	const test = [
		'/images/placeholder.png',
		'/images/placeholder.png',
		'/images/placeholder.png',
		'/images/placeholder.png',
	];
	return (
		<Page>
			<img src="/images/placeholder.png" />
			<Carousel images={test} />
		</Page>
	);
}
