const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema= new Schema({
    url:String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

ImageSchema.virtual('photo').get(function () {
    return this.url.replace('/upload', '/upload/w_60');
});

const opts= { toJSON:{virtuals:true}};

const partnerSchema = new Schema({
    name:String,
    images:[ImageSchema],
    university:String,
    founder:String,
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    uploader:String 
},opts);

module.exports = mongoose.model('Partner',partnerSchema);
