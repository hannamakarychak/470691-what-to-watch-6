import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Card = (props) => {
  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <div className="small-movie-card__image">
        <img src={props.imgSrc} alt={props.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${props.id}`} className="small-movie-card__link" >{props.title}</Link>
      </h3>
    </article>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default Card;

