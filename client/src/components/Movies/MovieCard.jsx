import React from 'react';
import CardButton from './CardButton';
import { moviesApi } from '../../utils/MoviesApi';

function calculateTime(min) {
  const hours = Math.floor(min / 60);
  const mins = min - hours * 60;
  return `${hours <= 0 ? '' : `${hours}h `}${mins}m`;
}

class movieCard extends React.Component {
  constructor(props) {
    super(props);
    this.movie = props.movie;
    this.liked = props.liked;
    this.savedMovies = props.savedMovies;
  }

  render() {
    return (
      <li>
        <a href={this.movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="photo-grid__item"
            src={`${moviesApi.getBase()}/${this.movie.image.url}`}
            alt={this.movie.image.alternativeText}
          />
        </a>
        <div className="photo-grid__bottom">
          <h2 className="photo-grid__name">{this.movie.nameEN}</h2>
          <button className="photo-grid__likeme" type="button">
            <CardButton liked={this.liked} savedMovies={this.savedMovies} />
          </button>
        </div>
        <p className="photo-grid__bottom-time">{calculateTime(this.movie.duration)}</p>
      </li>
    );
  }
}
export default movieCard;
