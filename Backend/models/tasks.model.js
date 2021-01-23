const mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({
    taskName:{type:String},
    description:{type:String},
    startDate:{type:Number},
    endDate:{type:Number},
    userId:{type:String},
    isCompleted:{type:Boolean},
    isApproved:{type:Boolean}
});

mongoose.model('Tasks',tasksSchema);