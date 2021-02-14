const mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
    fileName:{type:String},
    file:{type:String},
    category:{type:String},
    block:{type:String}
});

mongoose.model('File',fileSchema);