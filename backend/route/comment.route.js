import express from 'express';
import commentCtrl from '../controller/comment.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(auth.verifyToken, commentCtrl.createComment)
    .put(auth.verifyToken, commentCtrl.updateComment)
    .delete(auth.verifyToken, commentCtrl.deleteComment);

router.route("/getCommentById").post(auth.verifyToken, commentCtrl.getCommentById);
router.route("/getCommentByTask").post(auth.verifyToken, commentCtrl.getCommentByTask);

export default router;
