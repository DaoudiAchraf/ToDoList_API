const express = require('express')

const taskCtrl = require('../controllers/Task')

const router = express.Router()

router.post('/task', taskCtrl.createTask)
router.put('/task/:id', taskCtrl.updateTask)
router.delete('/task/:id', taskCtrl.deleteTask)
router.get('/tasks', taskCtrl.getTasks)

module.exports = router