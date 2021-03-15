import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import {
  selectedMovieLoadedSelector,
  selectedMovieNameSelector,
  selectedMovieVideoSrcSelector,
  selectedMoviePreviewImgSrcSelector
} from '../../store/selected-movie/selectors';
import {fetchFilm} from '../../api-actions';

const PlayerPage = (props) => {
  const {isMovieLoaded, onLoadMovie, name, videoSrc, previewImgSrc} = props;
  const params = useParams();
  const history = useHistory();
  const currentMovieId = params.id;

  useEffect(() => {
    if (!isMovieLoaded) {
      onLoadMovie(currentMovieId);
    }
  }, [currentMovieId, onLoadMovie, isMovieLoaded]);

  return (
    <Fragment>
      <div className="player">
        <video src={videoSrc} className="player__video" poster={previewImgSrc} />

        <button
          type="button"
          className="player__exit"
          onClick={() => history.push(`/films/${params.id}`)}
        >
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{name}</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div >
    </Fragment >
  );
};

PlayerPage.propTypes = {
  name: PropTypes.string,
  isMovieLoaded: PropTypes.bool.isRequired,
  onLoadMovie: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  previewImgSrc: PropTypes.string
};

const mapStateToProps = (state) => ({
  name: selectedMovieNameSelector(state),
  isMovieLoaded: selectedMovieLoadedSelector(state),
  videoSrc: selectedMovieVideoSrcSelector(state),
  previewImgSrc: selectedMoviePreviewImgSrcSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(id) {
    dispatch(fetchFilm(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);

