const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true     
    },
    isTest: { 
        type: Boolean,
         default: false }
   
}, 
{ timestamps: true });

const POST = mongoose.model('Post', PostSchema);

module.exports = POST;