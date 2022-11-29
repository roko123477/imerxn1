const express= require('express');
const router=express.Router();
const catchAsync= require('../utils/catchAsync');
const mentor= require('../controllers/mentor');



router.get('/mentor',catchAsync(mentor.showMentor));


module.exports = router;