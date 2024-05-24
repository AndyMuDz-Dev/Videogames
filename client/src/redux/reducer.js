// reducer.js
import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  SEARCH_BY_NAME,
  SET_CURRENT_PAGE,
  SET_ITEMS,
  SET_TOTAL_PAGES,
  SET_LOADING,
  GET_DETAIL,
} from './action';

const initialState = {
  introGames: [],
  genres: [],
  currentPage: 1,
  totalPages: 1,
  items: [],
  gamesByName: [],
  loading: false,
  detailGame: null,
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
    case SEARCH_BY_NAME:
      return {
        ...state,
        gamesByName: payload.results,
        totalPages: payload.totalPages,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detailGame: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
