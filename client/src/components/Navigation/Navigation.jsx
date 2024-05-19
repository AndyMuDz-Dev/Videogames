import style from './navigation.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import React from 'react';

const Navigation = (props) => {
  const { onSearch } = props;

  return (
    <div className={style.container}>
      <Link to={'/home'}>
        <button className={style.buttonHome}>Home</button>
      </Link>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Navigation;
