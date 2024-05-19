const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db');

// Función para obtener todos los videojuegos desde la base de datos
const getVideoGamesFromDB = async () => {
  try {
    const videoGames = await Videogame.findAll({
      include: Genres,
    });
    return videoGames;
  } catch (error) {
    console.error('Error fetching video games from database:', error);
    throw new Error('Error fetching video games from database');
  }
};

// Función para obtener todos los videojuegos desde la API
const getVideoGamesFromAPI = async () => {
  const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    const videoGames = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description || 'No description available',
      platforms: game.platforms.map((p) => p.platform.name).join(', '),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres.map((g) => ({ id: g.id, name: g.name })),
    }));
    return videoGames;
  } catch (error) {
    console.error('Error fetching video games from API:', error);
    throw new Error('Error fetching video games from API');
  }
};

//controlador para obtener los videojuegos...
const getAllVideoGames = async (req, res) => {
  try {
    const dbVideoGames = await getVideoGamesFromDB();
    const apiVideoGames = await getVideoGamesFromAPI();

    // Combinamos los juegos, primero los de la DB y luego los de la API
    const allVideoGames = [...dbVideoGames, ...apiVideoGames];

    res.status(200).json(allVideoGames);
  } catch (error) {
    console.error('Error fetching video games:', error);
    res.status(500).json({ error: 'Error fetching video games' });
  }
};
module.exports = getAllVideoGames;
