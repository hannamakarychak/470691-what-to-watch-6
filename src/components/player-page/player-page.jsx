import React, {Fragment, useEffect, useRef, useState} from 'react';
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
import {formatTime} from '../../utils';
import Spinner from '../spinner/spinner';

const PlayerPage = (props) => {
  const {isMovieLoaded, onLoadMovie, name, videoSrc, previewImgSrc} = props;
  const params = useParams();
  const history = useHistory();
  const videoRef = useRef();
  const currentMovieId = params.id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const timeElapsed = duration - currentTime;

  useEffect(() => {
    if (!isMovieLoaded) {
      onLoadMovie(currentMovieId);
    }
  }, [currentMovieId, onLoadMovie, isMovieLoaded]);

  useEffect(() => {
    setInterval(() => {
      if (isPlaying) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 100);
  }, [isPlaying]);

  if (!isMovieLoaded) {
    return <Spinner />;
  }

  const handlePlayClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleFullScreenClick = () => {
    videoRef.current.requestFullscreen();
  };

  const progress = currentTime / duration * 100;

  return (
    <div className="player">
      <video
        src={videoSrc}
        className="player__video"
        poster={previewImgSrc}
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onDurationChange={() => setDuration(videoRef.current.duration)}
      />

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
            <progress className="player__progress" value={progress.toString()} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatTime(timeElapsed)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            {isPlaying
              ? <Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </Fragment>
              : <Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Fragment>
            }
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
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

