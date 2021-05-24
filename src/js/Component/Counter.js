import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Component that shows a counter with a icon
 */
export default function Counter(props) {
	const { icon, count, solid, onClickCallback } = props;
	const style = {
		cursor: onClickCallback == null ? 'default' : 'pointer',
	};

	return (
		<>
			<span onClick={onClickCallback} style={style}>
				<FontAwesomeIcon icon={[solid ? 'fas' : 'far', icon]} />
			</span>
			<span className="uk-margin-small-left">{count}</span>
		</>
	);
}
