import checkResponse from './checkResponse';

export default class MoviesApi {
  constructor(options) {
    this.options = options;
  }

  getBase() {
    return this.options.baseUrl;
  }

  async getMovies() {
    const res = await fetch(`${this.options.baseUrl}/beatfilm-movies`);
    return checkResponse(res);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
});
