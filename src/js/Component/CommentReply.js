import { useRef } from 'react';
import PostRequests from '../HttpRequests/PostRequests';
import AuthService from '../Authentification/AuthService';

export default function CommentReply(props) {
	const { postId, replyTo, updateTrigger } = props;

	const contentInput = useRef('');
	const formInput = useRef('');
	const loggedUser = AuthService.getCurrentUser();

	function getSQLDate() {
		const date = new Date();
		return date.toISOString().substr(0, 19).replace('T', ' ');
	}

	async function postNewComment(postId, event) {
		event.preventDefault();
		const messageContent = contentInput.current.value;

		await PostRequests.postComment(postId, {
			content: messageContent,
			crea_date: getSQLDate(),
			reply_to: replyTo,
			user_id: loggedUser.user_id,
		}).then(response => response);

		formInput.current.reset();
		updateTrigger();
	}

	return (
		<article className="uk-comment uk-margin">
			<div className="uk-comment-body">
				<form onSubmit={event => postNewComment(postId, event)} ref={formInput}>
					<textarea
						className="uk-textarea"
						rows="5"
						placeholder="Type your comment here"
						ref={contentInput}
					/>
					<input
						className="uk-button uk-button-small uk-align-right"
						type="submit"
						value="Reply"
					/>
				</form>
			</div>
		</article>
	);
}
