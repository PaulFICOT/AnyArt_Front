import Page from './Page';
import Viewer from './Component/Viewer';
import TagInput from './Component/TagInput';
import { useState, useEffect, useRef } from 'react';
import UploadArea from './Component/UploadArea';
import CategoriesRequests from './HttpRequests/CategoriesRequests';
import PostRequests from './HttpRequests/PostRequests';

export default function Upload() {
	const [tags, setTags] = useState([]);
	const [imgs, setImgs] = useState([]);
	const [categories, setCategories] = useState([]);

	const titleInput = useRef(null);
	const descInput = useRef(null);
	const categoryInput = useRef(null);

	useEffect(() => {
		CategoriesRequests.getAll().then(response => {
			setCategories(response);
		});
	}, []);

	function getSQLDate() {
		const date = new Date();
		return date.toISOString().substr(0, 19).replace('T', ' ');
	}

	function handleSubmit(event) {
		PostRequests.createPost(
			{
				title: titleInput.current.value,
				desc: descInput.current.value,
				category: categoryInput.current.value,
				crea_date: getSQLDate(),
				tags: tags,
			},
			imgs
		);
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
						<UploadArea imgs={imgs} setImgs={setImgs} />
					</div>
				</div>
				<div className="uk-width-1-2@l uk-width-1-1@s uk-light">
					<div className="uk-card uk-card-secondary uk-card-body">
						<h2>Upload a new creation</h2>
						<form className="uk-form" action={handleSubmit}>
							<div className="uk-grid uk-child-width-1-1" data-uk-grid>
								<div>
									<input
										className="uk-input"
										placeholder="Title"
										ref={titleInput}
									/>
								</div>
								<div>
									<textarea
										className="uk-textarea"
										placeholder="Description"
										ref={descInput}
									/>
								</div>
								<div>
									<select className="uk-select" ref={categoryInput}>
										<option value="" disabled defaultValue>
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
