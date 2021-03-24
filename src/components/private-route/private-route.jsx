import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {isUserLoggedInSelector, userIsLoadedSelector} from '../../store/user/selectors';
import Spinner from '../spinner/spinner';

const PrivateRoute = ({render, path, exact, isLoggedIn, isAuthorizationLoaded}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        if (!isAuthorizationLoaded) {
          return <Spinner />;
        }

        return (
          isLoggedIn
            ? render(routeProps)
            : <Redirect to="/login" />
        );
      }} />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isAuthorizationLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoggedIn: isUserLoggedInSelector(state),
  isAuthorizationLoaded: userIsLoadedSelector(state)
});

export default connect(mapStateToProps)(PrivateRoute);
