if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express=require("express");
const app=express();
const path=require("path");

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ejsMate= require('ejs-mate');

const flash= require('connect-flash');


const ExpressError= require('./utils/ExpressError');
const mentorRoutes = require('./router/mentor');
const adminRoutes = require('./router/admin');
const partnerRoutes = require('./router/partner');
const adminMentorRoutes = require('./router/admin_mentor');
const adminPartnerRoutes = require('./router/admin_partner');
const userRoutes= require('./router/user');
const programRoutes= require('./router/program');
const how_it_worksRoutes= require('./router/how_it_works');

const port = process.env.PORT || 9001;

const dburl=process.env.MONGO_URL; //||'mongodb://localhost:27017/imernx';



mongoose.connect(dburl)
    .then(()=>{
        console.log("Connected to MongoDb");
    })
    .catch(e=>{
        console.log(e);
    });

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public/')));

    
    
const secret =process.env.SECRET || 'thisshouldbeasecret';
    
const store = MongoStore.create({
    mongoUrl: dburl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
    
store.on("error", function(e){
    console.log("session store error",e)
})
    
const sessionConfig={
    store,
    name:'session',
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
           // secure:true,
        expires:Date.now() + (1000*60*60*24),
        maxAge:1000 * 60 * 60 * 24
    }
};
    //this session should come first
app.use(session(sessionConfig));
app.use(flash());    
    
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.use(function(req,res,next){ 
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
});


app.get('/',(req,res)=>{
    
    res.render('index');
});

app.use('/',adminRoutes);
app.use('/',mentorRoutes);
app.use('/:userId/admin/mentor',adminMentorRoutes);
app.use('/',partnerRoutes);
app.use('/:userId/admin/partner',adminPartnerRoutes);
app.use('/',userRoutes);
app.use('/',programRoutes);
app.use('/',how_it_worksRoutes);




app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404));
});

app.use((err, req, res,next)=>{
    const {statusCode =500} = err;
    if(!err.message) err.message='oh no, Something went wrong!';
    res.status(statusCode).render('error.ejs',{err});
    
});

app.listen(port,()=>console.info(`app listening on port ${port}`));
