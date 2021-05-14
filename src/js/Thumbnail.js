export default function Thumbnail(props) {
	return (
		<img
			className={"uk-thumbnav uk-margin-left " + (props.rounded ? "uk-border-circle" : "uk-height-1-1")}
			onClick={props.handleClick ? (() => props.handleClick(props.src)) : null}
			src={props.src}
			style={{
				width: !props.rounded ? '100%' : '',
				objectFit: 'cover',
			}}
			alt={props.src}
		/>
	);
}
