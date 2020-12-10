const { Pool } = require("pg");

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


const pool = new Pool({
  user: "postgres", //process.env.USER,
  host: "localhost", // process.env.HOST,
  database: "football-n-friends", //process.env.DATABASE,
  password: "Auur.8s88", //process.env.PASSWORD,
  port: 5432,
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


module.exports = {
  query: async (text, params) => pool.query(text, params),
};
