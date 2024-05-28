import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './cards.module.css';
import imgLoading from '../../media/loading.gif';
import defaultImg from '../../media/imgDefault.jpg';

const Cards = () => {
  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) =>
    state.gamesByName.length ? state.gamesByName : state.items
  ); // Utiliza los resultados de la búsqueda si están disponibles, de lo contrario, muestra los juegos normales
  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img src={imgLoading} alt='loading...' className={style.imgLoading} />
      </div>
    );
  }

  return (
    <div className={style.container}>
      {items.map((game) => {
        return (
          <Card
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image || defaultImg}
            genres={game.Genres || game.genres}
          />
        );
      })}
    </div>
  );
};

export default Cards;
