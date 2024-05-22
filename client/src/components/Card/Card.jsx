import { Link } from 'react-router-dom';
import style from './card.module.css';

const Card = (props) => {
  const { id, name, background_image, genres } = props;

  return (
    <div className={style.container}>
      <Link to={`/detail/${id}`} className={style.link}>
        <img
          src={background_image}
          alt='imagen card'
          className={style.imagenCard}
        />
        <div className={style.descript}>
          <h2 className={style.name}>{name}</h2>
          <div className={style.genres}>
            <span>Genero: </span> {genres?.map((genre) => genre.name).join(', ')}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
