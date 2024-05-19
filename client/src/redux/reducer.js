import { GET_ALL_GAMES, GET_ALL_GENRES } from './action';

const initialState = {
  introGames: [],
  genres: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GAMES:
      return { ...state, introGames: payload };

    case GET_ALL_GENRES:
      return { ...state, genres: payload };

    default:
      break;
  }
};

export default rootReducer;
