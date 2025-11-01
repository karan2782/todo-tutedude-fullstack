const express = require('express');
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.get('/:id', getTodo);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;