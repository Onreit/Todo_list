const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        try {
            const   findAllTask = await Task.findAll();
            res.status(200).json(findAllTask);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    addTask: async function (req, res) {
        try {
            const { name } = req.body;
            const result = await Task.create({name});
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
    editTask: async function (req, res) {
        try {
            const taskId = req.params.id;
            const task = await Task.findByPk(taskId);
            const { name } = req.body;
            if (name) {
                task.name = name;
            }
            await task.save();
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});  
        }
    },
    deleteTask: async(req, res) => {
        try {
            const taskId = req.params.id;
            const task = await Task.findByPk(taskId)
            console.log(task);
            await task.destroy(); 
            res.status(204).json("La tâche est bien supprimé");
        }
        catch(error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    }
};

module.exports = taskController;
