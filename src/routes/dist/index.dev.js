"use strict";

var _require = require("express"),
    Router = _require.Router;

var genres = require("../middlewares/genres");

var videogames = require("../middlewares/videogames");

var videogamesId = require("../middlewares/videogameId"); // Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


var router = Router(); // Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", genres);
router.use("/videogames", videogames);
router.use("/videogames", videogamesId);
module.exports = router;