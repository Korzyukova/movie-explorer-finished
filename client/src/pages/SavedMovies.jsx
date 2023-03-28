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

class SavedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      tumblerIsOpen: false,
      shortMovies: [],
      allMovies: [],
      search: '',
      cards: calcNumberOfCards(),
      more: calcMore(),
    };
  }

  async componentDidMount() {
    const movies = await MainApi.getMovies();
    const shortMovies = movies.movies.filter((movie) => movie.duration <= 40);
    this.setState((prev) => ({
      ...prev,
      shortMovies,
      allMovies: movies.movies,
    }));
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

  render() {
    const {
      tumblerIsOpen, allMovies, shortMovies, search, cards, more,
    } = this.state;
    const chooseMovies = tumblerIsOpen ? [...shortMovies] : [...allMovies];
    const listName = tumblerIsOpen ? 'shortMovies' : 'allMovies';
    let len = 0;
    let movies = [];
    if (search) {
      len = this.state[listName].length;
      movies = searchMovies(
        search,
        chooseMovies,
      ).map((movie) => ({
        ...movie,
        liked: true,
      }));
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
          search={search}
          setSearch={this.setSearch}
        />
        <MoviesCardList
          key={JSON.stringify({ search, tumblerIsOpen, movies })}
          movies={movies}
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
        <Footer />
      </main>
    );
  }
}

export default SavedMovies;
