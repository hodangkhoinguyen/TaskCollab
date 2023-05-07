import mongoose from "mongoose";

const Group = mongoose.model('Group',
    new mongoose.Schema({
        dateCreated: Date,
        name: String,
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }]
    })
);

export default Group;
