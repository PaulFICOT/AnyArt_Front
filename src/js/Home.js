import Page from './Page';
import Thumbnail from './Thumbnail';
import React, { useState, useEffect } from 'react';
import 'src/css/home.css';

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

		return () => mounted = false;
	}

	useEffect(fetchPosts, [setPosts]);

	return (
		<Page>
			<div className="uk-grid-row-medium uk-child-width-1-5 filters" data-uk-grid>
				<div><span><i className="far fa-compass"></i> Discover</span></div>
				<div><span><i className="fas fa-hourglass-end"></i> New posts</span></div>
				<div><span><i className="fas fa-fire"></i> Hottest</span></div>
				<div><span><i className="fas fa-chart-line"></i> Raising</span></div>
				<div><span className="uk-flex-right"><i className="fas fa-angle-down"></i> Filter</span></div>
			</div>
			<div className="uk-grid-row-medium uk-child-width-1-5" data-uk-grid>
				{posts.map(post => (
					<div key={post.post_id}><Thumbnail src={post.url} /></div>
				))}
			</div>
		</Page>
	);
}
