const mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
    comment:{type:String},
    blockName:{type:String},
    userId:{type:String},
    commentName:{type:String}
});

mongoose.model('Comments',commentsSchema);