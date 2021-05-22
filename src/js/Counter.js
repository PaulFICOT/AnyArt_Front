export default function Counter(props) {
	const { icon, count, solid, onClickCallback } = props;

	return (
		<>
			{onClickCallback == null ? (
				<i className={(solid ? 'fas ' : 'far ') + icon} />
			) : (
				<span onClick={onClickCallback}>
					<i
						className={(solid ? 'fas ' : 'far ') + icon}
						style={{ cursor: 'pointer' }}
					/>
				</span>
			)}
			<span className="uk-margin-small-left">{count || 'XX'}</span>
		</>
	);
}
