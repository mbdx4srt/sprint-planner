const {sequelize} = require('./db');
const {Squad, Sprint, Backlogitem, Backlog} = require('./models');
const fsp = require('fs').promises;
const path = require('path');

function resetDB() {
    return sequelize.sync({force: true});
}

async function loadfiles(fn) {
    const filePath = path.join(__dirname, fn);
    const buffer = await fsp.readFile(filePath);
    return JSON.parse(String(buffer));
}

async function db_only() {
    await resetDB();
}

async function populateDB() {
    await resetDB();
    const fsprints = await loadfiles('sprints.json');
    const fsquads = await loadfiles('squads.json');
    const fbacklog = await loadfiles('backlog.json');

    for (const fsquad of fsquads) {
        console.debug(fsquad)

        const Zsquad = await Squad.create({
            name: fsquad.name,
            ftes: fsquad.ftes
        })

        c_squad = await Squad.findOne({where: {name: fsquad.name}});

        console.debug(c_squad)

        for (const fsprint of fsprints) {
            var date1 = new Date(fsprint.to);
            var date2 = new Date(fsprint.from);
            // To calculate the time difference of two dates
            var Difference_In_Time = date1.getTime() - date2.getTime();
            // To calculate the no. of days between two dates - add one at the end as these are all midnight to midnight
            var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;
            var capacity = Difference_In_Days * fsquad.ftes
            const sprint = await Sprint.create({
                from: fsprint.from,
                to: fsprint.to,
                capacity: capacity
            })

            await sprint.setSquad(c_squad)

        }
    }

    for (const zbacklog of fbacklog) {
        const curr_bl = await Backlog.create( {
            name: zbacklog.name
        })
        c_squad = await Squad.findOne({where: {name: zbacklog.squad}});
        await curr_bl.setSquad(c_squad)

        for (zitem of zbacklog.items) {
            const curr_bli = await Backlogitem.create( {
                name: zitem.name,
                storypoints: zitem.storypoints,
                pos: zitem.pos,
                description: zitem.description,
                SprintId: zitem.sprintid,
            })
            await  curr_bli.setBacklog(curr_bl)
        }
    }
}


module.exports = {populateDB, db_only};
