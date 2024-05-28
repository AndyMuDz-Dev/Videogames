import style from './navigation.module.css';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import React from 'react';

const Navigation = () => {
  const history = useHistory();

  const refreshHome = () => {
    history.push('/home'); // Navega a la página principal (/home)
    window.location.reload(); // Recarga la página
  };

  return (
    <div className={style.container}>
      <Link to={'/home'}>
        <button className={style.buttonHome} onClick={refreshHome}>
          Home
        </button>
      </Link>
      <Link to={'/videogames/create'}>
        <button className={style.buttonCreate}>Create New Game</button>
      </Link>
      <SearchBar />
    </div>
  );
};

export default Navigation;
