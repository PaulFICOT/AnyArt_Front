import HttpClient from './HttpClient';

const httpClient = new HttpClient('posts');

/**
 * Class that allows to get/remove/create posts
 */
export default class PostRequests {
	/**
	 * Get the post by the given id
	 * @param {*} id The id of this post
	 * @param {*} parameters The parameters to get this post
	 */
	static getById(id, parameters) {
		return httpClient.get(`/${id}`, parameters);
	}

	/**
	 * Get the tags of a post by the given post id
	 * @param {*} id The id of this post
	 */
	static getTagsByPostId(id) {
		return httpClient.get(`/${id}/tags`);
	}

	/**
	 * Get the categories of a post by the given post id
	 * @param {*} id The id of this post
	 */
	static getCategoriesById(id) {
		return httpClient.get(`/${id}/categories`);
	}

	/**
	 * Get the pictures of a post by the given post id
	 * @param {*} id The id of this post
	 */
	static getPicturesByPostId(id) {
		return httpClient.get(`/${id}/pictures`);
	}

	/**
	 * Get the comments of a post by the given post id
	 * @param {*} id The id of this post
	 */
	static getCommentsByPostId(id) {
		return httpClient.get(`/${id}/comments`);
	}

	/**
	 * Post a new comment on a post with the given post id
	 * @param {*} id The id of this post
	 * @param {*} parameters The parameters to get this post
	 */
	static postComment(id, parameters) {
		return httpClient.post(`/${id}/comments`, parameters);
	}

	/**
	 * Get the discover thumbnails for a user by the given user id
	 * @param {*} id The id of the user
	 * @param {*} parameters The parameters to get these thumbnails
	 */
	static getThumbnailsDiscover(id, parameters){
		return httpClient.get(`/thumbnails/${id}/discover`, parameters);
	}

	/**
	 * Get the thumbnails by the given search text
	 * @param {*} research The search text
	 */
	static getThumbnailsBySearch(research){
		return httpClient.get('/thumbnails/research', research);
	}

	/**
	 * Get the thumbnails by the kind of thumbnails to recover
	 * @param {*} id The kind of thumbnails to recover
	 * @param {*} parameters The parameters to get these thumbnails
	 */
	static getThumbnailsUnlogged(id, parameters) {
		return httpClient.get(`/thumbnails/${id}`, parameters);
	}

	/**
	 * Set the opinion for a given post
	 * @param {*} id The id of this post
	 * @param {*} parameters The parameters to set this opinion
	 */
	static setOpinion(id, parameters) {
		return httpClient.post(`/${id}/opinion`, parameters);
	}

	/**
	 * Get the opinion for a given post
	 * @param {*} id The id of this post
	 */
	static getOpinion(id) {
		return httpClient.get(`/${id}/opinion`);
	}

	/**
	 * Create a new post
	 * @param {*} parameters The parameters to create this post
	 */
	static createPost(parameters) {
		return httpClient.post('/new', parameters);
	}

	/**
	 * Remove the given post
	 * @param {*} id The id of this post
	 */
	static rmPost(id) {
		return httpClient.delete(`/${id}`).then(response => response.json());
	}
}
