import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from './MovieCard';
import { moviesApi } from '../../utils/MoviesApi';

class MoviesCardList extends React.Component {
  constructor(props) {
    super(props);
    this.savedMovies = props.savedMovies;
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    const movies = await moviesApi.getMovies();
    this.setState({
      movies,
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="moviescardlist">
        <div className="moviescardlist__container">
          <ul className="photo-grid">
            {movies
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
