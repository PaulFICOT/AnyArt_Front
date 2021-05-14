export default function Counter(props) {
	const { icon, count, solidStyle } = props;
	return (
		<>
			<i className={(solidStyle ? 'fas ' : 'far ') + icon} />
			<span className="uk-margin-small-left">{count || 'XX'}</span>
		</>
	);
}
