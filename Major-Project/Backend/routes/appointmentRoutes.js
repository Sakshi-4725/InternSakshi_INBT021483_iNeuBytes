const router = require("express").Router();
const controller = require("../controllers/appointmentController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
router.use(authenticate);
router.get("/", controller.list);
router.post("/", authorize("patient"), controller.create);
router.put("/:id", controller.update);
module.exports = router;
