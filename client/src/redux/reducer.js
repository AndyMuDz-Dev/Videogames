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
  CLEAR_DETAIL,
  POST_VIDEO_GAME,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SORT_BY_ALPHABET,
  SORT_BY_RATING,
  PAGE_SIZE,
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
  createdGame: null,
  filteredVideoGames: [],
  genre: 'All',
  source: 'All',
  sortOrder: 'asc',
  sortBy: 'name',
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
    case CLEAR_DETAIL:
      return {
        ...state,
        detailGame: null,
      };
    case POST_VIDEO_GAME:
      return {
        ...state,
        createdGame: payload,
      };
    case FILTER_BY_GENRE:
      const filteredByGenre = state.introGames.filter((game) => {
        // Verificar si game.genres está definido y no es null
        if (game.genres && game.genres.length > 0) {
          const genres = game.genres.map((genre) => genre.name); // Obtener nombres de géneros
          return payload === 'All' ? true : genres.includes(payload);
        }

        // Si game.genres no está definido o es null, retornar false
        return false;
      });

      const totalPagesGenre = Math.ceil(filteredByGenre.length / PAGE_SIZE);
      return {
        ...state,
        genre: payload,
        filteredVideoGames: payload === 'All' ? [] : filteredByGenre,
        totalPages: totalPagesGenre,
      };

    case FILTER_BY_SOURCE:
      const filteredBySource = state.introGames.filter((game) =>
        payload === 'All'
          ? true
          : payload === 'API'
          ? game.fromApi
          : !game.fromApi
      );

      const totalPagesSource = Math.ceil(filteredBySource.length / PAGE_SIZE);
      return {
        ...state,
        source: payload,
        filteredVideoGames: payload === 'All' ? [] : filteredBySource,
        totalPages: totalPagesSource,
      };
    case SORT_BY_ALPHABET:
      const sortedAlphabetically = [...state.introGames].sort((a, b) =>
        payload === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      const totalPagesAlphabet = Math.ceil(
        sortedAlphabetically.length / PAGE_SIZE
      );
      return {
        ...state,
        sortOrder: payload,
        introGames: sortedAlphabetically,
        totalPages: totalPagesAlphabet,
      };

    case SORT_BY_RATING:
      const sortedByRating = [...state.introGames].sort((a, b) =>
        payload === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
      const totalPagesRating = Math.ceil(sortedByRating.length / PAGE_SIZE);
      return {
        ...state,
        sortOrder: payload,
        introGames: sortedByRating,
        totalPages: totalPagesRating,
      };
    default:
      return state;
  }
};

export default rootReducer;
