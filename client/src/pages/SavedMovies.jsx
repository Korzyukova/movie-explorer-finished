import React from 'react';

import '../App.css';
import SearchForm from '../components/Movies/SearchForm';
import MoviesCardList from '../components/Movies/MoviesCardList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainApi from '../utils/MainApi';
import searchMovies from '../utils/searchMovies';

class SavedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      tumblerIsOpen: false,
      shortMovies: [],
      allMovies: [],
      search: '',
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
      search: value.target.value,
    }));
  };

  render() {
    const {
      tumblerIsOpen, allMovies, shortMovies, search,
    } = this.state;
    const movies = searchMovies(search, tumblerIsOpen ? shortMovies : allMovies);
    return (
      <main className="movies">
        <Header user />
        <SearchForm
          tumblerIsOpen={tumblerIsOpen}
          setTumblerIsOpen={this.onClick}
          search={search}
          setSearch={this.setSearch}
        />
        <MoviesCardList key={movies} movies={movies} savedMovies />
        <Footer />
      </main>
    );
  }
}

export default SavedMovies;
