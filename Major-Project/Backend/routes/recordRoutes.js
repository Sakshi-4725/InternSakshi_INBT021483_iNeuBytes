const router = require("express").Router();
const controller = require("../controllers/recordController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
router.use(authenticate);
router.get("/", controller.list);
router.post("/", authorize("doctor"), controller.create);
module.exports = router;
