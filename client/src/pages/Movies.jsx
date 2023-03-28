/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from 'react';

import '../App.css';
import SearchForm from '../components/Movies/SearchForm';
import MoviesCardList from '../components/Movies/MoviesCardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { moviesApi } from '../utils/MoviesApi';
import searchMovies from '../utils/searchMovies';

function getWidthSize(width) {
  if (width >= 1280) return 'large';
  if (width >= 720) return 'medium';
  return 'small';
}

function calcNumberOfCards() {
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

function calcMore() {
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
    };
  }

  async componentDidMount() {
    const movies = await moviesApi.getMovies();
    const shortMovies = movies.filter((movie) => movie.duration <= 40);
    this.setState((prev) => ({
      ...prev,
      shortMovies,
      allMovies: movies,
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
    let len = 0;
    let movies = [];
    if (search) {
      const listName = tumblerIsOpen ? 'shortMovies' : 'allMovies';
      len = this.state[listName].length;
      movies = searchMovies(
        search,
        tumblerIsOpen ? [...shortMovies] : [...allMovies],
      );
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
        <MoviesCardList key={JSON.stringify({ search, tumblerIsOpen })} movies={movies} />
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

export default Movies;
