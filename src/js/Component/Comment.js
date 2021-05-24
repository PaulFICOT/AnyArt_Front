import { Link } from 'react-router-dom';
import CommentReply from './CommentReply';
import { useContext, useState } from 'react';
import Thumbnail from './Thumbnail';
import HttpClient from '../HttpRequests/HttpClient';
import AuthContext from '../Authentification/AuthContext';

/**
 * Component that shows a comment for a post
 */
export default function Comment(props) {
	const { id, date, userId, username, userPic, content } = props.comment;
	const postId = props.postId;
	const updateTrigger = props.updateTrigger;

	const utcDate = new Date(date);

	const [reply, setReply] = useState(false);
	const isLogin = useContext(AuthContext).isLogin;

	/**
	 * Hide the form to respond when the user has responded
	 */
	function customUpdateTrigger() {
		updateTrigger();
		switchReply();
	}

	/**
	 * Show or hide form to reply to the comment
	 */
	function switchReply() {
		setReply(!reply);
	}

	return (
		<>
			<article className="uk-comment">
				<header className="uk-comment-header">
					<div className="uk-grid-medium uk-flex-middle" data-uk-grid>
						<div className="uk-comment-avatar">
							<Link to={'/profils/' + userId}>
								<Thumbnail
									src={
										userPic != null
											? HttpClient.imageUrl(userPic)
											: '/images/user_avatar.png'
									}
									width="60px"
									height="60px"
									rounded
								/>
							</Link>
						</div>
						<div className="uk-width-expand">
							<h4 className="uk-comment-title uk-margin-remove">
								<Link className="uk-link-reset" to={'/profils/' + userId}>
									{username}
								</Link>
							</h4>
							<ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
								<li>{utcDate.toUTCString()}</li>
								{isLogin ? (
									<li>
										<button
											className="uk-button uk-button-text"
											onClick={switchReply}
										>
											Reply
										</button>
									</li>
								) : (
									''
								)}
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
