import React from 'react';

import '../App.css';
import SearchForm from '../components/Movies/SearchForm';
import MoviesCardList from '../components/Movies/MoviesCardList';
import Footer from '../components/Footer';
import More from '../components/Movies/More';
import Header from '../components/Header';
import { moviesApi } from '../utils/MoviesApi';

class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      tumblerIsOpen: true,
      shortMovies: [],
      allMovies: [],
      search: '',
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
      search: value.target.value,
    }));
  };

  render() {
    const {
      tumblerIsOpen, allMovies, shortMovies, search,
    } = this.state;
    const movies = tumblerIsOpen ? shortMovies : allMovies;
    return (
      <main className="movies">
        <Header user />
        <SearchForm
          tumblerIsOpen={tumblerIsOpen}
          setTumblerIsOpen={this.onClick}
          search={search}
          setSearch={this.setSearch}
        />
        <MoviesCardList key={movies} movies={movies} />
        <More />
        <Footer />
      </main>
    );
  }
}

export default Movies;
