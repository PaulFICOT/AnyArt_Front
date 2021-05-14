import { useRef, useEffect } from 'react';

import Carousel from './Carousel';

export default function Viewer(props) {
	const { pictures } = props;

	useEffect(() => setMain(pictures[0]));

	const main = useRef(null);

	function setMain(src) {
		main.current.src = src;
	}

	return (
		<div>
			<div>
				<img ref={main} alt="" />
			</div>
			<Carousel images={pictures} onClick={setMain} />
		</div>
	);
}
