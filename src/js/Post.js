import Viewer from './Component/Viewer';
import Page from './Component/Page';
import Thumbnail from './Component/Thumbnail';
import Counter from './Component/Counter';
import PostRequests from './HttpRequests/PostRequests';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import CommentBlock from './Component/CommentBlock';
import AuthService from './Authentification/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HttpClient from './HttpRequests/HttpClient';
import AuthContext from './Authentification/AuthContext';

/**
 * Component that shows a post with all information
 */
export default function Post() {
	const { postId } = useParams();

	const [post, setPost] = useState({
		title: 'TITLE',
		userId: 0,
		artistName: 'ARTIST',
		artistIsVerified: false,
		artistJob: 'JOB',
		openToWork: false,
		artistPicId: null,
		content: 'CONTENT',
		nbViews: 0,
		isLiked: false,
		isDisliked: false,
	});
	const [opinions, setOpinions] = useState({
		likes: 0,
		dislikes: 0,
	});
	const [category, setCategory] = useState({ id: -1, name: '' });
	const [pictures, setPictures] = useState([]);
	const [tags, setTags] = useState([]);
	const [comments, setComments] = useState([]);
	const loggedUser = AuthService.getCurrentUser() ?? { user_id: -1 };
	const loginContext = useContext(AuthContext);
	const history = useHistory();

	/**
	 * Make date for SQL format
	 */
	function getSQLDate() {
		const date = new Date();
		return date.toISOString().substr(0, 19).replace('T', ' ');
	}

	/**
	 * Get all information of this post
	 */
	useEffect(() => {
		PostRequests.getById(postId, { user_id: loggedUser.user_id }).then(
			result => {
				setPost({
					title: result.title,
					userId: result.user_id,
					artistName: result.username,
					artistIsVerified: result.is_verified === '1',
					artistJob: result.job_function,
					openToWork: result.open_to_work === '1',
					artistPicId: result.picture_id,
					content: result.content,
					nbViews: result.view_count,
					isLiked: result.isLiked === '1',
					isDisliked: result.isDisliked === '1',
				});
				setOpinions({
					likes: result.likes,
					dislikes: result.dislikes,
				});
			}
		);

		PostRequests.getPicturesByPostId(postId).then(result => {
			if (!Array.isArray(result)) {
				return;
			}
			setPictures(
				result.map(x => {
					return {
						thumbnail: HttpClient.imageUrl(x.picture_id),
						original: HttpClient.imageUrl(x.thumb_of),
					};
				})
			);
		});

		PostRequests.getCategoriesById(postId).then(result =>
			setCategory({ id: result.category_id, name: result.category })
		);

		PostRequests.getTagsByPostId(postId).then(response =>
			setTags(
				response.map(x => {
					return { id: x.tag_id, name: x.tag };
				})
			)
		);

		PostRequests.getCommentsByPostId(postId).then(response => {
			const comments = response.map(x => {
				return {
					id: x.comment_id,
					date: x.crea_date,
					userId: x.user_id,
					username: x.username,
					userPic: x.picture_id,
					replyTo: x.reply_to,
					content: x.content,
					responses: [],
				};
			});
			comments
				.filter(x => x.replyTo != null)
				.forEach(x => comments.find(y => y.id === x.replyTo).responses.push(x));
			setComments(comments.filter(x => x.replyTo === null));
		});
	}, [postId, loggedUser.user_id]);

	/**
	 * Refresh the comments of the post
	 */
	function updateComments() {
		PostRequests.getCommentsByPostId(postId).then(response => {
			const comments = response.map(x => {
				return {
					id: x.comment_id,
					date: x.crea_date,
					userId: x.user_id,
					username: x.username,
					userPic: x.picture_id,
					replyTo: x.reply_to,
					content: x.content,
					responses: [],
				};
			});
			comments
				.filter(x => x.replyTo != null)
				.forEach(x => comments.find(y => y.id === x.replyTo).responses.push(x));
			setComments(comments.filter(x => x.replyTo === null));
		});
	}

	/**
	 * Like the post
	 */
	async function likePost() {
		await PostRequests.setOpinion(postId, {
			action: post.isDisliked ? 'switch' : 'like',
			user_id: loggedUser.user_id,
			crea_date: getSQLDate(),
		});
		const newPost = JSON.parse(JSON.stringify(post));
		newPost.isLiked = true;
		newPost.isDisliked = false;
		await setPost(newPost);
		updateOpinions();
	}

	/**
	 * Dislike the post
	 */
	async function dislikePost() {
		await PostRequests.setOpinion(postId, {
			action: post.isLiked ? 'switch' : 'dislike',
			user_id: loggedUser.user_id,
			crea_date: getSQLDate(),
		});
		const newPost = JSON.parse(JSON.stringify(post));
		newPost.isLiked = false;
		newPost.isDisliked = true;
		await setPost(newPost);
		updateOpinions();
	}

	/**
	 * Remove the like and the dislike
	 */
	async function cancelOpinion() {
		await PostRequests.setOpinion(postId, {
			action: 'remove',
			user_id: loggedUser.user_id,
		});
		const newPost = JSON.parse(JSON.stringify(post));
		newPost.isLiked = false;
		newPost.isDisliked = false;
		await setPost(newPost);
		updateOpinions();
	}

	/**
	 * Update the opinion (like / dislike)
	 */
	function updateOpinions() {
		PostRequests.getOpinion(postId).then(response => {
			setOpinions({
				likes: response.likes,
				dislikes: response.dislikes,
			});
		});
	}

	/**
	 * Remove the post
	 */
	function rmPost() {
		if (!loginContext.isLogin) {
			return;
		}
		PostRequests.rmPost(postId);
		history.push('/');
	}

	return (
		<Page>
			<div data-uk-grid>
				<div
					className="uk-width-1-2@l uk-width-1-1@s"
					data-uk-height-viewport="offset-top: true; offset-bottom: true"
				>
					<Viewer pictures={pictures} />
				</div>
				<div className="uk-width-1-2@l uk-width-1-1@s uk-light">
					<div className="uk-card uk-card-secondary uk-card-body">
						<h2 className="uk-margin-remove">
							{post.title}
							{post.userId === loggedUser.user_id ? (
								<button
									className="uk-align-right uk-button uk-button-danger"
									onClick={rmPost}
								>
									Delete
								</button>
							) : (
								''
							)}
						</h2>
						<Link to={'/category/' + category.id}>{category.name}</Link>
						<div data-uk-grid>
							<div className="uk-width-1-5@l uk-width-1-6@s">
								<Thumbnail
									src={
										post.artistPicId != null
											? HttpClient.imageUrl(post.artistPicId)
											: '/images/user_avatar.png'
									}
									rounded
								/>
							</div>
							<div className="uk-width-1-2">
								<Link to={`/profils/${post.userId}`}>
									<h3>
										{post.artistName}
										{post.artistIsVerified ? (
											<sup>
												<FontAwesomeIcon icon={['fas', 'check-circle']} />
											</sup>
										) : (
											''
										)}
									</h3>
								</Link>
								<p>
									{post.artistJob}
									{post.openToWork ? (
										<sup>
											<FontAwesomeIcon icon={['fas', 'briefcase']} />
										</sup>
									) : (
										''
									)}
								</p>
							</div>
							<div className="uk-width-1-3" data-uk-grid>
								<div className="uk-width-1-1 uk-padding-remove">
									<Counter icon="eye" count={post.nbViews} />
								</div>
								<div className="uk-width-1-2 uk-padding-remove">
									<Counter
										icon="thumbs-up"
										count={opinions.likes}
										solid={post.isLiked}
										onClickCallback={_event =>
											post.isLiked ? cancelOpinion() : likePost()
										}
									/>
								</div>
								<div className="uk-width-1-2 uk-padding-remove">
									<Counter
										icon="thumbs-down"
										count={opinions.dislikes}
										solid={post.isDisliked}
										onClickCallback={_event =>
											post.isDisliked ? cancelOpinion() : dislikePost()
										}
									/>
								</div>
							</div>
						</div>
						<p>{post.content}</p>
						<div>
							{tags.map((x, i) => (
								<span key={i} className="uk-label uk-margin-right">
									{x.name}
								</span>
							))}
						</div>
						<hr className="uk-grid-margin-small" />
						<div>
							<CommentBlock
								comments={comments}
								postId={postId}
								updateTrigger={updateComments}
							/>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}
