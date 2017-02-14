const graffiti = require('./myModules/graffiti/index.js');
const jsonConfig = require('../jsonConfig/index.js');
const routes = require('./lib/routes/routes.js');

jsonConfig.init('./lib/utils/config.json');
graffiti.server(false, 3030, 'localhost');
