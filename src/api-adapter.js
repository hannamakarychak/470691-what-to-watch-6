export const adaptMovieToClient = (movie) => ({
  id: movie.id,
  name: movie.name,
  posterImage: movie.poster_image,
  previewImage: movie.preview_image,
  backgroundImage: movie.background_image,
  backgroundColor: movie.background_color,
  videoLink: movie.video_link,
  previewVideoLink: movie.preview_video_link,
  description: movie.description,
  rating: movie.rating,
  scoresCount: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  runTime: movie.run_time,
  genre: movie.genre,
  released: movie.released,
  isFavorite: movie.is_favorite,
});

export const adaptUserToClient = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarUrl: user.avatar_url,
});
