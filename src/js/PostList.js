import React from 'react';
import Thumbnail from './Thumbnail';

export default function PostList(props) {

	return (
        <div className="uk-grid-row-medium uk-child-width-1-5" data-uk-grid>
            {props.posts.map(post => (
                <div key={post.post_id}><Thumbnail src={post.url} /></div>
            ))}
        </div>
	);
}
