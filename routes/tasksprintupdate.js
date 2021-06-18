var express = require('express');
var router = express.Router();
const {Squad, Sprint, Backlogitem, Backlog} = require('../db/models');
/* GET home page. */
// router.get('/', async (req, res, next)=> {
//   const squads = await Squad.findAll({})
//   res.render('squad', { squads });
// });

router.post("/", async (req, res) => {
  console.log(req.body.id, req.body.status);
  const update_task = await Backlogitem.findByPk(req.body.id);
  await update_task.update({ SprintId: req.body.status });
});


module.exports = router;
