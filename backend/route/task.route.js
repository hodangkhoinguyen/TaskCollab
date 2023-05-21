import express from 'express';
import taskCtrl from '../controller/task.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(auth.verifyToken, taskCtrl.createTask)
    .put(auth.verifyToken, taskCtrl.updateTask)
    .delete(auth.verifyToken, taskCtrl.deleteTask);

router.route("/getTaskById").post(auth.verifyToken, taskCtrl.getTaskById);
router.route("/getTaskByGroup").post(auth.verifyToken, taskCtrl.getTaskByGroup);

export default router;
