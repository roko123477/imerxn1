const express= require('express');
const router=express.Router();
const catchAsync= require('../utils/catchAsync');
const partner= require('../controllers/partner');



router.get('/partner',catchAsync(partner.showPartner));


module.exports = router;