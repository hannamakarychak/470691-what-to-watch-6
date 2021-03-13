import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';

import {AuthorizationStatus} from '../../constants';
import './header.css';


const Header = (props) => {
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
          <Fragment>
            {props.userEmail}
            <div className="user-block__avatar">
              <img src={props.userAvatar} alt="User avatar" width="63" height="63" />
            </div>
          </Fragment>
          :
          signInLink
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.USER.authorizationStatus === AuthorizationStatus.AUTH,
  userEmail: state.USER.email,
  userAvatar: state.USER.avatar
});

export default connect(mapStateToProps)(Header);

