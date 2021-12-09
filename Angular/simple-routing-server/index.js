const express = require('express')
//const bodyParser = require('body-parser');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express()

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
app.use(cors());

// https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
//app.use(bodyParser());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/stock', function(req, res, next) {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({msg: 'Please login to access this information'});
}, require('./stocks'));

app.use('/api/user', require('./user'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));