const router = require("express").Router();
const textPostCommentController = require("../../controllers/textPostCommentController");

// Match with /api/textpostcomment
router
  .route("/")
  .get(textPostCommentController.findAll)
  .post(textPostCommentController.create);

// Match with /api/textpostcomment/:textpost
router
  .route("/:textpost")
  .get(textPostCommentController.getCommentsByPost)
  .put(textPostCommentController.update);

// Match with /api/textpostcomment/delete/:id
router
  .route("/delete/:id")
  .delete(textPostCommentController.remove);

  module.exports = router;