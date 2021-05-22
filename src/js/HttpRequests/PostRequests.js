import HttpClient from './HttpClient';

const httpClient = new HttpClient('posts');

export default class PostRequests {
	static getById(id, parameters) {
		return httpClient.get(`/${id}`, parameters);
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

	static postComment(id, parameters) {
		return httpClient.post(`/${id}/comments`, parameters);
	}

	static setOpinion(id, parameters) {
		return httpClient.post(`/${id}/opinion`, parameters);
	}

	static getOpinion(id) {
		return httpClient.get(`/${id}/opinion`);
	}
}
