const { Videogame, Genres } = require('../db');

const postVideoGame = async (req, res) => {
  try {
    const {
      name,
      descripcion,
      plataformas,
      imagen,
      fechaLanzamiento,
      rating,
      genres,
    } = req.body;

    // validamos que esten todos llenos los datos

    if (
      !name ||
      !descripcion ||
      !plataformas ||
      !imagen ||
      !fechaLanzamiento ||
      !rating ||
      !genres
    ) {
      return res
        .status(400)
        .json({ error: 'Se requieren todos los campos obligatorios' });
    }

    // creamos el videojuegop en la base de datos

    const newVideoGame = await Videogame.create({
      name,
      descripcion,
      plataformas,
      imagen,
      fechaLanzamiento,
      rating,
    });

    // aqui relacionamos los videojuegos con los generos

    await newVideoGame.addGenres(genres);
    return res.status(201).json(newVideoGame);
  } catch (error) {
    console.error('Error al crear el videojuego:', error);
    return res.status(500).json({ error: 'Error al crear el videojuego.' });
  }
};

module.exports = postVideoGame;
