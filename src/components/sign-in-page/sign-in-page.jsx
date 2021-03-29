import React, {Fragment, useRef, useState} from 'react';
import {Redirect} from 'react-router';
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import Footer from '../footer/footer';
import Header from '../header/header';
import {login} from '../../api-actions';
import {isUserLoggedInSelector, userAuthorizationHasErrorSelector} from '../../store/user/selectors';
import classNames from 'classnames';
import {isValidEmail} from '../../utils';

const SignInPage = ({onSubmit, isLoggedIn, hasError}) => {
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setEmailHasError(false);
    setPasswordHasError(false);

    const email = loginRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !isValidEmail(email)) {
      setEmailHasError(true);
      return;
    }

    if (!password) {
      setPasswordHasError(true);
      return;
    }

    onSubmit({
      login: email,
      password
    });
  };

  const getErrorMessage = () => {
    if (hasError) {
      return <p>We can’t recognize this email and password combination. Please try again.</p>;
    }

    if (emailHasError) {
      return <p>Please enter a valid email address</p>;
    }

    if (passwordHasError) {
      return <p>Password cannot be empty</p>;
    }

    return null;
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="user-page">
        <Header className="user-page__head">
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
            <div className="sign-in__message">
              {getErrorMessage()}
            </div>
            <div className="sign-in__fields">
              <div className={classNames(`sign-in__field`, {"sign-in__field--error": emailHasError})}>
                <input
                  ref={loginRef}
                  className="sign-in__input"
                  type="text"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={classNames(`sign-in__field`, {"sign-in__field--error": passwordHasError})}>
                <input
                  ref={passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
};

SignInPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

const mapStateToProps = (state) => ({
  isLoggedIn: isUserLoggedInSelector(state),
  hasError: userAuthorizationHasErrorSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

