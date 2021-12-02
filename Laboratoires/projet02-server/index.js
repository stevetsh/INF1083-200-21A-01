const express = require('express');
const cors = require('cors');
const app = express();
var jwt = require('jsonwebtoken');

const title = 'Projet - Programmation d’une application hybride simple à contenu généré';

app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => res.send(title));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/patients', function(req, res, next) {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);

  if (user && user.user) return next();
  return res.status(403).json({msg: 'Please login to access this information'});
}, require('./patients'));

app.use('/api/users', require('./users'));

app.listen(3000, () => console.log(`${title} listening on port 3000!`));