import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import {
  filterByGenre,
  filterBySource,
  getAllGames,
  sortByAlphabet,
  sortByRating,
} from '../../redux/action';
import style from './navigation.module.css';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleHome = () => {
    dispatch(getAllGames()); // Asegura que se carguen todos los juegos al volver a la página de inicio

    history.push('/home');
    window.location.reload();
  };

  const handleFilterByGenre = (event) => {
    dispatch(filterByGenre(event.target.value));
  };

  const handleFilterBySource = (event) => {
    dispatch(filterBySource(event.target.value));
  };

  const handleSortByAlphabet = (event) => {
    dispatch(sortByAlphabet(event.target.value));
  };

  const handleSortByRating = (event) => {
    dispatch(sortByRating(event.target.value));
  };

  return (
    <div className={style.container}>
      <Link to={'/home'} className={style.btnHome}>
        <button className={style.buttonHome} onClick={handleHome}>
          Home
        </button>
      </Link>
      <Link to={'/videogames/create'} className={style.btnHome}>
        <button className={style.buttonCreate}>Create New Game</button>
      </Link>
      <SearchBar />
      <div className={style.filterOptions}>
        <h3>Filter by Genre:</h3>
        <select onChange={handleFilterByGenre}>
          <option value='All'>All</option>
          <option value='Action'>Action</option>
          <option value='Adventure'>Adventure</option>
          <option value='RPG'>RPG</option>
          <option value='Simulation'>Simulation</option>
          <option value='Strategy'>Strategy</option>
        </select>
      </div>
      <div className={style.filterOptions}>
        <h3>Filter by Source:</h3>
        <select onChange={handleFilterBySource}>
          <option value='All'>All</option>
          <option value='API'>API</option>
          <option value='Database'>Database</option>
        </select>
      </div>
      <div className={style.sortOptions}>
        <h3>Sort by:</h3>
        <div className={style.filters}>
          <select onChange={handleSortByAlphabet}>
            <option value='asc'>Alphabet (A-Z)</option>
            <option value='desc'>Alphabet (Z-A)</option>
          </select>
          <select onChange={handleSortByRating}>
            <option value='asc'>Rating (ascendente)</option>
            <option value='desc'>Rating (descendente)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
