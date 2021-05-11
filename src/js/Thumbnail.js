export default function Thumbnail(props) {
	return (
		<img
			className="uk-thumbnav"
			onClick={() => props.handleClick(props.src)}
			src={props.src}
			alt=""
		/>
	);
}
