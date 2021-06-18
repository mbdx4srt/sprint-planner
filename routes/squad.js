var express = require('express');
var router = express.Router();
const {Squad, Sprint, Backlogitem, Backlog} = require('../db/models');
/* GET home page. */

router.get('/', async (req, res, next)=> {
  const squads = await Squad.findAll({})
  res.render('squad', { squads });
});

module.exports = router;
