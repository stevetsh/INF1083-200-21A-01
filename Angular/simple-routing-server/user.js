var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var users = {};

router.post('/login', (req, res) => {
  var user = req.body;
  if (users[user.username] && users[user.username] === user.password) {
    res.json({
      msg: 'Successfully logged in',
      token: jwt.sign({user: user.username}, 'SECRET')
    });
  } else {
    res.status(400).json({msg: 'Invalid username or password'});
  }
});

router.post('/register', (req, res) => {
  var user = req.body;
  if (users[user.username]) {
    res.status(400).json({msg: 'User already exists, please login.'});
  } else {
    users[user.username] = user.password;
    res.json({
      msg: 'Successfully created user, please login'
    });
  }
});

router.get('/get', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();

  if (query) {
    const foundUsers = users.filter(
      (user) => 
        user.username.toLowerCase().indexOf(query) != -1
      );
    return res.status(200).json(foundUsers);
  }

  return res.status(200).json(users);
});


module.exports = router;