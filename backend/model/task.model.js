import mongoose from "mongoose";

const Task = mongoose.model('Task',
    new mongoose.Schema({
        dateCreated: Date,
        title: String,
        description: String,
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    })
);

export default Task;
