const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllVideoGames = require('../controllers/getAllVideoGames');
const getVideoGameName = require('../controllers/getVideoGameName');
const getVideoGameDetail = require('../controllers/getVideoGameDetail');
const getAllGenres = require('../controllers/getAllGenres');
const postVideoGame = require('../controllers/postVideoGame');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getAllVideoGames);
router.get('/videogames/name', getVideoGameName);
router.get('/videogames/:idVideogame', getVideoGameDetail);
router.post('/videogames/create', postVideoGame);
router.get('/genres', getAllGenres);

module.exports = router;
