import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';

import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import {addReview, fetchFilm} from '../../api-actions';
import {connect} from 'react-redux';
import {
  selectedMovieLoadedSelector,
  selectedMovieNameSelector,
  selectedMoviePosterImgSrcSelector,
  selectedMovieBackgroundImgSrcSelector,
  selectedMovieBackgroundColorSelector
} from '../../store/selected-movie/selectors';
import Spinner from '../spinner/spinner';

const AddReviewPage = ({
  onSubmit,
  name,
  imgSrc,
  backgroundColor,
  backgroundImgSrc,
  isMovieLoaded,
  onLoadMovie
}) => {
  const params = useParams();
  const currentMovieId = params.id;

  useEffect(() => {
    if (!isMovieLoaded) {
      onLoadMovie(currentMovieId);
    }
  }, [currentMovieId, onLoadMovie, isMovieLoaded]);

  if (!isMovieLoaded) {
    return <Spinner />;
  }

  const handleSubmitClick = (rating, review) => {
    onSubmit(currentMovieId, rating, review);
  };

  return (
    <Fragment>
      <section className="movie-card movie-card--full" style={{background: backgroundColor}} >
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImgSrc} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${currentMovieId}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={imgSrc} alt={name} width="218" height="327" />
          </div>
        </div>

        <ReviewForm onSubmit={handleSubmitClick} backgroundColor={backgroundColor} />

      </section>
    </Fragment>
  );
};

AddReviewPage.propTypes = {
  name: PropTypes.string,
  imgSrc: PropTypes.string,
  onSubmit: PropTypes.func,
  backgroundImgSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
  isMovieLoaded: PropTypes.bool.isRequired,
  onLoadMovie: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isMovieLoaded: selectedMovieLoadedSelector(state),
  name: selectedMovieNameSelector(state),
  imgSrc: selectedMoviePosterImgSrcSelector(state),
  backgroundImgSrc: selectedMovieBackgroundImgSrcSelector(state),
  backgroundColor: selectedMovieBackgroundColorSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(movieId, rating, review) {
    dispatch(addReview(movieId, rating, review));
  },

  onLoadMovie(id) {
    dispatch(fetchFilm(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);

