import React, {Fragment, useRef} from 'react';
import {Redirect} from 'react-router';
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import Footer from '../footer/footer';
import Header from '../header/header';
import {login} from '../../api-actions';
import {isUserLoggedInSelector} from '../../store/user/selectors';

const SignInPage = ({onSubmit, isLoggedIn}) => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value
    });
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
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={loginRef}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
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
  isLoggedIn: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

const mapStateToProps = (state) => ({
  isLoggedIn: isUserLoggedInSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

