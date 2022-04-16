const router = require('express').Router();
let User = require('../models/projects.model');



router.route('/').get((req, res) => {
  User.find({projectselect:"Commercial Projects"})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Hatali: ' + err));
});


//react componenttan axios ile bilgi bu adrese geldi
//models dosyasindan user mongoo modelide buraya import edildi geldi yukaridan 
//simdi ilgili modele donusturulerek server js e gonderildi oradan da mongo atlasa gonderildi.
router.route('/add').post((req, res) => {
  const projectname = req.body.projectname;
  const projectdesc= req.body.projectdesc;
  const projectimage= req.body.projectimage;
  const projectselect= req.body.projectselect;
  const projectlink= req.body.projectlink;

  const newUser = new User({projectname,projectdesc,projectimage,projectselect,projectlink});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;