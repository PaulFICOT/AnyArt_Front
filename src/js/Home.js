import Page from './Page';
import Thumbnail from './Component/Thumbnail';
import React, { useState, useEffect } from 'react';
import 'src/css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home(props) {
	const [posts, setPosts] = useState([]);

	function fetchPosts() {
		let mounted = true;
		fetch('http://localhost:8080/api/posts/thumbnails')
		.then(response => response.json())
		.then(data => {
			if (mounted) {
				setPosts(data);
			}
		});

		return () => (mounted = false);
	}

	useEffect(fetchPosts, [setPosts]);

	return (
		<Page>
			<div
				className="uk-grid-row-medium uk-child-width-1-5 filters"
				data-uk-grid
			>
				<div>
					<span>
						<FontAwesomeIcon icon={['far', 'compass']} /> Discover
					</span>
				</div>
				<div>
					<span>
						<FontAwesomeIcon icon={['fas', 'hourglass-end']} /> New posts
					</span>
				</div>
				<div>
					<span>
						<FontAwesomeIcon icon={['fas', 'fire']} /> Hottest
					</span>
				</div>
				<div>
					<span>
						<FontAwesomeIcon icon={['fas', 'chart-line']} /> Raising
					</span>
				</div>
				<div>
					<span className="uk-flex-right">
						<FontAwesomeIcon icon={['fas', 'angle-down']} /> Filter
					</span>
				</div>
			</div>
			<div className="uk-grid-row-medium uk-child-width-1-5" data-uk-grid>
				{posts.map(post => (
					<div key={post.post_id}>
						<Thumbnail src={post.url} />
					</div>
				))}
			</div>
		</Page>
	);
}
