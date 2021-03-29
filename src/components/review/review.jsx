import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const Review = ({comment, userName, date, rating}) => {
  const dateObject = dayjs(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={dateObject.format(`YYYY-MM-DD`)}>
            {dateObject.format(`MMMM DD, YYYY`)}
          </time>
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
