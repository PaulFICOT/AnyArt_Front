export default function Thumbnail(props) {
	const width = props.width ?? 'auto';
	const height = props.height ?? 'auto';

	return (
		<img
			className={
				'uk-thumbnav uk-margin-left ' +
				(props.rounded ? 'uk-border-circle' : 'uk-height-1-1')
			}
			onClick={
				props.handleClick ? () => props.handleClick(props.original) : null
			}
			src={(props.src ? props.src + (props.version ? `?v=${props.version}` : '') : null)}
			style={{
				width: !props.rounded ? '100%' : '',
				objectFit: 'cover',
			}}
			alt={props.src}
			ref={props.reference ?? null}
			width={width}
			height={height}
		/>
	);
}
