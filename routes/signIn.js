var express = require('express');
const {signIn} = require('../DAL/footballNFriendsAPI');

var router = express.Router();

router.post('/', async (req, res) => {
  //await addUser()
  ////post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image});
  res.send("Signed In Successfully")
});




module.exports = router;