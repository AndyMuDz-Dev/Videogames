const axios = require('axios');
require('dotenv').config();
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;

const getVideoGameDetail = async (req, res) => {
  const { idVideogame } = req.params; // Obtener el ID del videojuego de los parámetros de la solicitud

  try {
    const videoGameId = parseInt(idVideogame);

    if (isNaN(videoGameId)) {
      // Si el ID no es un número válido, devolver un error
      return res.status(400).json({ error: 'ID de videojuego no válido' });
    }

    let videoGamesDetail;

    //verificamos si el id corresponde a la api o a la base de datos:

    const dbVideoGame = await Videogame.findByPk(idVideogame, {
      include: Genres, // aqui incluimos los datos de los generos.
    });

    if (dbVideoGame) {
      // si esta en la base de datos mostrar los detalles

      videoGamesDetail = dbVideoGame.toJSON();
    } else {
      // Si no está en la base de datos, obtener detalles de la API
      const apiResponse = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      //   https://api.rawg.io/api/games?key=${API_KEY}
      videoGamesDetail = apiResponse.data;
    }

    //devolvemos los detalles del videojuego

    res.status(200).json(videoGamesDetail);
  } catch (error) {
    console.error('Error al obtener los detalles del videojuego:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener los detalles del videojuego' });
  }
};

module.exports = getVideoGameDetail;
