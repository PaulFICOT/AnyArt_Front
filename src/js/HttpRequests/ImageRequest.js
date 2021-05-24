import HttpClient from './HttpClient';

const httpClient = new HttpClient('', false);

/**
 * Class that allows to get/upload images
 */
export default class ImageRequests {
	/**
	 * Get the image with the given id
	 * @param {*} id The id of this image
	 */
	static getById(id) {
		return httpClient.get(`/${id}`);
	}

	/**
	 * Upload a new images
	 * @param {*} params The parameters for the upload
	 * @param {*} files The files to upload
	 */
	static upload(params, files) {
		return httpClient.upload('/api/upload', params, files);
	}
}
