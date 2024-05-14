const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getAllVideoGames = async (req, res) => {
  const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    const videoGames = response.data.results;
    res.status(200).json(videoGames);
  } catch (error) {
    console.error('Error fetching video games:', error);
    res.status(500).json({ error: 'Error fetching video games' });
  }
};

module.exports = getAllVideoGames;
