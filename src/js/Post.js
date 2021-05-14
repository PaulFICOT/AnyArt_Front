import Viewer from './Viewer';
import Page from './Page';
import Thumbnail from './Thumbnail';
import Counter from './Counter';
import PostRequests from './HttpRequests/PostRequests';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';

export default function Post(props) {
	const { postId } = props;

	const [post, setPost] = useState({
		userId: 0,
		title: 'TITLE',
		artistPic: 'images/placeholder.png',
		artistName: 'ARTIST',
		artistIsVerified: false,
		artistJob: 'JOB',
		openToWork: false,
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
				userId: result.user_id,
				title: result.title,
				artistPic: '',
				artistName: result.username,
				artistIsVerified: result.is_verified,
				artistJob: result.job_function,
				openToWork: result.open_to_work,
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
			setComments(
				response
					.map(x => {
						return {
							id: x.comment_id,
							date: x.crea_date,
							userId: x.user_id,
							username: x.username,
							userPic: x.url,
							replyTo: x.reply_to,
							content: x.content,
						};
					})
					.sort((x, y) => x.date > y.date)
			);
		});
	}, [postId]);

	return (
		<Page>
			<div data-uk-grid>
				<div
					className="uk-width-1-2"
					data-uk-height-viewport="offset-top: true; offset-bottom: true"
				>
					<Viewer pictures={pictures} />
				</div>
				<div className="uk-width-1-2 uk-light">
					<h2>{post.title}</h2>
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
						<div>
							{comments.map((x, i) => (
								<Comment key={i} comment={x} />
							))}
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}
