const mongoose = require("mongoose");
const Notification = mongoose.model("Notification");

module.exports.insertNotification = (req, res) => {
    var notification = new Notification({
        taskId: req.body.taskId,
        userId:req.body.userId,
        title:req.body.title,
        isSeen:req.body.isSeen,
        type:req.body.type
    });
  
    notification.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.allNotifications = (req, res) => {
    Notification.find({},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.getNotificationById = (req, res) => {
    Notification.findById(req.body.id, (err,docs) => {
          if(!err){
              res.send(docs);
          } else {
            res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
          }
      });
  };

  module.exports.getAllNotificationsPerUser = (req,res) => {
    Notification.find({userId:req.body.userId}, (err,docs) => {
      if(!err){
          res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      } 
    });
  };

  module.exports.getAllCommentNotifications = (req,res) => {
    Notification.find({type: "comment"}, (err,docs) => {
      if(!err){
          res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      } 
    });
  };

  module.exports.updateAsSeen = (req,res) => {
    Notification.findByIdAndUpdate(req.body.id,{isSeen:true},{new:true}, (err,docs) => {
      if(!err){
          res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      } 
    });
  };
