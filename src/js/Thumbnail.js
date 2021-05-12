export default function Thumbnail(props) {
	return (
		<img
			className="uk-thumbnav uk-height-1-1"
			onClick={() => props.handleClick(props.src)}
			src={props.src}
			style={{
				borderRadius: props.rounded ? '50%' : '0',
				width: '100%',
				objectFit: 'cover',
			}}
			alt=""
		/>
	);
}
