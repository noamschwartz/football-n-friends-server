const indexRouter = require('./index');
const teamsRouter = require('./teams');
const contestRouter = require('./contests');
const fixturesRouter = require('./fixtures');
const configRoutes = router => {
    router.use('/', indexRouter);
    router.use('/users', require('./users')(router));
    router.use('/teams', teamsRouter);
    router.use('/contests', contestRouter);
    router.use('/new-analysis', require('./new-analysis')(router));
    router.use('/fixtures', fixturesRouter);

}

module.exports = configRoutes;