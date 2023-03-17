"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var router = require("express").Router();

var _require = require("../db"),
    Genre = _require.Genre,
    Videogame = _require.Videogame;

var axios = require("axios");

require("dotenv").config();

var _process$env = process.env,
    BASE_URL = _process$env.BASE_URL,
    API_KEY = _process$env.API_KEY;
router.get("/:id", function _callee(req, res) {
  var id, axiosResponse, apiData, dbResponse, a;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.prev = 1;

          if (isNaN(id)) {
            _context.next = 14;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(axios.get("".concat(BASE_URL, "games/").concat(id, "?key=").concat(API_KEY)));

        case 5:
          axiosResponse = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(axiosResponse.data);

        case 8:
          apiData = _context.sent;

          if (!(_typeof(apiData) === "object" && !!Object.keys(apiData).length)) {
            _context.next = 12;
            break;
          }

          res.json(apiData);
          return _context.abrupt("return");

        case 12:
          _context.next = 26;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(Videogame.findByPk(id, {
            include: [{
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: []
              }
            }]
          }));

        case 16:
          dbResponse = _context.sent;

          if (!(_typeof(dbResponse) === "object")) {
            _context.next = 24;
            break;
          }

          a = _objectSpread({}, dbResponse.dataValues, {
            platforms: dbResponse.dataValues.platform,
            comesFromDb: true
          });
          delete a.platform;
          console.log(a);
          res.json(a);
          _context.next = 26;
          break;

        case 24:
          res.json("No se ha encontrado el recurso solicitado");
          return _context.abrupt("return");

        case 26:
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](1);
          res.status(404).json("error en la ruta solicitada");

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 28]]);
});
module.exports = router;