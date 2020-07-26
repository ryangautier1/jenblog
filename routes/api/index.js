const router = require("express").Router();
const userRoutes = require("./user");
const userLoginRoutes = require("./userLogin");
const youtubeRoutes = require("./youtube");
const ytcommentRoutes = require("./ytcomment");
const textPostRoutes = require("./textpost");
const textPostCommentRoutes = require("./textPostComment");

// Routes
router.use("/user", userRoutes);
router.use("/user-login", userLoginRoutes);
router.use("/youtube", youtubeRoutes);
router.use("/ytcomment", ytcommentRoutes);
router.use("/textpost", textPostRoutes);
router.use("/textpostcomment", textPostCommentRoutes);

module.exports = router;