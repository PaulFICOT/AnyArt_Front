import Viewer from './Viewer';
import Page from './Page';
import Thumbnail from './Thumbnail';
import Counter from './Counter';

export default function Creation(props) {
	const {
		title,
		artist,
		artistPic,
		description,
		nbViews,
		nbLikes,
		liked,
	} = props;
	return (
		<Page>
			<div data-uk-grid>
				<div className="uk-width-1-2">
					<Viewer />
				</div>
				<div className="uk-width-1-2">
					<h3>{title || 'TITLE'}</h3>
					<div data-uk-grid>
						<div className="uk-width-1-6 uk-padding-small uk-padding-remove-vertical" >
							<Thumbnail src={artistPic || 'images/user_avatar.png'} rounded/>
						</div>
						<div className="uk-width-1-2">
							<h4>{artist || 'ARTIST'}</h4>
							<p>{description || 'DESCRIPTION'}</p>
						</div>
						<div className="uk-width-1-3" data-uk-grid>
							<div className="uk-width-1-2 uk-padding-remove">
								<Counter icon="fa-eye" count={nbViews} />
							</div>
							<div className="uk-width-1-2 uk-padding-remove">
								<Counter icon="fa-thumbs-up" count={nbLikes} solid={liked} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}
