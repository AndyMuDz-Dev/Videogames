// reducer.js
import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  SET_CURRENT_PAGE,
  SET_ITEMS,
  SET_TOTAL_PAGES,
} from './action';

const initialState = {
  introGames: [],
  genres: [],
  currentPage: 1,
  totalPages: 1,
  items: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GAMES:
      return { ...state, introGames: payload };

    case GET_ALL_GENRES:
      return { ...state, genres: payload };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };

    case SET_TOTAL_PAGES:
      return { ...state, totalPages: payload };

    case SET_ITEMS:
      return { ...state, items: payload };

    default:
      return state;
  }
};

export default rootReducer;
