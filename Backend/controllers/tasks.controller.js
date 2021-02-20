const mongoose = require("mongoose");
const Tasks = mongoose.model("Tasks");

module.exports.insertTask = (req, res) => {
    var task = new Tasks({
        taskName: req.body.taskName,
        description:req.body.description,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        userId1:req.body.userId1,
        userId2:req.body.userId2,
        userId3:req.body.userId3,
        isCompleted:req.body.isCompleted,
        isApproved:req.body.isApproved,
        block: req.body.block
    });
  
    task.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.allTasks = (req, res) => {
    Tasks.find({},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.allTasksBlock1 = (req, res) => {
    Tasks.find({block:"block1"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.allTasksBlock2 = (req, res) => {
    Tasks.find({block:"block2"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.allTasksBlock3 = (req, res) => {
    Tasks.find({block:"block3"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.getTaskById = (req, res) => {
      Tasks.findById(req.body.id, (err,docs) => {
          if(!err){
              res.send(docs);
          } else {
            res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
          }
      });
  };

  module.exports.getAllTasksPerUser = (req,res) => {
      Tasks.find({$or:[{userId1: req.body.userId},{userId2: req.body.userId},{userId3: req.body.userId}]}, (err,docs) => {
        if(!err){
            res.send(docs);
        } else {
          res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
        } 
      });
  };

  module.exports.getUnapprovedTasks = (req,res) => {
    Tasks.find({$and:[{isCompleted:true},{isApproved:false}]}, (err,docs) => {
      if(!err){
          res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      } 
    });
  };

module.exports.updateAsCompleted = (req,res) => {
    Tasks.findByIdAndUpdate(req.body.id,{isCompleted:true},{new:true}, (err,docs) => {
      if(!err){
          res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      } 
    });
};

module.exports.updateAsApproved = (req,res) => {
  Tasks.findByIdAndUpdate(req.body.id,{isApproved:true},{new:true}, (err,docs) => {
    if(!err){
        res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    } 
  });
};