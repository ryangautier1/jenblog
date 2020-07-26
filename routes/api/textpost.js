const router = require("express").Router();
const textPostController = require('../../controllers/textPostController');

// Match with /api/textpost
router
    .route("/")
    .get(textPostController.findAll)
    .post(textPostController.create);

// Match with /api/textpost/:id
router
    .route("/:id")
    .delete(textPostController.remove);

module.exports = router;