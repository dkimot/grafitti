let graffiti = require('../../../graffiti/index.js');
let doberman = require('../../../doberman/auth.js');

graffiti.post('/authenticate', function(req, res) {
  // Authenticate in here.
})

graffiti.get('/', (req, res) => {
  res.statusCode = 200;
  res.end("Hello world!");
});

graffiti.post('/', (req, res) => {
  res.statusCode = 401;
  res.end();
})
