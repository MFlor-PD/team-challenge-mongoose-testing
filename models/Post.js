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
   
}, 
{ timestamps: true });

const POST = mongoose.model('Post', PostSchema);

module.exports = POST;