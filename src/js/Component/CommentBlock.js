import Comment from './Comment';
import CommentReply from './CommentReply';
import { useContext } from 'react';
import AuthContext from '../Authentification/AuthContext';

/**
 * Component that shows the comment and the block to post a comment for a post
 */
export default function CommentBlock(props) {
	const { comments, postId, updateTrigger } = props;
	const isLogin = useContext(AuthContext).isLogin;

	/**
	 * Generate the DOM for the comment of the post
	 * @param {*} comment The comment object
	 * @param {*} index The id of the comment
	 * @returns The DOM of this comment
	 */
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
			{isLogin ? (
				<CommentReply
					postId={postId}
					replyTo={null}
					updateTrigger={updateTrigger}
				/>
			) : (
				''
			)}
		</>
	);
}
