const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema=mongoose.Schema;

const ImageSchema= new Schema({
    url:String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_30');
});

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    images:[ImageSchema],
    gender:String
});
userSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model('User',userSchema);