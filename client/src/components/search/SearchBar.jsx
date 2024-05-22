// SearchBar.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './search.module.css';
import { searchByName } from '../../redux/action'; // Importa la acción searchByName

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name === '' || name.charCodeAt(0) === 32)
      return alert('Please, enter a valid videogame name to search');
    dispatch(searchByName(name));
    setName(''); // Limpiar el input después de enviar
  };

  return (
    <div>
      <div className={style.inputContainer}>
        <input
          type='search'
          className={style.inputSearch}
          placeholder='  Search Name'
          onChange={handleChange}
          value={name}
        />
        <button className={style.buttonSearch} onClick={handleSubmit}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
