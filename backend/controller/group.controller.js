import db from "../model/index.js";
import mongoose from "mongoose";

const User = db.user;
const Group = db.group;

async function createGroup(req, res, next) {
    try {
        const userId = req.userId;
        let group = new Group({
            dateCreated: new Date(),
            name: req.body.name,
            description: req.body.description || "",
            owner: userId,
            members: [userId],
            tasks: []
        });

        const groupId = (await group.save())._id;

        await User.findByIdAndUpdate(userId, { $push: { groups: groupId } });
        await User.findByIdAndUpdate(userId, { $push: { ownerGroups: groupId } });

        res.json({ message: "Create Group successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot create Group"
        });
    }
}

async function getGroupById(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.params.groupId;

        const canView = await canModifyGroup(groupId, userId);
        if (!canView) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }

        let result = await Group.findById(groupId);
        if (!result) {
            res.status(401).json({ message: "Group not existed" });
            return;
        }
        res.json(result);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read group"
        });
    }
}

async function getGroupByUser(req, res, next) {
    try {
        const userId = req.userId;
        const groupIdList = (await User.findById(userId)).groups;
        if (!groupIdList) {
            res.status(401).json({ message: "UserId is wrong" });
            return;
        }

        let result = [];
        for (let id of groupIdList) {
            const group = await Group.findById(id);
            let copyGroup = {
                ...group._doc
            };
            copyGroup["isOwner"] = (userId === group.owner.toString());
            console.log(copyGroup);
            result.push(copyGroup);
        }

        res.json(result);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot read group"
        });
    }
}

async function updateGroup(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.params.groupId;

        const canUpdate = await canModifyGroup(groupId, userId);
        if (!canUpdate) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }
        const currGroup = await Group.findById(groupId);

        const name = req.body.name || currGroup.name;
        const description = req.body.description || currGroup.description;

        await Group.findByIdAndUpdate(groupId, {
            $set: {
                name: name,
                description: description
            }
        });
        res.json({ message: "Update group successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot update group"
        });
    }
}

async function deleteGroup(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.params.groupId;

        const canDelete = await canModifyGroup(groupId, userId);
        if (!canDelete) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }
        console.log("a")
        await Group.findByIdAndDelete(groupId);
        await User.findByIdAndUpdate(userId, { $pull: { groups: groupId, ownerGroups: groupId } });

        res.json({ message: "Delete group successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot delete group"
        });
    }
}

async function addMemberByEmail(req, res, next) {
    try {
        const userId = req.userId;
        const groupId = req.body.groupId;
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            res.status(400).send({ message: "No user found!" });
            return;
        }

        const canUpdate = await canModifyGroup(groupId, userId);
        if (!canUpdate) {
            res.status(401).json({ message: "Not authorized for this group" });
            return;
        }

        await Group.findByIdAndUpdate(groupId, {
            $push: {
                members: user._id
            }
        });
        await User.findByIdAndUpdate(user._id, {
            $push: {
                groups: groupId
            }
        });
        res.json({ message: "Add member successfully" });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot add member"
        });
    }
}

async function canModifyGroup(groupId, userId) {
    const groupIdList = (await User.findById(userId)).groups;
    for (let id of groupIdList) {
        if (id.toString() === groupId) {
            return true;
        }
    }
    return false;
}

const groupCtrl = {
    createGroup,
    getGroupById,
    getGroupByUser,
    updateGroup,
    deleteGroup,
    addMemberByEmail,
    canModifyGroup
}

export default groupCtrl;
