const AcademicMentor= require('../models/academic_mentors');


module.exports.showMentor=async(req,res)=>{
    const academicMentors=await AcademicMentor.find({});
    var academics=[];
    var industry=[];
    var peer=[];
    var c=0,c1=0,c2=0;
    for(let mentor of academicMentors){
        if(mentor.type=='academic'){
            academics[c++]=mentor;
        }
        else if(mentor.type==='industry'){
            industry[c1++]=mentor;
        }
        else{
            peer[c2++]=mentor;
        }
       
    }
   // console.log(industry[1]);
    res.render('mentor/mentors.ejs',{academics,industry,peer});
};

