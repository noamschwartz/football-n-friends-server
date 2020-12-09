var express = require('express');
const {getTeams, getTeam} = require('../DAL/footballNFriendsAPI');

var router = express.Router();

router.get('/', async (req, res) => {
  const teams = await getTeams();
  console.log(teams);
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await getTeam(req.params.id);
  res.json(team);
})

module.exports = router;
