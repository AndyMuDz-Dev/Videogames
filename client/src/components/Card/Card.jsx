import { Link } from 'react-router-dom';
import style from './card.module.css';

import React from 'react';

const Card = (props) => {
  const {
    id,
    name,
    descripcion,
    plataformas,
    imagen,
    fechaLanzamiento,
    rating,
  } = props;

  return (
    <div className={style.container}>
      <Link to={`/detail/${id}`} className={style.link}>
        <img src={imagen} alt='imagen card' className={style.imagenCard} />
        <div className={style.description}>
          <h2 className={style.name}>{name}</h2>
          <h2 className={style.desc}>{descripcion} </h2>
          <h2 className={style.plataformas}>{plataformas}</h2>
          <h2 className={style.fechalanza}>{fechaLanzamiento}</h2>
          <h2 className={style.rating}>{rating}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Card;
