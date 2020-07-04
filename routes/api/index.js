const router = require("express").Router();
const userRoutes = require("./user");
const userLoginRoutes = require("./userLogin");
const youtubeRoutes = require("./youtube");
// const ytcommentRoutes = require("./ytcomment");

// Routes
router.use("/user", userRoutes);
router.use("/user-login", userLoginRoutes);
router.use("/youtube", youtubeRoutes);
// router.use("/ytcomment", ytcommentRoutes);

module.exports = router;