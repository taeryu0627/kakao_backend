import express from 'express';
import todoController from './todo.controller';
import schoolController from './school.controller';

const router = express.Router();

router.use('/schools', schoolController);
router.use('/todos', todoController);

export default router;