import React from 'react';
import PropTypes from 'prop-types';

const Review = ({comment, userName, date, rating}) => {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Review.propTypes = {
  comment: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Review;
