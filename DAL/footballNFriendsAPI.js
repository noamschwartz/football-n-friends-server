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
  setLeagueStandings
} = require("./in-memory");


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
  const res = await db.query(
    "SELECT id, contest_name FROM public.contest;"
  );
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

const addAnalysis = async (analysis) => {
  //post to user_analysis table
  // {userId: ??? fixtureId: req.body.fixtureId, title: req.body.title, pick: req.body.pick , analysis: req.body.analysis,  confidence: req.body.confidence,  likes: null, date: new Date()}
  //add the analysis to the database
  return (analysis);
};

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
  }

  const getUser = async (userMail, userPassword) => {
    
    const res = await db.query(
      "SELECT id, name, password, email, image FROM public.users WHERE email=$1 and password=$2",
      [userMail, userPassword]
    );
    return res.rows;
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
  getStandings
};
