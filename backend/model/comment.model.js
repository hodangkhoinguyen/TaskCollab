import mongoose from "mongoose";

const Comment = mongoose.model('Comment',
    new mongoose.Schema({
        dateCreated: Date,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: String,
        files: [String]
    })
);

export default Comment;
