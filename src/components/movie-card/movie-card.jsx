import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Player from '../player/player';

const ONE_SECOND = 1000;

const MovieCard = (props) => {
  let timeoutId;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => {
      setIsPlaying(true);
    }, ONE_SECOND);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  });

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
  videoSrc: PropTypes.string.isRequired
};

export default MovieCard;

