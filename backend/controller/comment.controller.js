import db from "../model/index.js";
import taskCtrl from "./task.controller.js";

const Comment = db.comment;
const Task = db.task;
const canModifyTask = taskCtrl.canModifyTask;

async function createComment(req, res, next) {
    try {
        const userId = req.userId;
        const taskId = req.body.taskId;
        const canCreateComment = await canModifyTask(taskId, userId);

        if (!canCreateComment) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }

        let comment = new Comment({
            dateCreated: new Date(),
            task: taskId,
            author: userId,
            content: req.body.content || "",
            files: []
        });

        const commentId = (await comment.save())._id;
        await Task.findByIdAndUpdate(taskId, { $push: { comments: commentId } });

        res.json({ message: "Create Comment successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot create comment"
        });
    }
}

async function getCommentById(req, res, next) {
    try {
        const userId = req.userId;
        const commentId = req.params.commentId;
        const canView = await canModifyComment(commentId, userId);
        if (!canView) {
            res.status(401).json({ message: "Not authorized for this comment" });
            return;
        }

        res.json(result);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read comment"
        });
    }
}

async function getCommentByTask(req, res, next) {
    try {
        const userId = req.userId;
        const taskId = req.body.taskId;
        const canView = await canModifyTask(taskId, userId);

        if (!canView) {
            res.status(401).json({ message: "Not authorized for this comment list" });
            return;
        }

        const commentIdList = (await Task.findById(taskId)).comments;
        if (!commentIdList) {
            res.status(401).json({ message: "GroupID is wrong" });
            return;
        }

        let result = [];
        for (let id of commentIdList) {
            result.push(await Comment.findById(id));
        }

        res.json(result);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read Comment"
        });
    }
}

async function updateComment(req, res, next) {
    try {
        const userId = req.userId;
        const commentId = req.params.commentId;
        const canUpdate = await canModifyComment(commentId, userId);
        if (!canUpdate) {
            res.status(401).json({ message: "Not authorized for this comment" });
            return;
        }

        const content = req.body.content || currGroup.content;

        await Comment.findByIdAndUpdate(commentId, {
            $set: {
                content: content
            }
        });

        res.json({ message: "Update comment successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot update comment"
        });
    }
}

async function deleteComment(req, res, next) {
    try {
        const userId = req.userId;
        const commentId = req.params.commentId;
        const currComment = await Comment.findById(commentId);

        const canDelete = await canModifyComment(commentId, userId);
        if (!canDelete) {
            res.status(401).json({ message: "Not authorized for this comment" });
            return;
        }

        await Comment.findByIdAndDelete(commentId);
        await Task.findByIdAndUpdate(currComment.task, { $pull: { comments: commentId } });

        res.json({ message: "Delete comment successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot delete comment"
        });
    }
}

async function canModifyComment(commentId, userId) {
    const currComment = await Comment.findById(commentId);
    if (!currComment) {
        return false;
    }
    return canModifyTask(currComment.task.toString(), userId);
}


const CommentCtrl = {
    createComment,
    getCommentById,
    getCommentByTask,
    updateComment,
    deleteComment
}

export default CommentCtrl;
