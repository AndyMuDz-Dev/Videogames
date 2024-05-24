import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './detail.module.css';
import imgLoading from '../../media/loading.gif';
import { getDetail, setLoading } from '../../redux/action';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.detailGame);
  const loading = useSelector((state) => state.loading);

  const { id } = useParams;

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      dispatch(getDetail(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img src={imgLoading} alt='loading...' className={style.imgLoading} />
      </div>
    );
  }

  if (!gameDetail) {
    return alert('detalle de juego no encontrado');
  }

  return (
    <div className={style.container}>
        <div className={style.detailContainer} key={id}>
          <img className={style.detailImg} src={gameDetail.image} alt='detailImg' />
          <h1 className={style.name}>{gameDetail.name}</h1>
          <p className={style.description}>{gameDetail.description}</p>
         
         <div className={style.descriptFinal}>
             <p className={style.platforms}>
               <span>platforms: </span>
               {gameDetail.platforms}
             </p>
             <p className={style.date}>
               <span>Released: </span>
               {gameDetail.released}
             </p>
             <p className={style.rating}>
               <span>Rating: </span>
               {gameDetail.rating}
             </p>
             <p className={style.genres}>
               <span>Generos: </span>{' '}
               {gameDetail.genres?.map((genre) => genre.name).join(', ')}
             </p>
         </div>
        </div>
        
    </div>  );
};

export default Detail;
