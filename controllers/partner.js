const Partner= require('../models/partners');


module.exports.showPartner=async(req,res)=>{
    const partners=await Partner.find({});
    res.render('partner/Partners.ejs',{partners});
};