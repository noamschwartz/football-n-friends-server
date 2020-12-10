var express = require("express");
const { addAnalysis } = require("../DAL/footballNFriendsAPI");

const configRoutes = (router) => {
  router.post(
    "/",
    function (req, res, next) {
      if (!Object.keys(req.cookies).length) {
        res.status(401).send("Unauthorized");
        return;
      }
      next();
    },
    async function (req, res) {
      const result = await addAnalysis(req.body);
      res.send(result);
    }
  );

  return router;
};

module.exports = configRoutes;
