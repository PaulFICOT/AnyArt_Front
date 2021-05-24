/**
 * Component that shows an image with different characteristic
 */
export default function Thumbnail(props) {
	const {
		src,
		original,
		setMainPic,
		rounded,
		version,
		reference,
		width,
		height,
	} = props;

	return (
		<img
			className={
				'uk-thumbnav uk-margin-left ' +
				(rounded ? 'uk-border-circle' : 'uk-height-1-1')
			}
			onClick={setMainPic ? () => setMainPic(original) : null}
			src={src ? src + (version ? `?v=${version}` : '') : null}
			style={{
				width: !rounded ? '100%' : '',
				objectFit: 'cover',
				cursor: setMainPic ? 'pointer' : 'default',
			}}
			alt={src}
			ref={reference ?? null}
			width={width ?? 'auto'}
			height={height ?? 'auto'}
		/>
	);
}
