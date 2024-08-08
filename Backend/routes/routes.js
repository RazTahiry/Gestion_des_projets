const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const taskController = require("../controllers/task.controller");
const {
  login,
  logout,
  register,
  authenticate
} = require("../controllers/auth.controller");

// User routes
router.post("/users", authenticate, userController.createUser);
router.get("/users", authenticate, userController.getUsers);
router.get("/users/:userId", authenticate, userController.getUser);
router.patch("/users/:userId", authenticate, userController.updateUser);
router.delete("/users/:userId", authenticate, userController.deleteUser);

// Auth routes
router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/logout", logout);

// Task routes
router.post("/users/:userId/tasks", authenticate, taskController.createUserTask);
router.get("/tasks", authenticate, taskController.getTasks);
router.get("/users/:userId/tasks", authenticate, taskController.getUserTasks);
router.get("/users/:userId/tasks/:taskId", authenticate, taskController.getUserTask);
router.patch("/users/:userId/tasks/:taskId", authenticate, taskController.updateUserTask);
router.delete("/users/:userId/tasks/:taskId", authenticate, taskController.deleteUserTask);

module.exports = router;
