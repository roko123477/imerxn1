const express= require('express');
const userController= require('../controllers/user')
const passport = require('passport');
const router = express.Router();
const catchAsync= require('../utils/catchAsync');
const { isLoggedIn,isAdmin } = require('../middleware');
//if register is needed
// const multer  = require('multer');
// const {storage}= require('../cloudinary');
// const upload = multer({storage});

//rendering the new user register
// router.get('/register', userController.renderRegister);
// //adding the new user
// router.post('/register',upload.array('image'),catchAsync(userController.createNewUser));
//rendering the login form
 router.get('/login',userController.renderLogin);

 // keepSessionInfo is used to redirect back to page
 //logged in user
 router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login',failureMessage: true,keepSessionInfo: true}),userController.userLogin);

router.get('/:userId/user',catchAsync(userController.showUser));
router.get('/:userId/user/changepassword',isLoggedIn,isAdmin,(userController.renderChangePassword));
router.post('/:userId/user/changepassword',isLoggedIn,isAdmin,catchAsync(userController.changepassword));
 //logout user
 router.get('/logout',userController.userLogout);

module.exports = router;