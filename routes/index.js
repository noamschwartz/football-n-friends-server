var express = require('express');


const {getNextFixtures} = require('../DAL/footballNFriendsAPI');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home page!');
});

router.get('/:leagueId', async (req, res) => {
  const contest = await getNextFixtures(req.params.leagueId);
  res.json(contest);
})


module.exports = router;
