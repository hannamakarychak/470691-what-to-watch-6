export const ActionType = {
  SET_GENRE: `main/setGenre`,
  GET_ALL_MOVIES: `main/getAllMovies`
};

export const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  getAllMovies: (data) => ({
    type: ActionType.GET_ALL_MOVIES,
    payload: data
  })
};
