var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const users = [];

router.post('/login', (req, res) => {
  let user = req.body;
  let foundUsers = users.find(
                    each => (each.phone === user.phone || each.email === user.email) && 
                            (each.password === user.password)
                    );

  if (foundUsers) {
    user.login = (user.email) ? user.email : user.phone;
    return res.json({
      msg: 'Successfully logged in',
      token: jwt.sign({user: user.login}, 'SECRET')
    });;
  }

  return res.status(400).json({msg: 'Invalid login or password'});
});

router.post('/register', (req, res) => {
  var user = req.body;
  
  if (!user.phone || user.phone === '')
    return res.status(400).json({msg: 'Invalid data: missing phone'});
  if (!user.email || user.email === '')
    return res.status(400).json({msg: 'Invalid data: missing email'});
  if (!user.password || user.password === '')
    return res.status(400).json({msg: 'Invalid data: missing password'});

  let foundUsers = users.find(
                    each => (each.phone === user.phone || each.email === user.email) && 
                            (each.password === user.password)
                    );

  if (foundUsers) {
    return res.status(400).json({msg: 'User already exists, please login'});
  } else {
    users.push(user);
    return res.json({ msg: 'Successfully created user, please login' });
  }
});

router.get('/get', (req, res) => {

  let token = req.get('X-AUTH-HEADER');
  let user = jwt.decode(token);

  if (user && user.user) {
    let query = (req.query['q'] || '').toLowerCase();

    if (query) {
      let foundUsers = users.filter(
        (user) => 
          user.email.toLowerCase().indexOf(query) != -1 ||
          user.phone.toLowerCase().indexOf(query) != -1
        );
      return res.status(200).json(foundUsers);
    }

    return res.status(200).json(users);
  }

  return res.status(403).json({msg: 'Please login to access this information'});
});


module.exports = router;