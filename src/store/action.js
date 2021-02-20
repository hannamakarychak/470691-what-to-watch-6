export const ActionType = {
  SET_GENRE: `main/setGenre`,
  GET_MOVIES_BY_GENRE: `main/getMoviesByGenre`
};

export const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  getListByGenre: () => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: []
  })
};
