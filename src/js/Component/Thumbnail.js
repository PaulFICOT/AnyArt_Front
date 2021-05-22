export default function Thumbnail(props) {
	const src = 'https://source.unsplash.com/' + props.src + '/800x800';
	const width = props.width ?? 'auto';
	const height = props.height ?? 'auto';

	return (
		<img
			className={
				'uk-thumbnav uk-margin-left ' +
				(props.rounded ? 'uk-border-circle' : 'uk-height-1-1')
			}
			onClick={props.handleClick ? () => props.handleClick(src) : null}
			src={src}
			style={{
				width: !props.rounded ? '100%' : '',
				objectFit: 'cover',
			}}
			alt={src}
			width={width}
			height={height}
		/>
	);
}
