const mongoose = require("mongoose");
const File = mongoose.model("File");

module.exports.insertFile = (req, res) => {
    var file = new File({
        fileName: req.body.fileName,
        file:req.body.file,
        category:req.body.category,
        block:req.body.block
    });
  
    file.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.getAllfilesBlock1 = (req, res) => {
    File.find({block:"Block1"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.getAllfilesBlock2 = (req, res) => {
    File.find({block:"Block2"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  module.exports.getAllfilesBlock3 = (req, res) => {
    File.find({block:"Block3"},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };

  
