import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Player from '../player/player';

let timeoutId;

const MovieCard = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = (evt) => {
    props.onMouseEnter(evt);
    timeoutId = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  };

  const handleMouseLeave = (evt) => {
    props.onMouseLeave(evt);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsPlaying(false);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-movie-card__image">
        <Player
          posterSrc={props.imgSrc}
          videoSrc={props.videoSrc}
          style={{
            verticalAlign: `top`,
            width: `100%`,
            height: `100%`,
            objectFit: `cover`
          }}
          isPlaying={isPlaying}
          isMuted
        />
      </div>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${props.id}`} className="small-movie-card__link" >{props.title}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  videoSrc: PropTypes.string.isRequired
};

export default MovieCard;

