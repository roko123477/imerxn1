const express= require('express');
const router=express.Router();
const catchAsync= require('../utils/catchAsync');
const admin_partner= require('../controllers/admin_partner');
const {isLoggedIn,ValidatePartner}= require('../middleware');
const multer  = require('multer');
const {storage}= require('../cloudinary');
const upload = multer({storage});

router.get('/',isLoggedIn,(admin_partner.showAdminPartner));
router.get('/new',isLoggedIn,(admin_partner.renderPartnerForm));
router.post('/new',isLoggedIn,upload.array('image'),ValidatePartner,(admin_partner.addNewPartner));
 router.get('/:id',isLoggedIn,catchAsync(admin_partner.showPartner));
router.get('/:id/edit',isLoggedIn,catchAsync(admin_partner.renderEditForm));
router.put('/:id',isLoggedIn,upload.array('image'),ValidatePartner,catchAsync(admin_partner.addEditPartner));
 router.delete('/:id',isLoggedIn,catchAsync(admin_partner.deletePartner));
module.exports = router;