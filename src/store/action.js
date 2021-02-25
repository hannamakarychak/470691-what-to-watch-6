export const ActionType = {
  SET_GENRE: `main/setGenre`
};

export const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  })
};
