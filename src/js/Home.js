import Page from './Page';
import PostRequests from './HttpRequests/PostRequests';
import React, { useState, useEffect, useContext } from 'react';
import AuthComponent from './Authentification/AuthComponent';
import AuthService from './Authentification/AuthService';
import AuthContext from './Authentification/AuthContext';
import CategoriesRequests from './HttpRequests/CategoriesRequests'
import Toggle from './Toggle'
import Thumbnail from './Component/Thumbnail';
import 'src/css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home(props) {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);

	const [xd, setxd] = useState({
		OpenToWork: false,
	});

	function getUserId() {
		if(AuthService.getCurrentUser()) {
			return AuthService.getCurrentUser().user_id;
		}
		else {
			return null;
		}
	}

	function fetchPosts() {
		if(getUserId()) {
			PostRequests.getThumbnailsDiscover(getUserId())
				.then(data => setPosts(data));
		}
		else {
		PostRequests.getThumbnailsUnlogged('unlogged')
			.then(data => setPosts(data));
		}
	}

	function fetchCategories() {

		CategoriesRequests.getAll()
			.then(data => setCategories(data));

	}

	function setToggle(id, isToggled) {
		let v = xd;
		v[id] = isToggled;
		setxd(v);
	}

	console.log(xd)

	let isLogged = useContext(AuthContext).isLogin;

	useEffect(fetchPosts, [setPosts, isLogged]);

	return (
		<Page>
			<div
				className="uk-grid-row-medium uk-child-width-1-5 filters"
				data-uk-grid
			>
				<AuthComponent login="false">
					<div><button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('unlogged').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><i className="far fa-compass"></i> Discover</span></button></div>
				</AuthComponent>
				<AuthComponent login="true">
					<div><button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsDiscover(getUserId()).then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><i className="far fa-compass"></i> Discover</span></button></div>
				</AuthComponent>
				<div><button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('newpost').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><i className="fas fa-hourglass-end"></i> New posts</span></button></div>
				<div><button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('hottest').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><i className="fas fa-fire"></i> Hottest</span></button></div>
				<div><button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('raising').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><i className="fas fa-chart-line"></i> Raising</span></button></div>
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
				<div data-uk-dropdown="mode:click">
					<ul className="uk-nav uk-dropdown-nav">
						<li className="uk-nav-header">Job</li>
							<Toggle id="OpenToWork" text="OpenToWork" xd={setToggle}/>
						<li className="uk-nav-header">Categories</li>
						{categories.map(category => (
							<Toggle key={category.category_id} id={category.category_id} text={category.category} xd={setxd}/>
						))}
					</ul>
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
