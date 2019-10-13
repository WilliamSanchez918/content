var express = require('express');
var router = express.Router();

/* GET home page. */

// NOT USED AT THE MOMENT, LEFT FOR EXAMPLES
// DEFINE A CUSTOM URL RESPONSE HERE
// SLICE ROUTE IS DEFINED WITHIN index.js
router.get('/slice', function(req, res, next) {
    res.render('slice', { title: 'SLICEME' })
})

module.exports = router;