import mongoose from 'mongoose';
import Comment from './Comment.model.js';
import Group from './group.model.js';
import Task from './task.model.js';
import User from './user.model.js';

// mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.comment = Comment;
db.group = Group;
db.Task = Task;
db.user = User;

export default db;
