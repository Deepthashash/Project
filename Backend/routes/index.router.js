const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlTasks = require("../controllers/tasks.controller")

const jwtHelper = require("../config/jwtHelper");
const { verify } = require("jsonwebtoken");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);
router.get("/getCurrentUser",jwtHelper.verifyJwtToken,ctrlUser.getCurrentUser);
router.post("/getUser", jwtHelper.verifyJwtToken, ctrlUser.getUser);
router.post("/getUsers", jwtHelper.verifyJwtToken, ctrlUser.getUsers);

//TASKS CONTROLLERS
router.post("/insertTask", ctrlTasks.insertTask);
router.get("/getAllTasks", ctrlTasks.allTasks);
router.post("/getTaskById", ctrlTasks.getTaskById);
router.post("/getAllTasksPerUser", ctrlTasks.getAllTasksPerUser);
router.post("/getUnapprovedTasksPerUser", ctrlTasks.getUnapprovedTasksPerUser);
router.put("/updateAsCompleted", ctrlTasks.updateAsCompleted);

module.exports = router;
