var express = require('express');
const {getUser} = require('../DAL/footballNFriendsAPI');

var router = express.Router();


router.get('/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
})

module.exports = router;