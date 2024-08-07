const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const taskController = require("../controllers/task.controller");

// User routes

router.post("/users", userController.createUser);

router.get("/users", userController.getUsers);

router.get("/users/:userId", userController.getUser);

router.put("/users/:userId", userController.updateUser);

router.delete("/users/:userId", userController.deleteUser);

// Task routes

router.post("/users/:userId/tasks", taskController.createUserTask);

router.get("/tasks", taskController.getTasks);

router.get("/users/:userId/tasks", taskController.getUserTasks);

router.get("/users/:userId/tasks/:taskId", taskController.getUserTask);

router.put("/users/:userId/tasks/:taskId", taskController.updateUserTask);

router.delete("/users/:userId/tasks/:taskId", taskController.deleteUserTask);

module.exports = router;
