import React, { useState } from 'react';
import style from './search.module.css';

const SearchBar = (props) => {
  const { onSearch } = props;
  const [name, setName] = useState('');

  const handleChange = (event) => {
    let nameSearch = event.target.value;
    setName(nameSearch);
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
        <button
          className={style.buttonSearch}
          onClick={() => {
            onSearch(name);
            setName(''); // Limpiar el input después de enviar
          }}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
