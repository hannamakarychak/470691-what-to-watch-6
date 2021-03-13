export const ActionType = {
  SET_GENRE: `main/setGenre`,
  GET_ALL_MOVIES: `main/getAllMovies`,
  REQUIRED_AUTHORIZATION: `main/requiredAuthorization`,
  LOGGED_IN: `user/loggedIn`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  GET_FILM: `main/getFilm`,
  GET_REVIEWS: `film/getReviews`
};

export const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  getAllMovies: (data) => ({
    type: ActionType.GET_ALL_MOVIES,
    payload: data
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  loggedIn: (email, avatar) => ({
    type: ActionType.LOGGED_IN,
    payload: {
      email,
      avatar
    }
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  }),

  getFilm: (film) => ({
    type: ActionType.GET_FILM,
    payload: film
  }),

  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews
  })
};
