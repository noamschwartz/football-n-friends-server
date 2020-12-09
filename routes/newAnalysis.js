var express = require('express');
const {addAnalysis} = require('../DAL/footballNFriendsAPI');

var router = express.Router();

router.post('/', async (req, res) => {
  //await addAnalysis()
  ////post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image});
  res.send("Analysis added")
});




module.exports = router;