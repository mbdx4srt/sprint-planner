'use strict'
const { sequelize, DataTypes, Model } = require("./db");
const options = { sequelize, timestamps: false };

// Define Squad
class Squad extends Model {}

Squad.init(
  {
      name: DataTypes.STRING,
      ftes: DataTypes.FLOAT,
  },
  options
);


// Define Sprint
class Sprint extends Model {}

Sprint.init(
  {
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      capacity: DataTypes.FLOAT,
  },
  options
);

Sprint.belongsTo(Squad, {foreignKey: "SquadId"})
Squad.hasMany(Sprint)
// Define the Backlog

class Backlog extends Model {}

Backlog.init(
    {
        name: DataTypes.STRING,
    },
    options
);


Backlog.belongsTo(Squad, {foreignKey: "SquadId"})
Squad.hasOne(Backlog)
// Define the BacklogItems

class Backlogitem extends Model {}

Backlogitem.init(
    {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        storypoints: DataTypes.FLOAT,
        pos: DataTypes.BIGINT
    },
    options
);


//Backlogitem.belongsTo(Squad, {foreignKey: "SquadId"})

Backlogitem.belongsTo(Backlog, {foreignKey: "BacklogId"})
Backlog.hasMany(Backlogitem)
Backlogitem.belongsTo(Sprint, {foreignKey: "SprintId"})
Sprint.hasMany(Backlogitem)







// Board to task relationship
//Board.hasMany(Task, { as: "tasks", foreignKey: "BoardId" });
//Task.belongsTo(Board, { foreignKey: "BoardId" });
// Board to user relationship
//UserBoards = sequelize.define('UserBoards', {})
//Board.belongsToMany(User, {through: UserBoards});
//User.belongsToMany(Board, {through: UserBoards})
// Task to user relationship
//UserTasks = sequelize.define('UserTasks', {})
//Task.belongsTo(User, { foreignKey: "UserId" });
//User.hasMany(Task, { as: "tasks", foreignKey: "UserId" });

module.exports = { Squad, Sprint, Backlogitem, Backlog };
