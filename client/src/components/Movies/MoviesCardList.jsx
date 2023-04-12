/* eslint-disable no-underscore-dangle */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from './MovieCard';

class MoviesCardList extends React.Component {
  constructor(props) {
    super(props);
    this.savedMovies = props.savedMovies;
    this.refetch = props.refetch?.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.state = {
      movies: props.savedMovies ? props.movies?.filter((movie) => movie.liked) : props.movies,
    };
  }

  async removeLike(id) {
    if (id) {
      this.setState((prev) => ({
        ...prev,
        movies: prev.movies?.filter((movie) => movie._id !== id),
      }));
      await this.refetch();
    } else {
      await this.refetch();
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="moviescardlist">
        <div className="moviescardlist__container">
          <ul key={movies} className="photo-grid">
            {movies
              ?.map((movie) => (
                <MovieCard
                  movie={movie}
                  liked={movie.liked ?? false}
                  savedMovies={this.savedMovies}
                  key={uuidv4()}
                  removeLike={this.removeLike}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default MoviesCardList;
