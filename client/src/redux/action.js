import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_ITEMS = 'SET_ITEMS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const SET_LOADING = 'SET_LOADING';
export const GET_DETAIL = 'GET_DETAIL';

const PAGE_SIZE = 15;

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const getAllGames = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('http://localhost:3001/videogames');
    const videoGames = response.data;

    dispatch({ type: GET_ALL_GAMES, payload: videoGames });
    dispatch({
      type: SET_TOTAL_PAGES,
      payload: Math.ceil(videoGames.length / PAGE_SIZE),
    });
    dispatch(setItems(videoGames.slice(0, PAGE_SIZE)));
    dispatch({ type: SET_CURRENT_PAGE, payload: 1 });
  } catch (error) {
    console.error('Error fetching video games from backend:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setCurrentPage = (page) => (dispatch, getState) => {
  const { introGames } = getState();
  const startIndex = (page - 1) * PAGE_SIZE;
  const items = introGames.slice(startIndex, startIndex + PAGE_SIZE);

  dispatch({ type: SET_CURRENT_PAGE, payload: page });
  dispatch({ type: SET_ITEMS, payload: items });
};

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const getAllGenres = () => (dispatch) => {
  return axios
    .get('http://localhost:3001/genres')
    .then((res) => {
      dispatch({ type: GET_ALL_GENRES, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const searchByName = (name) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `http://localhost:3001/videogames/name?search=${name}`
      );
      const results = res.data;
      const totalPages = Math.ceil(results.length / PAGE_SIZE);
      dispatch({ type: SEARCH_BY_NAME, payload: { results, totalPages } });
    } catch (error) {
      console.error('Error searching by name:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );

      dispatch({ type: GET_DETAIL, payload: response.data });
    } catch (error) {
      console.log('Error al obtener los detalles', error);
      dispatch(setLoading(false));
    }
  };
};
