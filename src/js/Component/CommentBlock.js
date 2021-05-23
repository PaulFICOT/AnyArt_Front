import Comment from './Comment';
import CommentReply from './CommentReply';
import AuthService from '../Authentification/AuthService';

export default function CommentBlock(props) {
	const { comments, postId, updateTrigger } = props;
	const loggedUser = AuthService.getCurrentUser();

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
			{comments.length === 0 && loggedUser != null ? (
				<CommentReply
					postId={postId}
					replyTo={null}
					updateTrigger={updateTrigger}
				/>
			) : (
				''
			)}
			<ul className="uk-comment-list uk-overflow-auto">
				{comments.map((x, i) => generateComment(x, i))}
			</ul>
		</>
	);
}
