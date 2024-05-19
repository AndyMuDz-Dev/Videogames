const axios = require('axios');
require('dotenv').config();
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;
const { validate: isUUID } = require('uuid');

const getVideoGameDetail = async (req, res) => {
  const { idVideogame } = req.params; // Obtener el ID del videojuego de los parámetros de la solicitud

  try {
    let videoGameDetail;

    if (isUUID(idVideogame)) {
      // Si el ID es un UUID válido, buscar en la base de datos
      const dbVideoGame = await Videogame.findByPk(idVideogame, {
        include: Genres, // Incluir los datos de los géneros
      });

      if (dbVideoGame) {
        // Si está en la base de datos, mostramos los detalles
        videoGameDetail = dbVideoGame.toJSON();
      } else {
        // Si no está en la base de datos, obtener detalles de la API
        const apiResponse = await axios.get(
          `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
        );

        const apiData = apiResponse.data;

        videoGameDetail = {
          id: apiData.id,
          name: apiData.name,
          description: apiData.description_raw || 'No description available',
          platforms: apiData.platforms.map((p) => p.platform.name).join(', '),
          image: apiData.background_image,
          released: apiData.released,
          rating: apiData.rating,
          genres: apiData.genres.map((g) => ({ id: g.id, name: g.name })),
        };
      }
    } else {
      // Si el ID no es un UUID válido, directamente obtener detalles de la API
      const apiResponse = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );

      const apiData = apiResponse.data;

      videoGameDetail = {
        id: apiData.id,
        name: apiData.name,
        description: apiData.description_raw || 'No description available',
        platforms: apiData.platforms.map((p) => p.platform.name).join(', '),
        image: apiData.background_image,
        released: apiData.released,
        rating: apiData.rating,
        genres: apiData.genres.map((g) => ({ id: g.id, name: g.name })),
      };
    }

    // Devolvemos los detalles del videojuego
    res.status(200).json(videoGameDetail);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ error: 'Videojuego no encontrado en la API' });
    }
    console.error('Error al obtener los detalles del videojuego:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener los detalles del videojuego' });
  }
};

module.exports = getVideoGameDetail;
