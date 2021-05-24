import React from 'react';
import Thumbnail from './Thumbnail';
import HttpClient from '../HttpRequests/HttpClient';
import { Link } from 'react-router-dom';

/**
 * Component that shows all posts with their thumbnail and the link to go to the post
 */
export default function PostList(props) {

	return (
        <div className="uk-grid-row-medium uk-child-width-1-5" data-uk-grid>
            {props.posts.map(post => (
                <div key={post.post_id} ><Link to={`/post/${post.post_id}`}><Thumbnail src={HttpClient.imageUrl(post.picture_id)} /></Link></div>
            ))}
        </div>
	);
}
