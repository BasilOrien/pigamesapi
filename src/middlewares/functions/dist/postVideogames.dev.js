"use strict";

var _process$env = process.env,
    BASE_URL = _process$env.BASE_URL,
    API_KEY = _process$env.API_KEY;

var axios = require("axios");

var _require = require("../../db"),
    Videogame = _require.Videogame,
    Genre = _require.Genre;

module.exports = function _callee2(req, res) {
  var _req$body, name, description, genre, reldate, rating, image, platform, newVideogame;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, genre = _req$body.genre, reldate = _req$body.reldate, rating = _req$body.rating, image = _req$body.image, platform = _req$body.platform;
          console.log(req.body);
          _context2.next = 5;
          return regeneratorRuntime.awrap(Videogame.create({
            name: name,
            description: description,
            reldate: reldate,
            rating: rating,
            image: image,
            platform: platform
          }));

        case 5:
          newVideogame = _context2.sent;
          genre.forEach(function _callee() {
            var gameGenre;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Genre.findAll({
                      where: {
                        name: genre
                      }
                    }));

                  case 2:
                    gameGenre = _context.sent;
                    newVideogame.addGenre(gameGenre).then(function (r) {
                      return console.log("genre added");
                    })["catch"](function (x) {
                      return console.log("Error adding game");
                    });

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          res.json("Game Added Succefull");
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(404).json(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // let url = `${BASE_URL}games?key=${API_KEY}`;
// let queryUrl = `${BASE_URL}games?search=${name}&key=${API_KEY}`;
// const axiosResponse = name
//   ? await axios.get(queryUrl)
//   : await axios.get(url);
// const data = axiosResponse.data;
// const { next, previous } = data;
// const apiResults = data.results.map((result) => {
//   return {
//     name: result?.name,
//     platforms: result?.platforms?.map((p) => {
//       console.log(p, "----------------");
//       return p.platform.name;
//     }),
//     genres: result?.genres.map((g) => g.name),
//     background_image: result?.background_image
//   };
// });
// res.json(apiResults);