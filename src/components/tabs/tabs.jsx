import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {reviewPropTypes} from '../../prop-types';
import Review from '../review/review';

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (evt, index) => {
    evt.preventDefault();
    setCurrentTab(index);
  };

  const tabsLabels = [`Overview`, `Details`, `Reviews`];

  const reviewsPivot = Math.ceil(props.reviews.length / 2);
  const reviewsFirstCol = props.reviews.slice(0, reviewsPivot);
  const reviewsSecondCol = props.reviews.slice(reviewsPivot);
  const reviewsColumns = [reviewsFirstCol, reviewsSecondCol];

  return (
    <Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabsLabels.map((label, index) =>
            <li key={label} className={classNames(`movie-nav__item`, {'movie-nav__item--active': index === currentTab})}>
              <a href="#" className="movie-nav__link" onClick={(evt) => handleTabClick(evt, index)}>{label}</a>
            </li>
          )}
        </ul>
      </nav>

      {currentTab === 0 &&
        <Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{props.rating}</div>
            <p className="`movie-rating__meta">
              <span className="movie-rating__level">Very good</span>
              <span className="movie-rating__count">{props.scoresCount}</span>
            </p>
          </div>

          <div className="movie-card__text">
            <p>{props.description}</p>
            <p className="movie-card__director"><strong>Director: {props.director}</strong></p>
            <p className="movie-card__starring"><strong>Starring: {props.starring.join(`, `)}</strong></p>
          </div>
        </Fragment>
      }
      {currentTab === 1 &&
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{props.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {props.starring.map((actor, index) =>
                  <Fragment key={actor}>
                    {actor}{index !== props.starring.length - 1 && <Fragment>, <br /></Fragment>}
                  </Fragment>
                )}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{props.runTime}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{props.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{props.released}</span>
            </p>
          </div>
        </div>
      }

      {currentTab === 2 &&
        <div className="movie-card__reviews movie-card__row">
          {reviewsColumns.map((reviewsOfColumn, index) =>
            <div className="movie-card__reviews-col" key={`column-${index}`}>
              {reviewsOfColumn.map((review) =>
                <Review
                  key={review.id}
                  comment={review.comment}
                  userName={review.user.name}
                  date={review.date}
                  rating={review.rating}
                />
              )}
            </div>
          )}
        </div>
      }
    </Fragment >
  );
};

Tabs.propTypes = {
  rating: PropTypes.number.isRequired,
  scoresCount: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  runTime: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired
};

export default Tabs;
