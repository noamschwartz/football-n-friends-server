const context = {
    nextFixtures: {
        //[leagueId]: {...}
    },
    fixtures: {
        //[fixtureId]: {...}
    },
    fixtureStats: {
        //[fixtureId]: {...}
    },
    leagueStandings: {
        //[leagueId]: {...}
    }
}

const setNextFixture = (leagueId, data) => {
    context.nextFixtures[leagueId] = data;
}

const setFixture = (fixtureId, data) => {
    context.fixtures[fixtureId] = data;
}

const setStatsOfFixture = (fixtureId, stats) => {
    context.fixtureStats[fixtureId] = stats;
}
const setLeagueStandings = (leagueId, data) => {
    context.leagueStandings[leagueId] = data;
}


const getNextFixture = leagueId => context.nextFixtures[leagueId];
const getFixture = fixtureId => context.fixtures[fixtureId];
const getStatsOfFixture = fixtureId => context.fixtureStats[fixtureId];
const getLeagueStandings = leagueId => context.leagueStandings[leagueId];

module.exports = {
    setNextFixture,
    getNextFixture,
    setFixture,
    getFixture,
    setStatsOfFixture,
    getStatsOfFixture,
    setLeagueStandings,
    getLeagueStandings
};