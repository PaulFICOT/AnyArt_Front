import Page from './Component/Page';
import Viewer from './Component/Viewer';
import TagInput from './Component/TagInput';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import UploadArea from './Component/UploadArea';
import CategoriesRequests from './HttpRequests/CategoriesRequests';
import PostRequests from './HttpRequests/PostRequests';
import AuthService from './Authentification/AuthService';
import ImageRequests from './HttpRequests/ImageRequest';
import UIkit from 'uikit';

/**
 * Component that shows the upload post page
 */
export default function Upload() {
	const [tags, setTags] = useState([]);
	const [imgs, setImgs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [files, setFiles] = useState([]);

	const titleInput = useRef(null);
	const descInput = useRef(null);
	const categoryInput = useRef(null);
	const loggedUser = AuthService.getCurrentUser();
	const history = useHistory();

	useEffect(() => {
		CategoriesRequests.getAll().then(response => {
			setCategories(response);
		});
	}, []);

	/**
	 * Make date for SQL format
	 */
	function getSQLDate() {
		const date = new Date();
		return date.toISOString().substr(0, 19).replace('T', ' ');
	}

	/**
     * Check if the form is correctly completed
     * @returns True if the form is correct otherwise False
     */
	function checkForm() {
		let errors_messages = [];
		// Check if the user has uploaded a file
		if (files.length === 0) {
			errors_messages.push('No images uploaded');
		}

		// Check the input form
		document.querySelectorAll('#upload-form input').forEach(x => {
			if (!x.value) {
				errors_messages.push(x.name + ' is missing.');
			}
		});

		// Check the textarea form
		document.querySelectorAll('#upload-form textarea').forEach(x => {
			if (!x.value) {
				errors_messages.push(x.name + ' is missing.');
			}
			if (x.value.length > 255) {
				errors_messages.push(x.name + ' is too long. (255 char max)');
			}
		});

		// Check the select form
		document.querySelectorAll('#upload-form select').forEach(x => {
			if (x.value === '-1') {
				errors_messages.push(x.name + ' is missing.');
			}
		});

		let html_return =
			'<ul>' + errors_messages.map(x => `<li>${x}</li>`).join('') + '</ul>';

		// Show all information about the form
		if (errors_messages.length > 0) {
			UIkit.notification({
				message: html_return,
				status: 'danger',
				pos: 'top-right',
				timeout: 5000,
			});
		}

		return errors_messages.length === 0;
	}

	/**
     * Check the form and if everything is correct, upload the new post
     */
	async function handleSubmit(event) {
		event.preventDefault();

		if (!checkForm()) {
			return;
		}

		let postId = -1;
		await PostRequests.createPost({
			title: titleInput.current.value,
			desc: descInput.current.value,
			category: categoryInput.current.value,
			crea_date: getSQLDate(),
			user_id: loggedUser.user_id,
			tags: tags,
		})
			.then(response => (response.ok ? response.json() : { post_id: -1 }))
			.then(response => {
				postId = response.post_id;
			});
		if (postId === -1) {
			return;
		}
		ImageRequests.upload(
			{ user_id: loggedUser.user_id, post_id: postId },
			files
		).then(response => {
			if (response.ok) {
				goToPost(postId);
			} else {
				PostRequests.rmPost(postId);
			}
		});
	}

	/**
	 * Change the page for the new post page
	 * @param {*} postId The id of the new post
	 */
	function goToPost(postId) {
		history.push(`/post/${postId}`);
	}

	return (
		<Page>
			<div data-uk-grid>
				<div
					className="uk-width-1-2@l uk-width-1-1@s"
					data-uk-height-viewport="offset-top: true; offset-bottom: true"
				>
					<Viewer pictures={imgs} />
					<div className="uk-margin-top">
						<UploadArea
							imgs={imgs}
							setImgs={setImgs}
							files={files}
							setFiles={setFiles}
						/>
					</div>
				</div>
				<div className="uk-width-1-2@l uk-width-1-1@s uk-light">
					<div className="uk-card uk-card-secondary uk-card-body">
						<h2>Upload a new creation</h2>
						<form id="upload-form" className="uk-form" onSubmit={handleSubmit}>
							<div className="uk-grid uk-child-width-1-1" data-uk-grid>
								<div>
									<input
										className="uk-input"
										name="title"
										placeholder="Title"
										ref={titleInput}
									/>
								</div>
								<div>
									<textarea
										className="uk-textarea"
										placeholder="Description"
										name="description"
										ref={descInput}
									/>
								</div>
								<div>
									<select
										className="uk-select"
										ref={categoryInput}
										name="category"
										defaultValue="-1"
									>
										<option value="-1" disabled>
											---Category---
										</option>
										{categories.map((x, i) => (
											<option key={i} value={x.category_id}>
												{x.category}
											</option>
										))}
									</select>
								</div>
								<div>
									<TagInput tags={tags} setTags={setTags} placeholder="Tags" />
								</div>
								<div>
									<input
										className="uk-button uk-button-secondary"
										type="submit"
										value="Create"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Page>
	);
}
