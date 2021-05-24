import HttpClient from './HttpClient';

const httpClient = new HttpClient('', false);

export default class ImageRequests {
	static getById(id) {
		return httpClient.get(`/${id}`);
	}

	static upload(params, files) {
		return httpClient.upload('/api/upload', params, files);
	}
}
