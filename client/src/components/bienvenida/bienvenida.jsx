import React from 'react';
import style from './bienvenida.module.css';
import imgFondo from '../../media/andres.jpg';

const Bienvenida = () => {
  return (
    <div className={style.container}>
      <img src={imgFondo} alt='gamer' className={style.sobrefondo} />
      <button type='text' className={style.startButton}>
        Press Start
      </button>
    </div>
  );
};

export default Bienvenida;
