var express = require('express');
const {getContests, getContest} = require('../DAL/footballNFriendsAPI');

var router = express.Router();

router.get('/', async (req, res) => {
  const contests = await getContests();
  console.log(contests);
  res.json(contests);
});

router.get('/:contestId', async (req, res) => {
    const contest = await getContest(req.params.contestId);
    res.json(contest);
  })


module.exports = router;

