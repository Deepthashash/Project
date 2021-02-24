const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlTasks = require("../controllers/tasks.controller");
const ctrlComments = require("../controllers/comments.controller");
const ctrlFile = require("../controllers/file.controller");
const ctrlNotification = require("../controllers/notification.controller");

const jwtHelper = require("../config/jwtHelper");
const { verify } = require("jsonwebtoken");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);
router.get("/getCurrentUser",jwtHelper.verifyJwtToken,ctrlUser.getCurrentUser);
router.post("/getUser", jwtHelper.verifyJwtToken, ctrlUser.getUser);
router.post("/getUsers", jwtHelper.verifyJwtToken, ctrlUser.getUsers);
router.get("/getAllUsers", ctrlUser.getAllUsers);
router.put("/updateUser", ctrlUser.updateUser);
router.delete("/deleteUser/:id", ctrlUser.deleteUser);


//TASKS CONTROLLERS
router.post("/insertTask", ctrlTasks.insertTask);
router.get("/getAllTasks", ctrlTasks.allTasks);
router.post("/getTaskById", ctrlTasks.getTaskById);
router.post("/getAllTasksPerUser", ctrlTasks.getAllTasksPerUser);
router.get("/getUnapprovedTasks", ctrlTasks.getUnapprovedTasks);
router.put("/updateAsCompleted", ctrlTasks.updateAsCompleted);
router.put("/updateAsApproved", ctrlTasks.updateAsApproved);
router.get("/getAllTasksBlock1", ctrlTasks.allTasksBlock1);
router.get("/getAllTasksBlock2", ctrlTasks.allTasksBlock2);
router.get("/getAllTasksBlock3", ctrlTasks.allTasksBlock3);
router.delete("/deleteTask/:id",ctrlTasks.deleteTask);

//COMMENTS CONTROLLERS
router.post("/insertComment", ctrlComments.insertComment);
router.get("/getAllComments", ctrlComments.allComments);
router.get("/getAllCommentsBlock1", ctrlComments.allCommentsBlock1);
router.get("/getAllCommentsBlock2", ctrlComments.allCommentsBlock2);
router.get("/getAllCommentsBlock3", ctrlComments.allCommentsBlock3);
router.post("/getCommentById", ctrlComments.getCommentById);

//FILES CONTROLLER
router.post("/insertFile", ctrlFile.insertFile);
router.get("/getAllFilesBlock1", ctrlFile.getAllfilesBlock1);
router.get("/getAllFilesBlock2", ctrlFile.getAllfilesBlock2);
router.get("/getAllFilesBlock3", ctrlFile.getAllfilesBlock3);
router.get("/getAllFiles", ctrlFile.getAllfiles);
router.delete("/deleteFile/:id", ctrlFile.deleteFile);

//NOTIFICATION CONTROLLER 
router.get("/getAllCommentNotifications", ctrlNotification.getAllCommentNotifications);
router.post("/insertNotification", ctrlNotification.insertNotification);
router.post("/getAllNotificationsPerUser", ctrlNotification.getAllNotificationsPerUser);
router.put("/updateAsSeen", ctrlNotification.updateAsSeen);



module.exports = router;
