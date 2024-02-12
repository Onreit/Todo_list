const express = require('express');
const router = express.Router();
const taskController = require('./controllers/task');

// On utilise cette route pour la liste des taches
router.get('/tasks', taskController.listTasks);

// On utilise cette route pour ajouter une tache
router.post('/tasks', taskController.addTask);

// On utilise cette route pour modifier une tache
router.patch("/tasks/:id", taskController.editTask);

// On utilise cette route pour supprimer une tache
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
