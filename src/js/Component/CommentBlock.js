import Comment from './Comment';
import CommentReply from './CommentReply';

export default function CommentBlock(props) {
	const { comments, postId, updateTrigger } = props;

	function generateComment(comment, index) {
		return (
			<li key={index}>
				<Comment
					comment={comment}
					postId={postId}
					updateTrigger={updateTrigger}
				/>
				{comment.responses.length !== null ? (
					<ul>{comment.responses.map((x, i) => generateComment(x, i))}</ul>
				) : (
					''
				)}
			</li>
		);
	}

	return (
		<>
			<ul className="uk-comment-list">
				{comments.map((x, i) => generateComment(x, i))}
			</ul>
			<CommentReply
				postId={postId}
				replyTo={null}
				updateTrigger={updateTrigger}
			/>
		</>
	);
}
