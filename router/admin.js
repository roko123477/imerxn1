const express= require('express');
const router=express.Router();
const admin= require('../controllers/admin');
const {isLoggedIn}= require('../middleware');


router.get('/:userId/admin',isLoggedIn,(admin.showAdmin));


module.exports = router;