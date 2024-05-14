const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame } = require('../db');
const { Op } = require('sequelize');

const getVideoGameName = async (req, res) => {
  try {
    //aqui obtenemos los datos de busqueda

    const { search } = req.query;
    //aqui podemos verificar si escribieron algo en la busqueda o no

    if (!search) {
      return res
        .status(400)
        .json({ error: 'Debe proporcionar un término de búsqueda' });
    }

    // aqui buscamos en la bd los juegos que coincidan con el termino de busqueda.

    const dbResults = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`, // Aquí buscamos por el nombre
        },
      },
      limit: 15, //limitamos a 15
    });

    if (dbResults.length > 0) {
      return res.status(200).json(dbResults);
    }

    //si no estan en la base de datos, buscamos en la API

    const response = await axios.get(
      `https://api.rawg.io/api/games?search=${search}&page_size=15&key=${API_KEY}`
    );

    const apiResults = response.data.results;

    if (apiResults.length > 0) {
      return res.status(200).json(apiResults);
    } else {
      return res.status(404).json({
        message:
          'No se encontraron videojuegos con el término de búsqueda proporcionado',
      });
    }
  } catch (error) {
    console.error('Error al buscar videojuegos por nombre:', error);
    return res
      .status(500)
      .json({ error: 'Error al buscar videojuegos por nombre.' });
  }
};

module.exports = getVideoGameName;
