const e = require("express");
const db = require("./db");
const axios = require("./fetcher");

const {
  getNextFixture,
  setNextFixture,
  getFixture,
  setFixture,
  getStatsOfFixture,
  setStatsOfFixture,
  getLeagueStandings,
  setLeagueStandings,
  setFixtureAnalysis,
  getFixtureAnalysis,
} = require("./in-memory");

const basicOptions = {
  params: { timezone: "Europe/London" },
  headers: {
    "x-rapidapi-key": "dc11f843f2mshfd6c8fc3cbc3d35p1342e8jsn4835f270c82a",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
};

const getTeams = async () => {
  const res = await db.query(
    "SELECT id, league_id, team_name, team_logo FROM public.team;"
  );
  return res.rows;
};

const getTeam = async (id) => {
  const res = await db.query(
    "SELECT id, league_id, team_name, team_logo FROM public.team where id=$1;",
    [id]
  );
  return res.rows[0] || null;
};

const getContests = async () => {
  const res = await db.query("SELECT id, contest_name FROM public.contest;");
  return res.rows;
};

const getContest = async (contestId) => {
  const res = await db.query(
    "SELECT id, contest_name FROM public.contest WHERE id=$1;",
    [contestId]
  );
  return res.rows || null;
};
const addUser = async () => {
  //post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image}
  return;
};
const signIn = async () => {
  //post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image}
  return;
};

// const getUser = async (userId) => {
//   const res = await db.query(
//     "SELECT id, name, password, email, image FROM public.users WHERE id=$1;",
//     [userId]
//   );
//   return res.rows;
// };

const getNextFixtures = async (leagueId, limit = 10) => {
  const result = getNextFixture(leagueId);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `fixtures/league/${leagueId}/next/${limit}`,
      });
      setNextFixture(leagueId, data.api.fixtures);
      return data.api.fixtures;
    } catch (e) {
      console.log("error");
      throw e;
    }
  }

  console.timeEnd("getNextFixture");
  return result;
};

const getFixtureInfo = async (fixtureId) => {
  const result = getFixture(fixtureId);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `fixtures/id/${fixtureId}`,
      });
      setFixture(fixtureId, data.api.fixtures[0]);
      return data.api.fixtures[0];
    } catch (e) {
      console.error("getFixture error", e);
      throw e;
    }
  }

  return result;
};
const getFixtureStats = async (fixtureId) => {
  const result = getStatsOfFixture(fixtureId);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `predictions/${fixtureId}`,
      });
      setStatsOfFixture(fixtureId, data.api.predictions[0]);
      return data.api.predictions[0];
    } catch (e) {
      console.error("getFixtureStats error", e);
      throw e;
    }
  }

  return result;
};

const getStandings = async (leagueId) => {
  const result = getLeagueStandings(leagueId);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `leagueTable/${leagueId}`,
      });
      setLeagueStandings(leagueId, data.api.standings[0]);
      return data.api.standings[0];
    } catch (e) {
      console.error("getStandings error", e);
      throw e;
    }
  }

  return result;
};

const getUser = async (userMail, userPassword) => {
  console.log(userMail, userPassword);
  const res = await db.query(
    "SELECT id, name, password, email, image FROM public.users WHERE email=$1 and password=$2",
    [userMail, userPassword]
  );
  return res.rows;
};

const addAnalysis = async (userId, analysis) => {
  //post to user_analysis table
  // {userId: ??? fixtureId: req.body.fixtureId, title: req.body.title, pick: req.body.pick , analysis: req.body.analysis,  confidence: req.body.confidence,  likes: null, date: new Date()}
  //add the analysis to the database
  console.log(analysis.fixtureId);

  setFixtureAnalysis(analysis);
  //add to db
  const post = await db.query(
    "INSERT INTO public.user_analysis( id, user_id, fixture_id, pick, analysis, date, likes, title, league_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
    [
      //change to proper pgadmin key
      Math.random() * 1000,
      userId,
      analysis.fixtureId,
      analysis.pick,
      analysis.analysis,
      new Date(),
      0,
      analysis.title,
    ]
  );
  return post;
};

const getAnalysis = async (fixtureId) => {
  const result = getFixtureAnalysis(fixtureId);
  if (!result) {
    try {
      const res = await db.query(
        "SELECT id, user_id, fixture_id, pick, analysis, date, likes, title, league_id FROM public.user_analysis WHERE fixture_id=$1;",
        [fixtureId]
      );
      return res.rows;
    } catch (e) {
      console.error("getAnalysis error", e);
      throw e;
    }
  }
};

module.exports = {
  getTeams,
  getTeam,
  getContests,
  getContest,
  addUser,
  signIn,
  getUser,
  addAnalysis,
  getNextFixtures,
  getFixtureInfo,
  getFixtureStats,
  getStandings,
  getAnalysis,
};
