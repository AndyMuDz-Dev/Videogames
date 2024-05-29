import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './cards.module.css';
import imgLoading from '../../media/loading.gif';
import defaultImg from '../../media/imgDefault.jpg';

const Cards = () => {
  const loading = useSelector((state) => state.loading);
  const currentPage = useSelector((state) => state.currentPage);
  const introGames = useSelector((state) => state.introGames);
  const pageSize = 15; // Tamaño de la página

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img src={imgLoading} alt='loading...' className={style.imgLoading} />
      </div>
    );
  }

  // Calculamos los índices de inicio y fin para los juegos de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, introGames.length);
  const gamesToShow = introGames.slice(startIndex, endIndex);

  return (
    <div className={style.container}>
      {gamesToShow.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          background_image={game.background_image || defaultImg}
          // Nos aseguramos de que ambos genres y Genres sean arrays antes de acceder a ellos
          genres={(game.genres || []).concat(game.Genres || [])}
        />
      ))}
    </div>
  );
};

export default Cards;
