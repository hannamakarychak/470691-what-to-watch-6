export const ActionType = {
  SET_GENRE: `main/setGenre`,
  GET_ALL_MOVIES: `main/getAllMovies`,
  REQUIRED_AUTHORIZATION: `main/requiredAuthorization`,
  LOGGED_IN: `user/loggedIn`,
  LOGGED_IN_FAIL: `user/loggedIn/fail`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  GET_FILM: `main/getFilm`,
  GET_REVIEWS: `film/getReviews`,
  GET_PROMO_FILM: `film/getPromoFilm`,
  SET_MOVIE_FAVORITE: `main/addToMyList`,
  ADD_REVIEW_REQUEST: `reviews/add/request`,
  ADD_REVIEW_SUCCESS: `reviews/add/success`,
  ADD_REVIEW_FAIL: `reviews/add/fail`
};


export const setGenre = (genre) => ({
  type: ActionType.SET_GENRE,
  payload: genre
});

export const getAllMovies = (data) => ({
  type: ActionType.GET_ALL_MOVIES,
  payload: data
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const loggedIn = (email, avatar) => ({
  type: ActionType.LOGGED_IN,
  payload: {
    email,
    avatar
  }
});

export const loggedInFail = () => ({
  type: ActionType.LOGGED_IN_FAIL,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

export const getFilm = (film) => ({
  type: ActionType.GET_FILM,
  payload: film
});

export const getReviews = (reviews) => ({
  type: ActionType.GET_REVIEWS,
  payload: reviews
});

export const addReviewRequest = () => ({
  type: ActionType.ADD_REVIEW_REQUEST,
});

export const addReviewSuccess = () => ({
  type: ActionType.ADD_REVIEW_SUCCESS,
});

export const addReviewFail = () => ({
  type: ActionType.ADD_REVIEW_FAIL,
});

export const getPromoMovie = (film) => ({
  type: ActionType.GET_PROMO_FILM,
  payload: film
});

export const setMovieFavorite = (movieId, isFavorite) => ({
  type: ActionType.SET_MOVIE_FAVORITE,
  payload: {
    movieId,
    isFavorite
  }
});
