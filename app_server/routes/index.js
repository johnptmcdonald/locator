var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var othersController = require('../controllers/others');

/* Locations */
router.get('/', locationsController.index);
router.get('/location', locationsController.show);
router.get('/location/review/new', locationsController.make);

/* Other */
router.get('/about', othersController.about);

module.exports = router;

