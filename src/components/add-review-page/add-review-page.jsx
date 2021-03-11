import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';

import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import {addReview} from '../../api-actions';
import {connect} from 'react-redux';

const AddReviewPage = (props) => {
  const params = useParams();

  const handleSubmitClick = (rating, review) => {
    props.onSubmit(params.id, rating, review);
  };

  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt={props.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${params.id}`} className="breadcrumbs__link">{props.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={props.imgSrc} alt={props.name} width="218" height="327" />
          </div>
        </div>

        <ReviewForm onSubmit={handleSubmitClick} />

      </section>
    </Fragment>
  );
};

AddReviewPage.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(movieId, rating, review) {
    dispatch(addReview(movieId, rating, review));
  }
});

export default connect(null, mapDispatchToProps)(AddReviewPage);

