const express= require('express');
const router=express.Router();

const how_it_works= require('../controllers/how_it_works');




router.get('/how_it_works',(how_it_works.show_how_it_works));


module.exports = router;