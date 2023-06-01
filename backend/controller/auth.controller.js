import dotenv from "dotenv";
import db from "../model/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

dotenv.config();

const User = db.user;

const HASH_TIME = 12;

async function signUp(req, res, next) {
    try {
        // Generate a random 32-bit string for salt
        const salt = crypto.randomBytes(64).toString('hex');
        const hashPassword = bcrypt.hashSync(salt + req.body.password, HASH_TIME);

        const user = new User({
            email: req.body.email,
            salt: salt,
            password: hashPassword,
            name: req.body.name,
            groups: req.body.groups || [],
            ownerGroups: req.body.ownerGroups || []
        });

        await user.save();
        res.send({ message: "register successfully!" });
    }
    catch (e) {
        res.status(500).send({ message: "sign up fails" });
    }
}

async function signIn(req, res, next) {
    const password = req.body.password;
    let user = await User.findOne({
        email: req.body.email
    }).select("+salt +password");
    if (user === null) {
        res.status(505).json({ message: "This email doesn't exist" });
        return;
    };

    const passwordIsValid = bcrypt.compareSync(
        user.salt + password,
        user.password
    );

    if (!passwordIsValid) {
        res.status(401).json({
            accessToken: null,
            message: "Invalid Password!"
        });
        return;
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    res.json({
        name: user.name,
        userId: user._id,
        accessToken: token
    });
}

async function getInfo(req, res, next) {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select(["-_id", "-__v"]);
        res.json(user);
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Cannot get user info"
        });
    }
}

const authCtrl = {
    signUp,
    signIn,
    getInfo
}

export default authCtrl;
