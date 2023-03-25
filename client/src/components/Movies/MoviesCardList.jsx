import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from './MovieCard';

class MoviesCardList extends React.Component {
  constructor(props) {
    super(props);
    this.savedMovies = props.savedMovies;
    this.movies = props.movies;
  }

  render() {
    return (
      <div className="moviescardlist">
        <div className="moviescardlist__container">
          <ul className="photo-grid">
            {this.movies
              .map((movie) => (
                <MovieCard
                  movie={movie}
                  liked={movie.liked}
                  savedMovies={this.savedMovies}
                  key={uuidv4()}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default MoviesCardList;
