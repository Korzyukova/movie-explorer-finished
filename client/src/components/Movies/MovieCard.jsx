/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import CardButton from './CardButton';
import { moviesApi } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function calculateTime(min) {
  const hours = Math.floor(min / 60);
  const mins = min - hours * 60;
  return `${hours <= 0 ? '' : `${hours}h `}${mins}m`;
}

function buildImgLink(image) {
  return `${moviesApi.getBase()}${image}`;
}

class movieCard extends React.Component {
  constructor(props) {
    super(props);
    this.movie = props.movie;
    this.savedMovies = props.savedMovies;
    this.removeLike = props.removeLike;
    this.state = {
      liked: props.liked,
    };
  }

  buildBody() {
    return {
      country: this.movie.country,
      director: this.movie.director,
      duration: this.movie.duration,
      year: this.movie.year,
      description: this.movie.description,
      image: buildImgLink(this.movie.image.url),
      trailerLink: this.movie.trailerLink,
      thumbnail: buildImgLink(this.movie?.image?.formats?.thumbnail?.url ?? ''),
      movieId: this.movie.id,
      nameRU: this.movie.nameRU,
      nameEN: this.movie.nameEN,
    };
  }

  render() {
    const { liked } = this.state;
    const image = this.movie.image.url ? buildImgLink(this.movie.image.url) : this.movie.image;
    return (
      <li>
        <a href={this.movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="photo-grid__item"
            src={image}
            alt={this.movie.image.alternativeText}
          />
        </a>
        <div className="photo-grid__bottom">
          <h2 className="photo-grid__name">{this.movie.nameEN}</h2>
          <button
            className="photo-grid__likeme"
            type="button"
            onClick={async () => {
              if (!liked) {
                await mainApi.postMovies(this.buildBody());
                this.setState((prev) => ({
                  ...prev,
                  liked: true,
                }));
                await this.removeLike();
              } else {
                await mainApi.deleteMovie(this.movie._id ?? this.movie.saveId);
                this.setState((prev) => ({
                  ...prev,
                  liked: false,
                }));
                await this.removeLike(this.movie._id);
              }
            }}
          >
            <CardButton key={liked} liked={liked} savedMovies={this.savedMovies} />
          </button>
        </div>
        <p className="photo-grid__bottom-time">{calculateTime(this.movie.duration)}</p>
      </li>
    );
  }
}
export default movieCard;
