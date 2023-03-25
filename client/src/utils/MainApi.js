const checkResponse = require('./checkResponse');

export default class MainApi {
  constructor(options) {
    this.options = options;
  }

  async getMovies() {
    return fetch(`${this.options.baseUrl}/movies`, {
      headers: this.options.headers,
    }).then((res) => checkResponse(res));
  }

  async getMe() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    }).then((res) => checkResponse(res));
  }

  async signOut() {
    return fetch(`${this.options.baseUrl}/signout`, {
      headers: this.options.headers,
    }).then((res) => checkResponse(res));
  }

  async postMovies(movie) {
    return fetch(`${this.options.baseUrl}/movies`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(movie),
    }).them((res) => checkResponse(res));
  }

  async signUp(user) {
    return fetch(`${this.options.baseUrl}/sighup`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(user),
    }).then((res) => checkResponse(res));
  }

  async signIn(user) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(user),
    }).then((res) => checkResponse(res));
  }

  async patchMe(user) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(user),
    }).then((res) => checkResponse(res));
  }

  async deleteMovie(id) {
    return fetch(`{this.options.baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    }).then((res) => checkResponse(res));
  }
}

module.exports = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});
