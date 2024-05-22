// Cards.js
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './cards.module.css';

const Cards = () => {
  const items = useSelector((state) => state.gamesByName.length ? state.gamesByName : state.items); // Utiliza los resultados de la búsqueda si están disponibles, de lo contrario, muestra los juegos normales
  return (
    <div className={style.container}>
      {items.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          background_image={game.background_image}
          genres={game.genres}
        />
      ))}
    </div>
  );
};

export default Cards;
