import React, {Fragment, useState} from 'react';

const ReviewForm = () => {
  const [, setReview] = useState(``); // add review
  const [, setRating] = useState(null); // add review

  const stars = new Array(10).fill().map((el, index) =>
    <Fragment key={`star-${index}`}>
      <input
        className="rating__input"
        id={`star-${index}`}
        type="radio" name="rating"
        value={index + 1}
        onClick={() => setRating(index + 1)}
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
            onChange={(evt) => setReview(evt.target.value)}
          >

          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
