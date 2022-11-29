const BaseJoi = require('joi');
const ExpressError= require('./utils/ExpressError');
const AcademicMentor= require('./models/academic_mentors');
const Partner= require('./models/partners');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

//validate academic mentor model no one can interfare through postman
module.exports.ValidateMentor=(req, res, next) => {
    const academicMentorSchema=Joi.object({
        academicmentor:Joi.object({
           name: Joi.string().required().escapeHTML(),
           type: Joi.string().required().escapeHTML(),
       //    image: Joi.string().required(),
           department: Joi.string().required().escapeHTML(),
           profession: Joi.string().required().escapeHTML(),
           degree: Joi.string().required().escapeHTML()}).required(),
           deleteImages:Joi.array()
    })
    const {error}=academicMentorSchema.validate(req.body);
    if(error){
             msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
        
};

//validate partner model so that no one can interfare with postman
module.exports.ValidatePartner=(req, res, next) => {
    const partnerSchema=Joi.object({
        partner:Joi.object({
           name: Joi.string().required().escapeHTML(),
           university: Joi.string().required().escapeHTML(),
       //    image: Joi.string().required(),
           founder: Joi.string().required().escapeHTML(),
           }).required(),
           deleteImages:Joi.array()
    })
    const {error}=partnerSchema.validate(req.body);
    if(error){
             msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
        
};






module.exports.isLoggedIn=(req, res, next) => {
   // console.log("req user:",req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error', 'you must be signed in');
        return res.redirect('/login');
    }
    next();
    
};
module.exports.isAdmin=(req, res, next) => {
    // console.log("req user:",req.user);
     if(req.user._id!=req.params.userId){
         
         req.flash('error', 'you dont have permission');
         return res.redirect('/'+String(req.user._id)+"/user");
     }
     next();
     
 };









