import React from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

const Header = (props = {isLoggedIn: false}) => {
  const location = useLocation();

  const signInLink = location.pathname !== `/login` &&
    <Link to="/login" className="user-block__link">Sign in</Link>;

  return (
    <header className={`page-header ${props.className}`}>
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {props.children}


      <div className="user-block">
        {props.isLoggedIn ?
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div> :
          signInLink
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.node,
};

export default Header;

