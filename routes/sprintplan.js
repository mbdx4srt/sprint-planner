const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const {Squad, Sprint, Backlogitem, Backlog} = require('../db/models');
/* GET home page. */
const { Op } = require("sequelize");
router.get("/:id", async (req, res, next)=> {
  console.debug(req.params.id)
  const squad = await Squad.findByPk(req.params.id);
  console.debug(squad)
  const backlogs = await squad.getBacklog();
  console.debug(backlogs)
  const backlogid = backlogs.id
  const backlogitems = await backlogs.getBacklogitems({
    where: {
      SprintId: {
        [Op.eq]: null,
      },
    },
  });
  const sprints = await squad.getSprints()
  // console.debug(backlogs)
  // console.debug(backlogitems)
  // console.debug(sprints)
  var board_list = [];


  for (const list of sprints) {
    // console.debug(list)
    // const list_tasks = await backlogitems.findAll({
     const list_tasks = await backlogs.getBacklogitems({
      where: {
        SprintId: {
          [Op.eq]: list.id,
        },
      },
    });
    // console.debug('returns')
    // console.debug(list_tasks)
     var sprint_item = {
       "id" : list.id,
       "from" : dateFormat(list.from, "ddd, d mmm yy"),
       "to" : dateFormat(list.to,"ddd, d mmm yy"),
       "capacity" : list.capacity,
       "tasks" : list_tasks
     }
     console.debug(sprint_item)
     board_list.push(sprint_item)

    // board_list[list] = list_tasks;
  }
  console.log(board_list);

 res.render('board', { board_list, backlogitems, backlogid});
});

module.exports = router;
