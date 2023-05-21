import db from "../model/index.js";

const User = db.user;

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

const userCtrl = {
    getInfo
}

export default userCtrl;
