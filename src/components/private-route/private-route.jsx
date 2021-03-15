import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {isUserLoggedInSelector} from '../../store/user/selectors';

const PrivateRoute = ({render, path, exact, isLoggedIn}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          isLoggedIn
            ? render(routeProps)
            : <Redirect to={`/login`} />
        );
      }} />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isLoggedIn: isUserLoggedInSelector(state)
});

export default connect(mapStateToProps)(PrivateRoute);
