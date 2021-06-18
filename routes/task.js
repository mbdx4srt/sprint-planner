var express = require('express');
var router = express.Router();
const {Squad, Sprint, Backlogitem, Backlog} = require('../db/models');
/* GET home page. */
// router.get('/', async (req, res, next)=> {
//   const squads = await Squad.findAll({})
//   res.render('squad', { squads });
// });
router.get("/", async (req, res) => {
  res.render("task");
});

router.post("/", async (req, res) => {
  //    const errors = validationResult(req)
  //    if (!errors.isEmpty()) {
  //        return res.status(400).json({ errors: errors.array() })
  //    }
  console.log(req);
  const task = await Backlogitem.create({
    name: req.body.name,
    description: req.body.description,
    storypoints: req.body.storypoints,
    status: "To Do",
  });
  const board = await Backlog.findByPk(req.body.BoardId);
  await board.addBacklogitem(task);
  const rurl = "/board/".concat(req.body.BoardId);
  res.redirect(rurl);
});
module.exports = router;
