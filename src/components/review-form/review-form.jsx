import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

import './review-form.css';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

const ReviewForm = ({onSubmit, isLoading = false, hasError = false}) => {
  const [review, setReview] = useState(``);
  const [rating, setRating] = useState(1);

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    onSubmit(rating, review);
  };

  const isValid = review.length < MIN_REVIEW_LENGTH || review.length > MAX_REVIEW_LENGTH;

  const stars = new Array(10).fill().map((el, index) =>
    <Fragment key={`star-${index}`}>
      <input
        className="rating__input"
        id={`star-${index}`}
        type="radio" name="rating"
        value={index + 1}
        disabled={isLoading}
        checked={index + 1 === rating}
        onChange={() => setRating(index + 1)}
      />
      <label className="rating__label" htmlFor={`star-${index}`}>Rating {index + 1} </label>
    </Fragment>
  );

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {stars}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            value={review}
            disabled={isLoading}
            onChange={(evt) => setReview(evt.target.value)}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isValid || isLoading}
              onClick={handleSubmitClick}
            >
              Post
            </button>
          </div>
        </div>
      </form>
      {hasError &&
        <p className="add-review__error">
          An error occurred while sending the review. Please try again later.
        </p>
      }
    </div>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default ReviewForm;
