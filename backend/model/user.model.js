import mongoose from "mongoose";

const User = mongoose.model('User',
    new mongoose.Schema({
        email: String,
        password: {
            type: String,
            select: false
        },
        salt: {
            type: String,
            select: false
        }, // salt for increasing security
        name: String,
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }],
        ownerGroups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }]
    })
);

export default User;
