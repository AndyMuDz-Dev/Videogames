const { Videogame, Genres } = require('../db');

const postVideoGame = async (req, res) => {
  try {
    const { name, description, platforms, image, released, rating, genres } =
      req.body;

    //acomodamos el array de plataformas:

    const platformsGroup = platforms.join(', ');

    // validamos que esten todos llenos los datos

    if (
      !name ||
      !description ||
      !platforms ||
      !image ||
      !released ||
      !rating ||
      !genres
    ) {
      return res
        .status(400)
        .json({ error: 'Se requieren todos los campos obligatorios' });
    }

    // creamos el videojuegop en la base de datos

    await Videogame.create({
      name,
      description,
      platforms: platformsGroup,
      image,
      released,
      rating,
    });

    // aqui relacionamos los videojuegos con los generos
    const createdGame = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    let parsedGenres = genres.map((g) => JSON.parse(g));

    const addedGenres = await parsedGenres.map((g) =>
      createdGame.addGenres(g.id)
    );

    await Promise.all(addedGenres);

    return res.status(201).send('Video Juego Creado Correctamente');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = postVideoGame;
