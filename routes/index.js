var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET site Locations. */
router.get('/locations', function(req, res, next) {
    res.render('locations', { title: 'locations' });
});

router.get('/players', (req, res, next) => {
    res.render('players', { title: 'players' })
})

router.get('/config', (req, res, next) => {
    res.render('config', { title: 'config' })
})



module.exports = router;