const mongoose = require("mongoose");
const Comments = mongoose.model("Comments");

module.exports.insertComment = (req, res) => {
    var comment = new Comments({
        comment: req.body.comment,
        blockName:req.body.blockName,
        userId:req.body.userId
    });
  
    comment.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.allComments = (req, res) => {
    Comments.find({},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.getCommentById = (req, res) => {
    Comments.findById(req.body.id, (err,docs) => {
          if(!err){
              res.send(docs);
          } else {
            res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
          }
      });
  };
