import express from 'express';
import groupCtrl from '../controller/group.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(auth.verifyToken, groupCtrl.createGroup);

router.route("/:groupId")
    .put(auth.verifyToken, groupCtrl.updateGroup)
    .delete(auth.verifyToken, groupCtrl.deleteGroup);

router.route("/getGroupById/:groupId").get(auth.verifyToken, groupCtrl.getGroupById);
router.route("/getGroupByUser").get(auth.verifyToken, groupCtrl.getGroupByUser);
router.route("/addMemberByEmail").post(auth.verifyToken, groupCtrl.addMemberByEmail);

export default router;
