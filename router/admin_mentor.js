const express= require('express');
const router=express.Router();
const catchAsync= require('../utils/catchAsync');
const admin_mentor= require('../controllers/admin_mentor');
const {isLoggedIn,ValidateMentor}= require('../middleware');
const multer  = require('multer');
const {storage}= require('../cloudinary');
const upload = multer({storage});

router.get('/',isLoggedIn,(admin_mentor.showAdminMentor));
router.get('/new',isLoggedIn,(admin_mentor.renderMentorForm));
router.post('/new',isLoggedIn,upload.array('image'),ValidateMentor,(admin_mentor.addNewMentor));
router.get('/:id',isLoggedIn,catchAsync(admin_mentor.showMentor));
router.get('/:id/edit',isLoggedIn,catchAsync(admin_mentor.renderEditForm));
router.put('/:id',isLoggedIn,upload.array('image'),ValidateMentor,catchAsync(admin_mentor.addEditMentor));
router.delete('/:id',isLoggedIn,catchAsync(admin_mentor.deleteMentor));

module.exports = router;

