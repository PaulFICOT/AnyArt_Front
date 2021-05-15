export default function Comment(props) {
	const {
		id,
		date,
		userId,
		username,
		userPic,
		replyTo,
		content,
		responses,
	} = props.comment;

	const utcDate = new Date('2021-01-01 10:10:10');
	const realDate = new Date(
		Date.UTC(
			utcDate.getFullYear(),
			utcDate.getMonth(),
			utcDate.getDate(),
			utcDate.getHours(),
			utcDate.getMinutes()
		)
	).toLocaleString();

	return (
		<article className="uk-comment">
			<header className="uk-comment-header">
				<div className="uk-grid-medium uk-flex-middle" data-uk-grid>
					<div className="uk-width-auto">
						<img
							className="uk-comment-avatar"
							src={userPic}
							width="40"
							height="40"
							alt=""
						/>
					</div>
					<div className="uk-width-expand">
						<h4 className="uk-comment-title uk-margin-remove">
							<a className="uk-link-reset" href="#a">
								{username}
							</a>
						</h4>
						<ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
							<li>{realDate}</li>
							<li>
								<a href="#a">Reply</a>
							</li>
						</ul>
					</div>
				</div>
			</header>
			<div className="uk-comment-body">
				<p>{content}</p>
			</div>
		</article>
	);
}
