import { useEffect, useState } from 'react';

import Carousel from './Carousel';

/**
 * Component that shows a main image and a carousel of post images
 */
export default function Viewer(props) {
	const { pictures } = props;
	const [mainPic, setMainPic] = useState('');

	/**
	 * Set the main image
	 */
	useEffect(() => {
		if (pictures.length > 0) {
			setMainPic(pictures[0].original);
		}
	}, [pictures]);

	return (
		<div>
			<div>
				<img alt="" src={mainPic} />
			</div>
			{pictures.length > 1 ? (
				<Carousel images={pictures} setMainPic={setMainPic} />
			) : (
				''
			)}
		</div>
	);
}
