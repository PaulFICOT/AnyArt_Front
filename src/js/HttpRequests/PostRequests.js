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

	static postComment(id, parameters) {
		return httpClient.post(`/${id}/comments`, parameters);
	}

	static getThumbnailsDiscover(id){
		return httpClient.get(`/${id}/discover`);
	}

	static getThumbnailsUnlogged(parameters) {
		return httpClient.get(`/thumbnails/${parameters}`);
	}
}
