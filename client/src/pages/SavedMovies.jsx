/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import '../App.css';
import SearchForm from '../components/Movies/SearchForm';
import MoviesCardList from '../components/Movies/MoviesCardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainApi from '../utils/MainApi';
import searchMovies from '../utils/searchMovies';
import { calcNumberOfCards, calcMore } from './Movies';
import Preloader from '../components/Preloader';
import CheckAuth from '../components/Main/CheckAuth';

class SavedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      tumblerIsOpen: localStorage.getItem('tumblerIsOpen') === 'true',
      shortMovies: [],
      allMovies: [],
      search: '',
      cards: calcNumberOfCards(),
      more: calcMore(),
      loading: true,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    try {
      const movies = await MainApi.getMovies();
      const shortMovies = movies.movies.filter((movie) => movie.duration <= 40);
      this.setState((prev) => ({
        ...prev,
        shortMovies,
        allMovies: movies.movies,
        loading: false,
      }));
    } catch {
      this.setState(() => ({
        error: true,
        loading: false,
      }));
    }
  }

  handleResize() {
    this.setState((prev) => ({
      ...prev,
      cards: calcNumberOfCards(),
      more: calcMore(),
    }));
  }

  onClick = () => {
    const { tumblerIsOpen } = this.state;
    localStorage.setItem('tumblerIsOpen', !tumblerIsOpen);
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
      notFound: false,
      error: false,
    }));
  };

  async refetch() {
    window.location.reload();
  }

  render() {
    const {
      tumblerIsOpen, allMovies, shortMovies, search, cards, more, error, loading,
    } = this.state;
    const chooseMovies = tumblerIsOpen ? [...shortMovies] : [...allMovies];
    const listName = tumblerIsOpen ? 'shortMovies' : 'allMovies';
    let len = 0;
    let movies = [];
    let notFound = false;
    if (search) {
      len = this.state[listName].length;
      movies = searchMovies(
        search,
        chooseMovies,
      ).map((movie) => ({
        ...movie,
        liked: true,
      }));
      if (movies.length === 0) notFound = true;
    } else {
      movies = chooseMovies.map((movie) => ({
        ...movie,
        liked: true,
      }));
      len = this.state[listName].length;
    }
    if (movies.length > cards) movies.splice(0, cards);
    else len = movies.length;
    return (
      <main className="movies">
        <Header user />
        <SearchForm
          tumblerIsOpen={tumblerIsOpen}
          setTumblerIsOpen={this.onClick}
          setSearch={this.setSearch}
          search={this.search}
        />
        <MoviesCardList
          key={JSON.stringify({
            search, tumblerIsOpen, movies, allMovies, loading,
          })}
          movies={movies}
          refetch={this.refetch}
          savedMovies
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
        {error && <h1 className="movies-message">An error occured!</h1>}
        {loading && <Preloader />}
        <Footer />
      </main>
    );
  }
}
export default CheckAuth(SavedMovies);
