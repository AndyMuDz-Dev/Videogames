const axios = require('axios');

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const getAllGames = () => {
  return function (dispatch) {
    try {
      return axios.get('http://localhost:3001/videogames').then((res) => {
        dispatch({ type: GET_ALL_GAMES, payload: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllGenres = () => {
  return function (dispatch) {
    try {
      return axios.get('http://localhost:3001/genres').then((res) => {
        dispatch({ type: GET_ALL_GENRES, payload: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
};
