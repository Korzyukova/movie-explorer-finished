/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from 'react';

import '../App.css';
import SearchForm from '../components/Movies/SearchForm';
import MoviesCardList from '../components/Movies/MoviesCardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { moviesApi } from '../utils/MoviesApi';
import MainApi from '../utils/MainApi';
import searchMovies from '../utils/searchMovies';
import Preloader from '../components/Preloader';
import CheckAuth from '../components/Main/CheckAuth';

export function getWidthSize(width) {
  if (width >= 1280) return 'large';
  if (width >= 720) return 'medium';
  return 'small';
}

export function calcNumberOfCards() {
  const width = getWidthSize(window.outerWidth);
  switch (width) {
    case 'large':
      return 12;
    case 'medium':
      return 8;
    case 'small':
      return 5;
    default:
      return 5;
  }
}

export function calcMore() {
  const width = getWidthSize(window.outerWidth);
  switch (width) {
    case 'large':
      return 3;
    default:
      return 2;
  }
}

class Movies extends React.Component {
  constructor() {
    super();
    const tumblerIsOpen = localStorage.getItem('tumblerIsOpen');
    this.state = {
      tumblerIsOpen: tumblerIsOpen === 'true',
      shortMovies: [],
      allMovies: [],
      search: localStorage.getItem('search') ?? '',
      searchActive: false,
      cards: calcNumberOfCards(),
      more: calcMore(),
      loading: true,
      likedMovies: [],
    };
    this.refetch = this.refetch.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  async componentDidMount() {
    const { search } = this.state;
    try {
      const likedMovies = await MainApi.getMovies();
      this.setState((prev) => ({
        ...prev,
        loading: false,
        likedMovies,
      }), async () => {
        if (search.length > 0) await this.submitForm(search);
      });
    } catch (error) {
      this.setState(() => ({
        error: true,
        loading: false,
      }));
    }
  }

  onClick = () => {
    const { tumblerIsOpen } = this.state;
    localStorage.setItem('tumblerIsOpen', !tumblerIsOpen);
    this.setState((prev) => ({
      ...prev,
      tumblerIsOpen: !prev.tumblerIsOpen,
    }));
  };

  async submitForm(search) {
    localStorage.setItem('search', search);
    this.setState((prev) => ({
      ...prev,
      loading: true,
      search,
      notFound: false,
      error: false,
    }));
    const { likedMovies } = this.state;
    const movies = await moviesApi.getMovies(search);
    let i = 0;
    for (const movie of movies) {
      const lm = likedMovies.movies.filter((el) => el.movieId === movie.id);
      if (lm.length > 0) {
        movies[i].liked = true;
        movies[i].saveId = lm[0]._id;
      }
      i++;
    }
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    this.setState((prev) => ({
      ...prev,
      shortMovies,
      allMovies: movies,
      loading: false,
    }));
  }

  async refetch() {
    const { search } = this.state;
    const likedMovies = await MainApi.getMovies();
    const movies = await moviesApi.getMovies(search);
    let i = 0;
    for (const movie of movies) {
      const lm = likedMovies.movies.filter((el) => el.movieId === movie.id);
      if (lm.length > 0) {
        movies[i].liked = true;
        movies[i].saveId = lm[0]._id;
      }
      i++;
    }
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    this.setState((prev) => ({
      ...prev,
      shortMovies,
      allMovies: movies,
      loading: false,
      likedMovies,
    }));
  }

  render() {
    const {
      tumblerIsOpen, allMovies, shortMovies, search, cards, more, error, loading,
    } = this.state;
    let len = 0;
    let movies = [];
    let notFound = false;
    if (search) {
      const listName = tumblerIsOpen ? 'shortMovies' : 'allMovies';
      len = this.state[listName].length;
      movies = searchMovies(
        search,
        tumblerIsOpen ? [...shortMovies] : [...allMovies],
      );
      if (movies.length === 0) notFound = true;
      if (movies.length > cards) movies.splice(0, cards);
      else len = movies.length;
    }

    return (
      <main className="movies">
        <Header user />
        <SearchForm
          tumblerIsOpen={tumblerIsOpen}
          setTumblerIsOpen={this.onClick}
          submitForm={this.submitForm}
          search={search}
        />
        <MoviesCardList
          key={JSON.stringify({ search, tumblerIsOpen, movies })}
          movies={movies}
          refetch={this.refetch}
        />
        {
          !(cards >= len) && (
            <section className="more">
              <button
                className="more-button"
                type="button"
                onClick={() => {
                  const update = cards + more;
                  update <= len ? this.setState((prev) => ({
                    ...prev,
                    cards: update,
                  })) : this.setState((prev) => ({
                    ...prev,
                    cards: len,
                  }));
                }}
              >
                <span className="more-text">More</span>
              </button>
            </section>
          )
        }
        {notFound && !error && !loading && <h1 className="movies-message">Movie not found!</h1>}
        {error && <h1 className="movies-message">Error fetching movies!</h1>}
        {loading && <Preloader />}
        <Footer />
      </main>
    );
  }
}
export default CheckAuth(Movies);
