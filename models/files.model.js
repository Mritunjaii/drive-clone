const mongoose = require('mongoose');


// File Schema
const FileSchema = new mongoose.Schema({
    originalName:String,
    storedName: String,
    contentType: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:[true]
    }
});

const File = mongoose.model('File', FileSchema);

module.exports=File;