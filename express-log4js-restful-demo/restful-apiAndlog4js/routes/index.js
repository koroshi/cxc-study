var LocalLogger = require('../utils/LocalLogger')
var log = LocalLogger.getLogger("RouterIndex");

let usersRouter = require("./users");
module.exports = (app) => {
  app.get('/', (req, res) => {
  	log.debug('hello index!');
    res.json({ message: 'hello index!'});
  });

  app.use('/api', usersRouter); // 在所有users路由前加/api
};
