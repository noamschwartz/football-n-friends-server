const { Client } = require("pg");
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

// FOOTBALL_API=dc11f843f2mshfd6c8fc3cbc3d35p1342e8jsn4835f270c82a
// FOOTBALL_API_HOST=api-football-v1.p.rapidapi.com
const basicOptions = {
  params: { timezone: "Europe/London" },
  headers: {
    "x-rapidapi-key": "dc11f843f2mshfd6c8fc3cbc3d35p1342e8jsn4835f270c82a",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
};

// const config = {
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PGPORT
//   };

const config = {
  user: "postgres", //process.env.USER,
  host: "localhost", // process.env.HOST,
  database: "football-n-friends", //process.env.DATABASE,
  password: "Auur.8s88", //process.env.PASSWORD,
  port: 5432,
};

console.log(config);

const client = new Client(config);

const getTeams = async () => {
  await client.connect();
  const res = await client.query(
    "SELECT id, league_id, team_name, team_logo FROM public.team;"
  );
  await client.end();
  return res.rows;
};

const getTeam = async (id) => {
  await client.connect();
  const res = await client.query(
    "SELECT id, league_id, team_name, team_logo FROM public.team where id=$1;",
    [id]
  );
  await client.end();
  return res.rows[0] || null;
};

const getContests = async () => {
  await client.connect();
  const res = await client.query(
    "SELECT id, contest_name FROM public.contest;"
  );
  await client.end();
  return res.rows;
};

const getContest = async (contestId) => {
  await client.connect();
  const res = await client.query(
    "SELECT id, contest_name FROM public.contest WHERE id=$1;",
    [contestId]
  );
  await client.end();
  return res.rows || null;
};
const addUser = async () => {
  //await client.connect();
  //post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image}
  return;
};
const signIn = async () => {
  //await client.connect();
  //post to users table {name: req.body.name, email:req.body.password, email:req.body.password, image:req.body.image}
  return;
};

const getUser = async (userId) => {
  await client.connect();
  const res = await client.query(
    "SELECT id, name, password, email, image FROM public.users WHERE id=$1;",
    [userId]
  );
  await client.end();
  return res.rows;
};

const addAnalysis = async () => {
  //await client.connect();
  //post to user_analysis table
  // {userId: ??? fixtureId: req.body.fixtureId, title: req.body.title, pick: req.body.pick , analysis: req.body.analysis,  confidence: req.body.confidence,  likes: null, date: new Date()}
  return;
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
