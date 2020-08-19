const router = require("express").Router();
const ytcommentController = require("../../controllers/ytcommentController");

// Match with /api/ytcomment
router
    .route("/")
    .get(ytcommentController.findAll)
    .post(ytcommentController.create);

// Match with "/api/ytcomment/:video"
router
    .route("/:video")
    .get(ytcommentController.getCommentsByVideo)
    .put(ytcommentController.update)
    .delete(ytcommentController.remove);


module.exports = router;