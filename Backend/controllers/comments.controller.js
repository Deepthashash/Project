const mongoose = require("mongoose");
const Comments = mongoose.model("Comments");

module.exports.insertComment = (req, res) => {
    var comment = new Comments({
        comment: req.body.comment,
        commentName: req.body.commentName,
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

  module.exports.allCommentsBlock1 = (req, res) => {
    Comments.find({blockName:"Block1"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.allCommentsBlock2 = (req, res) => {
    Comments.find({blockName:"Block2"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.allCommentsBlock3 = (req, res) => {
    Comments.find({blockName:"Block3"},(err, docs) => {
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
