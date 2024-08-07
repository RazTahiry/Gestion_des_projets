const { User } = require("../models");

// Création d'un utilisateur
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération de tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération d'un utilisateur par ID
const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mise à jour d'un utilisateur par ID
const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [updated] = await User.update(req.body, {
      where: { id: userId },
    });

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suppression d'un utilisateur par ID
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleted = await User.destroy({
      where: { id: userId },
    });

    if (deleted) {
      res.status(204).json({ message: "Utilisateur supprimé." });
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
