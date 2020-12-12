var express = require("express");
const { addAnalysis } = require("../DAL/footballNFriendsAPI");

const configRoutes = (router) => {
  router.post(
    "/",
    function (req, res, next) {
      if (!(req.cookies.user)) {
        res.status(401).send("Unauthorized");
        return;
      }
      next();
    },
    async function (req, res) {
      const result = await addAnalysis(JSON.parse(req.cookies.user).id, req.body.analysis);
      res.send(result);
    }
  );

  return router;
};

module.exports = configRoutes;
