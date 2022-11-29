const User = require('../models/user');

// module.exports.renderRegister=(req, res) => {
//     res.render('user/register');
// };

// module.exports.createNewUser=async (req,res,next)=>{
    
//     try {
//         const {email, username,password,gender,images} = req.body;
        
//         //console.log(req.files);
//       //  console.log(images);
//         const user=new User({email, username, gender,images});
//         user.images=req.files.map(f=>({url:f.path,filename:f.filename}));
//         const registerUser=await User.register(user,password);
//         const userId=user._id;
//       //  console.log(user);
//        req.login(registerUser,err =>{
//        if(err){
//             return next(err);
//         }
       
//         return res.redirect(('/'+String(userId)+'/admin'));
//        });
        
//     }
//     catch(e){
//         console.log(e);
       
//         return res.redirect('/register');
//     }
// };

module.exports.renderLogin=(req,res)=>{
    if(req.user)
        res.redirect(('/'+String(req.user._id)+'/admin'));
    else
    res.render('user/login');
    
};



module.exports.userLogin=(req,res)=>{
    req.flash('success', 'Welcome back');
    const userId=req.user._id;
    const redirectUrl= (req.session.returnTo || ('/'+String(userId)+'/admin'));
    delete req.session.returnTo;
    return res.redirect(redirectUrl);
};
module.exports.renderChangePassword=(req, res)=>{
    const{userId}=req.params;
    res.render('user/changepassword',{userId});
};
module.exports.changepassword=async(req,res)=>{
    const {userId}=req.params;
    const{oldpassword,newpassword}=req.body;
    const user=await User.findById(userId);
    await user.changePassword(oldpassword,newpassword);
    req.flash('successufully changed password');
    res.redirect('/'+String(userId)+'/user');
};
// show page of user
module.exports.showUser=async(req,res)=>{
    const {userId}=req.params;
    const user=await User.findById(userId);
    if(!user){
        return res.redirect(('/register'));
    }
    res.render('user/show.ejs',{user}); 
};

module.exports.renderUser=async(req,res)=>{
    const {userId}=req.params;
    const user=await User.findById(userId);
    if(!user){
        return res.redirect(('/register'));
    }
    res.render('user/edit',{user});
};


module.exports.userLogout=(req,res)=>{
    req.logout(function(err) {
         req.flash('success', 'Logout Success');
        if (err) { return next(err); }
        
       return res.redirect('/login');
    });
};