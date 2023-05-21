import db from "../model/index.js";
import groupCtrl from "./group.controller.js";

const Task = db.task;
const Group = db.group;
const canModifyGroup = groupCtrl.canModifyGroup;

async function createTask(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.body.groupId;
        const canCreateTask = await canModifyGroup(groupId, userId);

        if (!canCreateTask) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }

        let task = new Task({
            dateCreated: new Date(),
            title: req.body.title,
            description: req.body.description || "",
            status: "Pending",
            group: groupId,
            comments: []
        });

        const taskId = (await task.save())._id;

        await Group.findByIdAndUpdate(groupId, { $push: { tasks: taskId } });

        res.json({ message: "Create Task successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot create Task"
        });
    }
}

async function getTaskById(req, res, next) {
    try {
        const userId = req.userId;
        const taskId = req.body.taskId;
        const canView = await canModifyTask(taskId, userId);
        if (!canView) {
            res.status(401).json({ message: "Not authorized for this task" });
            return;
        }

        res.json(await Task.findById(taskId));
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read task"
        });
    }
}

async function getTaskByGroup(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.body.groupId;

        const canView = await canModifyGroup(groupId, userId);
        if (!canView) {
            res.status(401).json({ message: "Not authorized for this task list" });
            return;
        }

        const taskIdList = (await Group.findById(groupId)).tasks;
        if (!taskIdList) {
            res.status(401).json({ message: "GroupID is wrong" });
            return;
        }

        let result = [];
        for (let id of taskIdList) {
            result.push(await Task.findById(id));
        }

        res.json(result);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read task"
        });
    }
}

async function updateTask(req, res, next) {
    try {
        const userId = req.userId;
        const taskId = req.body.taskId;
        const canUpdate = await canModifyTask(taskId, userId);
        if (!canUpdate) {
            res.status(401).json({ message: "Not authorized for this task" });
            return;
        }

        const currTask = await Task.findById(taskId);
        const title = req.body.title || currTask.title;
        const description = req.body.description || currTask.description;
        const status = req.body.status || currTask.status;

        await Task.findByIdAndUpdate(taskId, {
            $set: {
                title: title,
                description: description,
                status: status
            }
        });

        res.json({ message: "Update task successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot update task"
        });
    }
}

async function deleteTask(req, res, next) {
    try {
        const userId = req.userId;
        const taskId = req.body.taskId;
        const currTask = await Task.findById(taskId);

        const canDelete = await canModifyTask(taskId, userId);
        if (!canDelete) {
            res.status(401).json({ message: "Not authorized for this task" });
            return;
        }

        await Task.findByIdAndDelete(taskId);
        await Group.findByIdAndUpdate(currTask.group, { $pull: { tasks: taskId } });

        res.json({ message: "Delete task successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot delete task"
        });
    }
}

async function canModifyTask(taskId, userId) {
    const currTask = await Task.findById(taskId);
    if (!currTask) {
        return false;
    }
    return canModifyGroup(currTask.group.toString(), userId);
}

const taskCtrl = {
    createTask,
    getTaskByGroup,
    getTaskById,
    updateTask,
    deleteTask,
    canModifyTask
}

export default taskCtrl;
