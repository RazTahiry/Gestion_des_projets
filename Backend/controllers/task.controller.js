const { Task } = require("../models");

// Création d'une tâche pour un utilisateur
const createUserTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération de toutes les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération des tâches d'un utilisateur
const getUserTasks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await Task.findAll({
      where: { Pid_person: userId },
    });
    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res
        .status(404)
        .json({ error: "Aucune tâche trouvée pour cet utilisateur." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération d'une tâche spécifique d'un utilisateur
const getUserTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const task = await Task.findOne({
      where: {
        id: taskId,
        Pid_person: userId,
      },
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Tâche non trouvée." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mise à jour d'une tâche spécifique d'un utilisateur
const updateUserTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const [updated] = await Task.update(req.body, {
      where: {
        id: taskId,
        Pid_person: userId,
      },
    });

    if (updated) {
      const updatedTask = await Task.findByPk(taskId);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: "Tâche non trouvée." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suppression d'une tâche spécifique d'un utilisateur
const deleteUserTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const deleted = await Task.destroy({
      where: {
        id: taskId,
        Pid_person: userId,
      },
    });

    if (deleted) {
      res.status(204).json({ message: "Tâche supprimée." });
    } else {
      res.status(404).json({ error: "Tâche non trouvée." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUserTask,
  getTasks,
  getUserTasks,
  getUserTask,
  updateUserTask,
  deleteUserTask,
};
