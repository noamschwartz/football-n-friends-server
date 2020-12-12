var express = require('express');
const {getNextFixtures, getFixtureInfo,getFixtureStats,getStandings} = require('../DAL/footballNFriendsAPI');

var router = express.Router();


router.get('/:fixtureId', async (req, res) => {
  const {fixtureId} = req.params;
  const result = await getFixtureInfo(fixtureId);
  res.json(result);
})

router.get('/stats/:fixtureId', async (req, res) => {
  const {fixtureId} = req.params;
  const result = await getFixtureStats(fixtureId);
  res.json(result);
})

router.get('/league/:leagueId', async (req, res) => {
  const {leagueId} = req.params;
  const result = await getNextFixtures(leagueId, 10);
  res.json(result);
})



router.get('/standings/:leagueId', async (req, res) => {
  const {leagueId} = req.params;
  const result = await getStandings(leagueId);
  res.json(result);
})

module.exports = router;