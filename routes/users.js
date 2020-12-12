var express = require("express");

const { getUser } = require("../DAL/footballNFriendsAPI");

const configRoutes = (router) => {
  router.get("/", function (req, res, next) {
    res.send("respond with a resource");
  });

  router.get("/sign-up", async (req, res, next) => {
    //await addUser()
    ////post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image});
    res.send("UserAdded");
  });

  router.post("/sign-in", async (req, res, next) => {
    //1 - validate user details against db
    //2 - get user details from db
    //3 - initiate cookie containing her id, name and email
    //4 - send back user details (Notice the private data) or false (with status 403)
    //5 - On CLIENT -
    //    5.1 - if error - show appropriate message to the user ('Incorrect email or password')
    //    5.2 - if ok    - redirect to home page
    //          5.2.1 - Show on the navbar - welcome <username>
    //          5.2.2 - Show on the navbar  logout button
    const [user] = await getUser(req.body.email, req.body.password);

    if (!user) {
      res.status(403).send(false);
      return;
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
    res.cookie("user", JSON.stringify(userData), { encode: String });
    res.json("user:" + req.cookies.user);
    // .send(req.cookies.user);
  });

  router.get("/my-profile", async (req, res, next) => {
    const user = await getUser(req.params.id);
    res.json(user);
  });

  router.post("/logout", async (req, res, next) => {
    res.cookie("user", "", { expire: Date.now() - 50000 });
    res.status(200).json(true);
  });

  return router;
};

module.exports = configRoutes;
