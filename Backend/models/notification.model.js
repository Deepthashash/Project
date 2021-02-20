const mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    taskId:{type:String},
    userId:{type:String},
    title:{type:String},
    isSeen:{type:Boolean},
    type:{type:String}
});

mongoose.model('Notification',notificationSchema);