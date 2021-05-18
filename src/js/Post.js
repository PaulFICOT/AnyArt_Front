import Viewer from './Viewer';
import Page from './Page';
import Thumbnail from './Thumbnail';
import Counter from './Counter';
import PostRequests from './HttpRequests/PostRequests';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentBlock from './CommentBlock';

export default function Post(props) {
	const { postId } = props;

	const [post, setPost] = useState({
		title: 'TITLE',
		userId: 0,
		artistName: 'ARTIST',
		artistIsVerified: false,
		artistJob: 'JOB',
		openToWork: false,
		artistPic: 'images/placeholder.png',
		content: 'CONTENT',
		nbViews: 0,
		nbLikes: 0,
		nbDislikes: 0,
	});
	const [category, setCategory] = useState({ id: -1, name: '' });
	const [pictures, setPictures] = useState([]);
	const [tags, setTags] = useState([]);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		PostRequests.getById(postId).then(result => {
			setPost({
				title: result.title,
				userId: result.user_id,
				artistName: result.username,
				artistIsVerified: result.is_verified,
				artistJob: result.job_function,
				openToWork: result.open_to_work,
				artistPic: result.url,
				content: result.content,
				nbViews: result.view_count,
				nbLikes: result.likes,
				nbDislikes: result.dislikes,
			});
		});

		PostRequests.getPicturesByPostId(postId).then(result =>
			setPictures(result.map(x => x.url))
		);

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
					userPic: x.url,
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
	}, [postId]);

	function updateComments() {
		PostRequests.getCommentsByPostId(postId).then(response => {
			const comments = response.map(x => {
				return {
					id: x.comment_id,
					date: x.crea_date,
					userId: x.user_id,
					username: x.username,
					userPic: x.url,
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

	function updateLikes() {}
	function updateDislikes() {}

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
						<h2 className="uk-margin-remove">{post.title}</h2>
						<Link to={'/category/' + category.id}>{category.name}</Link>
						<div data-uk-grid>
							<div className="uk-width-1-6">
								<Thumbnail src={post.artistPic} />
							</div>
							<div className="uk-width-1-2">
								{/*TODO: add link to user profile*/}
								<Link to={'/user/' + post.userId}>
									<h3>
										{post.artistName}
										{post.artistIsVerified ? (
											<sup>
												<i className="fas fa-check-circle" />
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
											<i className="fas fa-briefcase" />
										</sup>
									) : (
										''
									)}
								</p>
							</div>
							<div className="uk-width-1-3" data-uk-grid>
								<div className="uk-width-1-1 uk-padding-remove">
									<Counter icon="fa-eye" count={post.nbViews} />
								</div>
								<div className="uk-width-1-2 uk-padding-remove">
									<Counter
										icon="fa-thumbs-up"
										count={post.nbLikes}
										solid={false}
									/>
								</div>
								<div className="uk-width-1-2 uk-padding-remove">
									<Counter
										icon="fa-thumbs-down"
										count={post.nbDislikes}
										solid={false}
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
