const mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({
    taskName:{type:String},
    description:{type:String},
    startDate:{type:Number},
    endDate:{type:Number},
    userId1:{type:String},
    userId2:{
        type:String,
        default: null
    },
    userId3:{
        type:String,
        default: null
    },
    isCompleted:{type:Boolean},
    isApproved:{type:Boolean}
});

mongoose.model('Tasks',tasksSchema);