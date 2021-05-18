import { Link } from 'react-router-dom';
import CommentReply from './CommentReply';
import { useState } from 'react';

export default function Comment(props) {
	const { id, date, userId, username, userPic, content } = props.comment;
	const postId = props.postId;
	const updateTrigger = props.updateTrigger;

	const utcDate = new Date(date);
	const realDate = new Date(
		Date.UTC(
			utcDate.getFullYear(),
			utcDate.getMonth(),
			utcDate.getDate(),
			utcDate.getHours(),
			utcDate.getMinutes()
		)
	).toLocaleString();

	const [reply, setReply] = useState(false);

	function customUpdateTrigger() {
		updateTrigger();
		switchReply();
	}

	function switchReply() {
		setReply(!reply);
	}

	return (
		<>
			<article className="uk-comment">
				<header className="uk-comment-header">
					<div className="uk-grid-medium uk-flex-middle" data-uk-grid>
						<div className="uk-width-auto">
							<Link to={'/user/' + userId}>
								<img
									className="uk-comment-avatar"
									src={'https://source.unsplash.com/' + userPic + '/800x800'}
									width="40"
									height="40"
									alt=""
								/>
							</Link>
						</div>
						<div className="uk-width-expand">
							<h4 className="uk-comment-title uk-margin-remove">
								<Link className="uk-link-reset" to={'/user/' + userId}>
									{username}
								</Link>
							</h4>
							<ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
								<li>{realDate}</li>
								<li>
									<button
										className="uk-button uk-button-text"
										onClick={switchReply}
									>
										Reply
									</button>
								</li>
							</ul>
						</div>
					</div>
				</header>
				<div className="uk-comment-body">
					<p>{content}</p>
				</div>
			</article>
			{reply ? (
				<CommentReply
					postId={postId}
					replyTo={id}
					updateTrigger={customUpdateTrigger}
				/>
			) : (
				''
			)}
		</>
	);
}
