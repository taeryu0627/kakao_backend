import express, { Router } from 'express';
import TodoModel from '../model/todo.model'

type Todo = {
    todo: string,
};

const router = express.Router();

router.get('/', async (req, res) => {
    const todos: TodoModel[] = await TodoModel.findAll();
    return res.status(200).json(todos);
});

router.post('/', async (req, res) => {
    const { todo } = req.body as Todo;
    if (!todo) {
        return res.status(400).json();
    }

    await TodoModel.create({
        todo: todo,
    });

    return res.status(201).json();
})

router.delete('/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const todo: TodoModel | null = await TodoModel.findByPk(todoId);
    if (!todo) {
        return res.status(404).json();
    }
    await TodoModel.destroy({ where: { id: todoId } });
    res.status(200).json();
});

export default router;