const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
app.use(cors());
app.use(bodyParser());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/stock', require('./stocks'));

app.listen(3001, () => console.log('Example app listening on port 3000!'));