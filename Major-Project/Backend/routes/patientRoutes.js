const router = require("express").Router();
const controller = require("../controllers/patientController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
router.use(authenticate, authorize("patient"));
router.get("/profile", controller.profile);
router.put("/profile", controller.updateProfile);
module.exports = router;
