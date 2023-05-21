import express from 'express';
import groupCtrl from '../controller/group.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(auth.verifyToken, groupCtrl.createGroup)
    .put(auth.verifyToken, groupCtrl.updateGroup)
    .delete(auth.verifyToken, groupCtrl.deleteGroup);

router.route("/getGroupById").post(auth.verifyToken, groupCtrl.getGroupById);
router.route("/getGroupByUser").post(auth.verifyToken, groupCtrl.getGroupByUser);
router.route("/addMemberByEmail").post(auth.verifyToken, groupCtrl.addMemberByEmail);

export default router;
