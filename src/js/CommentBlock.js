import Comment from './Comment';

export default function CommentBlock(props) {
	const { comments } = props;

	function generateComment(comment, index) {
		return (
			<li key={index}>
				<Comment comment={comment} />
				{comment.responses.length !== null ? (
					<ul>{comment.responses.map((x, i) => generateComment(x, i))}</ul>
				) : (
					''
				)}
			</li>
		);
	}

	return (
		<ul className="uk-comment-list uk-overflow-auto">
			{comments.map((x, i) => generateComment(x, i))}
		</ul>
	);
}
