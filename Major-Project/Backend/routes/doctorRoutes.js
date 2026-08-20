const router = require("express").Router();
const controller = require("../controllers/doctorController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
router.get("/", controller.list);
router.get("/profile", authenticate, authorize("doctor"), controller.profile);
router.put("/profile", authenticate, authorize("doctor"), controller.updateProfile);
module.exports = router;
