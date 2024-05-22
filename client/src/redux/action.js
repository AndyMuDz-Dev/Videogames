import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_ITEMS = 'SET_ITEMS';

const PAGE_SIZE = 15;

export const getAllGames = () => async (dispatch) => {
  try {
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
