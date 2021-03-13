import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

const ReviewForm = (props) => {
  const [review, setReview] = useState(``);
  const [rating, setRating] = useState(1);

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    props.onSubmit(rating, review);
  };

  const stars = new Array(10).fill().map((el, index) =>
    <Fragment key={`star-${index}`}>
      <input
        className="rating__input"
        id={`star-${index}`}
        type="radio" name="rating"
        value={index + 1}
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
            onChange={(evt) => setReview(evt.target.value)}
          >

          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" onClick={handleSubmitClick}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ReviewForm;
