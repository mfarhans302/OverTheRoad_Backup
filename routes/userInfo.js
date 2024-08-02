const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares/auth");
const userInfoController = require("../controllers/userInfo");

router.get("/", verifyAccessToken, userInfoController.getUserInfo);
router.post("/", verifyAccessToken, userInfoController.createOrUpdateUserInfo);

module.exports = router;
