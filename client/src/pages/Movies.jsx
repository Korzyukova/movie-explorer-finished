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
    this.state = {
      tumblerIsOpen: false,
      shortMovies: [],
      allMovies: [],
      search: '',
      searchActive: false,
      cards: calcNumberOfCards(),
      more: calcMore(),
      loading: true,
    };
    this.refetch = this.refetch.bind(this);
  }

  async componentDidMount() {
    try {
      const movies = await moviesApi.getMovies();
      const likedMovies = await MainApi.getMovies();
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
    } catch {
      this.setState(() => ({
        error: true,
        loading: false,
      }));
    }
  }

  onClick = () => {
    this.setState((prev) => ({
      ...prev,
      tumblerIsOpen: !prev.tumblerIsOpen,
    }));
  };

  setSearch = (value) => {
    this.setState((prev) => ({
      ...prev,
      search: value,
      cards: calcNumberOfCards(),
    }));
  };

  async refetch() {
    const movies = await moviesApi.getMovies();
    const likedMovies = await MainApi.getMovies();
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
          setSearch={this.setSearch}
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
        {notFound && <h1 className="movies-message">Movie not found!</h1>}
        {error && <h1 className="movies-message">Error fetching movies!</h1>}
        {loading && <Preloader />}
        <Footer />
      </main>
    );
  }
}
export default CheckAuth(Movies);
