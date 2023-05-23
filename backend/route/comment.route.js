import express from 'express';
import commentCtrl from '../controller/comment.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(auth.verifyToken, commentCtrl.createComment);

router.route("/:commentId")
    .put(auth.verifyToken, commentCtrl.updateComment)
    .delete(auth.verifyToken, commentCtrl.deleteComment);

router.route("/getCommentById/:commentId").get(auth.verifyToken, commentCtrl.getCommentById);
router.route("/getCommentByTask").post(auth.verifyToken, commentCtrl.getCommentByTask);

export default router;
