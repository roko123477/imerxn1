const express= require('express');
const router=express.Router();

const program= require('../controllers/program');




router.get('/program',(program.showProgram));


module.exports = router;