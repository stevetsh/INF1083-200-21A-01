var express = require('express')
var router = express.Router();

const patients = [
  { firstName: 'Amir Ali', lastName: 'Abdullahi', age: 90, code: '300116685', province: 'ON'},
  { firstName: 'Sylvain Emmanuel', lastName: 'Bitja Makak', age: 91, code: '300122014', province: 'QC'},
  { firstName: 'Leonaldo', lastName: 'Decimus', age: 92, code: '300106677', province: 'AB'},
  { firstName: 'Davidson', lastName: 'Henry', age: 93, code: '300121460', province: 'BC'},
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();

  if (query) {
    const foundPatients = patients.filter(
      (patient) => 
        patient.code.toLowerCase().indexOf(query) != -1 || 
        patient.firstName.toLowerCase().indexOf(query) != -1 ||
        patient.lastName.toLowerCase().indexOf(query) != -1
      );
    return res.status(200).json(foundPatients);
  }

  return res.status(200).json(patients);
});

router.post('/', (req, res) => {
  let patient = req.body;
  let foundPatients = patients.find(each => each.code === patient.code);

  if (foundPatients) {
    return res.status(400).json({msg: 'Patient with code ' + patient.code + ' already exists'});
  }

  patients.push(patient);

  return res.status(200).json({msg: 'Patient with code ' + patient.code + ' successfully created'});
});

router.patch('/:code', (req, res) => {
  let code = req.params.code;
  let foundPatient = patients.find(each => each.code === code);

  if (foundPatient) {
    foundPatient.favorite = req.body.favorite;
    let msg = 'Patient with code ' + code + ' is now ';
    msg += foundPatient.favorite ? ' favorited.' : ' unfavorited';
    return res.status(200).json({msg: msg});
  }

  return res.status(400).json({msg: 'Patient with code ' + code + ' not found!'});
});

module.exports = router;