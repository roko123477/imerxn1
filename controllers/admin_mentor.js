const AcademicMentor= require('../models/academic_mentors');
const User= require('../models/user');
const {cloudinary} = require('../cloudinary');
var seachWord;
var allmentor={};

//show page of admin mentor
module.exports.showAdminMentor=async(req, res) => {
   
    const mentor=await AcademicMentor.find({});
  //  console.log(mentor);
    const user=await User.find({});
    res.render('mentor/view_admin_mentor',{mentor,user});
};

//new mentor form who(admin) wants to add
module.exports.renderMentorForm=(req,res)=>{
    res.render('mentor/new_mentor.ejs');
};

//saving the new mentor form in database
module.exports.addNewMentor=async(req,res)=>{
    const academic_mentors = new AcademicMentor(req.body.academicmentor);

    //console.log(req.files);
    academic_mentors.author=req.user._id;
    const userId=req.user._id;
    academic_mentors.images=req.files.map(f=>({url:f.path,filename:f.filename}));
    academic_mentors.uploader=req.user.username;
    await academic_mentors.save();
    return res.redirect(('/'+String(userId)+'/admin/mentor'));
};


//displaying the mentor card from mentor dashboard table panel
module.exports.showMentor=async(req,res)=>{
    const {userId}=req.params;
    const mentor=await AcademicMentor.findById(req.params.id);
    if(!mentor){
        return res.redirect(('/'+String(userId)+'/admin/mentor'));
    }
    res.render('mentor/show.ejs',{mentor}); 
};


//rendering the edit form from mentor table button
module.exports.renderEditForm=async(req,res)=>{
    const {id,userId}=req.params;
    const mentor=await AcademicMentor.findById(id);
    if(!mentor){
        // req.flash('error', `We cannot find that note. It could already be deleted, or maybe the ID in the URL is incorrect.`);
        return res.redirect(('/'+String(userId)+'/admin/mentor'));
    }
    res.render("mentor/edit.ejs",{mentor});
};


//updating the mentor edited form
module.exports.addEditMentor=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user._id;
    const mentor=await AcademicMentor.findByIdAndUpdate(id,{...req.body.academicmentor});
   
    if (req.files.length) {
      //  console.log('Adding new images:', req.files);
        const imgs = req.files.map(img => ({
            url: img.path,
            filename: img.filename
        }));
        mentor.images.push(...imgs);
    }

    await mentor.save();
    const deletables = req.body.deleteImages;
    if (deletables) {
        for (let fileName of deletables) {
            await cloudinary.uploader.destroy(fileName);
         //   console.log('Destroyed: ', fileName);
        }

        await mentor.updateOne({
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
   
    return res.redirect(('/'+String(userId)+'/admin/mentor'));
};


//dleting the mentor from mentor table
module.exports.deleteMentor=async(req,res)=>{
    const {id,userId} = req.params;
   // console.log('deleting ID:', id);

    const mentor = await AcademicMentor.findById(id);
    for (let img of mentor.images) {
        await cloudinary.uploader.destroy(img.filename);
     //   console.log('Destroyed:', img.filename);
    }
    await AcademicMentor.findByIdAndDelete(id);
    
    return res.redirect(('/'+String(userId)+'/admin/mentor'));
};

