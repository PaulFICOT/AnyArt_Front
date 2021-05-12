import { useRef, useEffect } from 'react';

import Carousel from './Carousel';

export default function Viewer() {
	const test = [
		'https://images.unsplash.com/photo-1588167056840-13caf6e4562a',
		'https://images.unsplash.com/photo-1599948058230-78896e742f7e',
		'https://images.unsplash.com/photo-1547146092-983100a60066',
		'https://images.unsplash.com/photo-1562824864-3d4044bd2770',
	];

	useEffect(() => setMain(test[0]));

	const main = useRef(null);

	function setMain(src) {
		main.current.src = src;
	}

	return (
		<div>
			<img ref={main} alt="" />
			<Carousel images={test} onClick={setMain} />
		</div>
	);
}
