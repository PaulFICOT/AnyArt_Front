import HttpClient from './HttpClient';

const httpClient = new HttpClient();

export default class CountriesRequest {
	static getAll() {
		return httpClient.get('countries');
	}
}
