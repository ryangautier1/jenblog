const router = require("express").Router();
const youtubeController = require('../../controllers/youtubeController');

// Match with /api/youtube
router
    .route("/")
    .get(youtubeController.findAll)
    .post(youtubeController.create);

// Match with /api/youtube/:id
router
    .route("/:id")
    .delete(youtubeController.remove);

module.exports = router;