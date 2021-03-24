import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const Player = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      if (props.isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.load();
      }
    }
  }, [props.isPlaying]);

  return (
    <video
      src={props.videoSrc}
      poster={props.posterSrc}
      muted={props.isMuted}
      style={props.style || {}}
      ref={videoRef}
    />
  );
};

Player.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
  style: PropTypes.object,
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired
};

export default Player;
