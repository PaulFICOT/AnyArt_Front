export default function Thumbnail(props) {
	return (
		<img className="uk-thumbnav" onClick={props.handleClick} src={props.src} />
	);
}
