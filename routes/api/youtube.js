const router = require("express").Router();
const youtubeController = require('../../controllers/youtubeController');

// Match with /api/youtube
router
    .route("/")
    .get(youtubeController.findVideos)
    .post(youtubeController.create);

// Match with /api/youtube/:id
router
    .route("/:id")
    .get(youtubeController.findById)
    .delete(youtubeController.remove);

module.exports = router;