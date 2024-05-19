import Card from '../Card/Card';
import style from './cards.module.css';

import React from 'react';

const Cards = (props) => {
  const { videogames } = props;

  return (
    <div className={style.container}>
      {videogames.map((game) => {
        return (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            descripcion={game.descripcion}
            plataformas={game.plataformas}
            imagen={game.imagen}
            fechaLanzamiento={game.fechaLanzamiento}
            rating={game.rating}
          />
        );
      })}
    </div>
  );
};

export default Cards;
