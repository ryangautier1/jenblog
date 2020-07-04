const router = require("express").Router();
const ytcommentController = require("../../controllers/ytcommentConttroller");

// Match with /api/ytcomment
router
    .route("/")
    .get(ytcommentController.findAll)
    .post(ytcommentController.create);

// Match with "/api/ytcomment/:id"
router
    .route("/:id")
    .get(ytcommentController.findById)
    .put(ytcommentController.update)
    .delete(ytcommentController.remove);

// Match with "/api/ytcomment/:video"
router
    .route("/:video")
    .get(ytcommentController.getCommentsByVideo);