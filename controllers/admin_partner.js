const Partner= require('../models/partners');
const User= require('../models/user');
const {cloudinary} = require('../cloudinary');

//showing the partner admin dashboard
module.exports.showAdminPartner=async(req, res) => {
   
    const partner=await Partner.find({});
  //  console.log(mentor);
    const user=await User.find({});
    res.render('partner/view_admin_partner',{partner,user});
};

//rendering the new partner form
module.exports.renderPartnerForm=(req,res)=>{
    res.render('partner/new_partner.ejs');
};

//adding the new partner 
module.exports.addNewPartner=async(req,res)=>{
    const partner = new Partner(req.body.partner);

    //console.log(req.files);
    partner.author=req.user._id;
    const userId=req.user._id;
    partner.images=req.files.map(f=>({url:f.path,filename:f.filename}));
    partner.uploader=req.user.username;
    await partner.save();
    return res.redirect(('/'+String(userId)+'/admin/partner'));
};

//showing the partner from partner table panel
module.exports.showPartner=async(req,res)=>{
    const {userId}=req.params;
    const partner=await Partner.findById(req.params.id);
    if(!partner){
        return res.redirect(('/'+String(userId)+'/admin/partner'));
    }
    res.render('partner/show_partner.ejs',{partner}); 
};

//rendering edit form of partner 
module.exports.renderEditForm=async(req,res)=>{
    const {id,userId}=req.params;
    const partner=await Partner.findById(id);
    if(!partner){
        // req.flash('error', `We cannot find that note. It could already be deleted, or maybe the ID in the URL is incorrect.`);
        return res.redirect(('/'+String(userId)+'/admin/partner'));
    }
    res.render("partner/edit_partner.ejs",{partner});
};

//adding the edited form
module.exports.addEditPartner=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user._id;
    const partner=await Partner.findByIdAndUpdate(id,{...req.body.partner});
   
    if (req.files.length) {
      //  console.log('Adding new images:', req.files);
        const imgs = req.files.map(img => ({
            url: img.path,
            filename: img.filename
        }));
        partner.images.push(...imgs);
    }

    await partner.save();
    const deletables = req.body.deleteImages;
    if (deletables) {
        for (let fileName of deletables) {
            await cloudinary.uploader.destroy(fileName);
         //   console.log('Destroyed: ', fileName);
        }

        await partner.updateOne({
            $pull: {
                images: {
                    filename: {
                        $in: deletables
                    }
                }
            }
        });

       // console.log('DELETED:', deletables);
    }

    // req.flash('success', `Successfully edited ${ note.title }.`);
   
    return res.redirect(('/'+String(userId)+'/admin/partner'));
};

// deleting the partner from partners table
module.exports.deletePartner=async(req,res)=>{
    const {id,userId} = req.params;
   // console.log('deleting ID:', id);

    const partner = await Partner.findById(id);
    for (let img of partner.images) {
        await cloudinary.uploader.destroy(img.filename);
     //   console.log('Destroyed:', img.filename);
    }
    await Partner.findByIdAndDelete(id);
    
    return res.redirect(('/'+String(userId)+'/admin/partner'));
};