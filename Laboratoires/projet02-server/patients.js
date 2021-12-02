var express = require('express')
var router = express.Router();

const patients = [
  { firstName: 'Amir Ali', lastName: 'Abdullahi', age: 90, code: '300116685', province: 'ON'},
  { firstName: 'Sylvain Emmanuel', lastName: 'Bitja Makak', age: 91, code: '300122014', province: 'QC'},
  { firstName: 'Leonaldo', lastName: 'Decimus', age: 92, code: '300106677', province: 'AB'},
  { firstName: 'Davidson', lastName: '300121460', age: 93, code: '300121460', province: 'BC'},
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
    return res.status(400).json({msg: 'Patient avec le code ' + patient.code + ' existe'});
  }

  patients.push(patient);

  return res.status(200).json({msg: 'Patient avec le code ' + patient.code + ' a été crée avec succès!'});
});

router.patch('/:code', (req, res) => {
  let code = req.params.code;
  let foundPatient = patients.find(each => each.code === code);

  if (foundPatient) {
    foundPatient.favorite = req.body.favorite;
    let msg = 'Patient avec le code ' + code + ' est maintenant ';
    msg += foundPatient.favorite ? ' favori.' : ' non-favori';
    return res.status(200).json({msg: msg});
  }

  return res.status(400).json({msg: 'Patient avec le code ' + code + ' n\'a pas été trouvé!'});
});

module.exports = router;