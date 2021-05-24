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
	const [typePosts, setTypePosts] = useState('unlogged');

	function fetchData() {
		CategoriesRequests.getAll().then(data => setCategories(data));

		if(isLogged) {
			let current_user = AuthService.getCurrentUser();
			PostRequests.getThumbnailsDiscover(current_user.user_id)
				.then(data => setPosts(data));
			setTypePosts('discover');
		} else {
			PostRequests.getThumbnailsUnlogged('unlogged')
				.then(data => setPosts(data));
			setTypePosts('unlogged');
		}
	}

	function changeTypePosts(type) {
		if (type === 'discover') {
			PostRequests.getThumbnailsDiscover(current_user.user_id, getFilters())
				.then(data => setPosts(data))
		} else {
			PostRequests.getThumbnailsUnlogged(type, getFilters())
				.then(data => setPosts(data));
		}
		setTypePosts(type);
	}

	function setToggle(id, isToggled) {
		let toggles_tmp = JSON.parse(JSON.stringify(toggles));
		toggles_tmp[id] = isToggled;
		setToggles(toggles_tmp);
	}

	function getFilters() {
		let filters = {filters: []};
		Object.entries(toggles).forEach(([key, value]) => {
			if (value) {
				filters['filters'].push(key);
			}
		});
		return filters;
	}

	function updatePostsByFilters() {
		let filters = {filters: []};
		Object.entries(toggles).forEach(([key, value]) => {
			if (value) {
				filters['filters'].push(key);
			}
		});

		if (typePosts === 'discover') {
			let current_user = AuthService.getCurrentUser();
			PostRequests.getThumbnailsDiscover(current_user.user_id, filters)
				.then(data => setPosts(data))
		} else {
			PostRequests.getThumbnailsUnlogged(typePosts, filters)
				.then(data => setPosts(data));
		}
	}

	useEffect(updatePostsByFilters, [setToggles, setTypePosts, toggles, typePosts])
	useEffect(fetchData, [setPosts, setCategories, isLogged]);

	return (
		<Page>
			<div
				className="uk-grid-row-medium uk-child-width-1-5 filters"
				data-uk-grid
			>
				<AuthComponent login="false">
					<div>
						<button className={"uk-button uk-button-link"} onClick={() => changeTypePosts('unlogged')} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['far', 'compass']} /> Discover</span></button>
					</div>
				</AuthComponent>
				<AuthComponent login="true">
					<div>
						<button className={"uk-button uk-button-link"} onClick={() => changeTypePosts('discover')} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['far', 'compass']} /> Discover</span></button>
					</div>
				</AuthComponent>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => changeTypePosts('newpost')} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'hourglass-end']} /> New posts</span></button>
				</div>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => changeTypePosts('hottest')} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'fire']} /> Hottest</span></button>
				</div>
				<div>
					<button className={"uk-button uk-button-link"} onClick={() => changeTypePosts('raising')} style={{textDecoration: 'none'}}><span><FontAwesomeIcon icon={['fas', 'chart-line']} /> Raising</span></button>
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
