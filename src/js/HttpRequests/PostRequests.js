import HttpClient from './HttpClient';

const httpClient = new HttpClient('posts');

export default class PostRequests {
	static getById(id) {
		return httpClient.get(`/${id}`);
	}

	static getTagsByPostId(id) {
		return httpClient.get(`/${id}/tags`);
	}

	static getCategoriesById(id) {
		return httpClient.get(`/${id}/categories`);
	}

	static getPicturesByPostId(id) {
		return httpClient.get(`/${id}/pictures`);
	}

	static getCommentsByPostId(id) {
		return httpClient.get(`/${id}/comments`);
	}
}
