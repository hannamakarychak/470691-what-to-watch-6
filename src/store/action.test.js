import {AuthorizationStatus} from "../constants";
import {ActionType, getAllMovies, setGenre, requireAuthorization, loggedIn, redirectToRoute, getFilm, getReviews, getPromoMovie, setMovieFavorite} from "./action";

export const mockMovie = {
  "name": `Macbeth`,
  "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Macbeth.jpg`,
  "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/macbeth.jpg`,
  "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Macbeth.jpg`,
  "background_color": `#F1E9CE`,
  "description": `Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.`,
  "rating": 3.3,
  "scores_count": 48798,
  "director": `Justin Kurzel`,
  "starring": [
    `Michael Fassbender`,
    `Marion Cotillard`,
    `Jack Madigan`
  ],
  "run_time": 113,
  "genre": `Drama`,
  "released": 2015,
  "id": 1,
  "is_favorite": false,
  "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.web`
};

export const mockReviews = [
  {
    "id": 1,
    "user": {
      "id": 13,
      "name": `Zak`
    },
    "rating": 1.4,
    "comment": `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    "date": `2021-03-07T08:04:28.658Z`
  },
  {
    "id": 2,
    "user": {
      "id": 17,
      "name": `Emely`
    },
    "rating": 7.2,
    "comment": `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    "date": `2021-02-22T08:04:28.658Z`
  }
];

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_GENRE,
      payload: `comedy`
    };

    expect(setGenre(`comedy`)).toEqual(expectedAction);
  });

  it(`Action creator for getting all movies returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GET_ALL_MOVIES,
      payload: [mockMovie]
    };

    expect(getAllMovies([mockMovie])).toEqual(expectedAction);
  });

  it(`Action creator to require authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });

  it(`Action creator for logged in data returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOGGED_IN,
      payload: {
        email: `email@mail.com`,
        avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`
      }
    };

    expect(loggedIn(`email@mail.com`, `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/3.jpg`)).toEqual(expectedAction);
  });

  it(`Action creator to redirect to route returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/redirected-route`
    };

    expect(redirectToRoute(`/redirected-route`)).toEqual(expectedAction);
  });

  it(`Action creator to get film returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GET_FILM,
      payload: mockMovie
    };

    expect(getFilm(mockMovie)).toEqual(expectedAction);
  });

  it(`Action creator to get reviews returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GET_REVIEWS,
      payload: mockReviews
    };

    expect(getReviews(mockReviews)).toEqual(expectedAction);
  });

  it(`Action creator to get promo movie returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GET_PROMO_FILM,
      payload: mockMovie
    };

    expect(getPromoMovie(mockMovie)).toEqual(expectedAction);
  });

  it(`Action creator to set favorite movie returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_MOVIE_FAVORITE,
      payload: {
        movieId: 1,
        isFavorite: true
      }
    };

    expect(setMovieFavorite(1, true)).toEqual(expectedAction);
  });
});
