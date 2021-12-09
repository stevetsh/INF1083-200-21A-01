const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()


app.use(cors());
//app.use(bodyParser());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => res.send('Laboratoire : Programmation d’interface graphique!'));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/patients', require('./patients'));

app.listen(3000, () => console.log('Laboratoire : Programmation d’interface graphique listening on port 3000!'));