import Page from './Page';
import PostRequests from './HttpRequests/PostRequests';
import React, { useState, useEffect, useContext } from 'react';
import AuthComponent from './Authentification/AuthComponent';
import AuthService from './Authentification/AuthService';
import AuthContext from './Authentification/AuthContext';
import CategoriesRequests from './HttpRequests/CategoriesRequests'
import Toggle from './Toggle'
import PostList from './PostList';
import 'src/css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home(props) {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	let isLogged = useContext(AuthContext).isLogin;
	const current_user = AuthService.getCurrentUser();
	const [toggles, setToggles] = useState({});

	function fetchData() {
		CategoriesRequests.getAll().then(data => setCategories(data));

		if(isLogged) {
			let current_user = AuthService.getCurrentUser();
			PostRequests.getThumbnailsDiscover(current_user.user_id)
				.then(data => setPosts(data));
		} else {
			PostRequests.getThumbnailsUnlogged('unlogged')
				.then(data => setPosts(data));
		}
	}

	function setToggle(id, isToggled) {
		let toggles_tmp = JSON.parse(JSON.stringify(toggles));
		toggles_tmp[id] = isToggled;
		setToggles(toggles_tmp);
	}

	useEffect(fetchData, [setPosts, setCategories, isLogged]);

	return (
		<Page>
			<div
				className="uk-grid-row-medium uk-child-width-1-5 filters"
				data-uk-grid
			>
				<AuthComponent login="false">
					<div>
						<button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('unlogged').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['far', 'compass']} /> Discover</span></button>
					</div>
				</AuthComponent>
				<AuthComponent login="true">
					<div>
						<button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsDiscover(current_user.user_id).then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['far', 'compass']} /> Discover</span></button>
					</div>
				</AuthComponent>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('newpost').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'hourglass-end']} /> New posts</span></button>
				</div>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('hottest').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'fire']} /> Hottest</span></button>
				</div>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => PostRequests.getThumbnailsUnlogged('raising').then(data => setPosts(data))} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'chart-line']} /> Raising</span></button>
				</div>
				<div>
					<span className="uk-flex-right">
						<FontAwesomeIcon icon={['fas', 'angle-down']} /> Filter
					</span>
				</div>
				<div data-uk-dropdown="mode:click">
					<ul className="uk-nav uk-dropdown-nav">
						<li className="uk-nav-header">Job</li>
							<Toggle id="OpenToWork" text="OpenToWork" setToggle={setToggle}/>
						<li className="uk-nav-header">Categories</li>
						{categories.map(category => (
							<Toggle key={category.category_id} id={category.category_id} text={category.category} setToggle={setToggle}/>
						))}
					</ul>
				</div>
			</div>
			<PostList posts={posts}/>
		</Page>
	);
}
