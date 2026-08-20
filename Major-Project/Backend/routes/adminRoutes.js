const router = require("express").Router();
const db = require("../config/db");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.use(authenticate, authorize("admin"));

router.get("/stats", async (req, res) => {
  try {
    const [[patients], [doctors], [appointments], [pending]] = await Promise.all([
      db.execute("SELECT COUNT(*) AS count FROM users WHERE role='patient'"),
      db.execute("SELECT COUNT(*) AS count FROM users WHERE role='doctor'"),
      db.execute("SELECT COUNT(*) AS count FROM appointments"),
      db.execute("SELECT COUNT(*) AS count FROM appointments WHERE status='pending'")
    ]);
    res.json({ patients: patients[0].count, doctors: doctors[0].count, appointments: appointments[0].count, pending: pending[0].count });
  } catch (error) { res.status(500).json({ message: "Could not load statistics.", error: error.message }); }
});

router.get("/users", async (req, res) => {
  const role = req.query.role;
  if (role && !["patient", "doctor", "admin"].includes(role)) return res.status(400).json({ message: "Invalid user role." });
  const [rows] = await db.execute("SELECT id,name,email,role,phone,created_at FROM users" + (role ? " WHERE role=?" : "") + " ORDER BY created_at DESC", role ? [role] : []);
  res.json(rows);
});
router.put("/users/:id", async (req, res) => {
  const { name, phone, address } = req.body;
  if (!name || String(name).trim().length > 100) return res.status(400).json({ message: "A valid name is required." });
  const [result] = await db.execute("UPDATE users SET name=?, phone=?, address=? WHERE id=?", [String(name).trim(), phone || null, address || null, req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: "User not found." });
  res.json({ message: "User updated." });
});

router.get("/appointments", async (req, res) => {
  const [rows] = await db.execute(`SELECT a.*, p.name patient_name, d.name doctor_name, dept.name department FROM appointments a
    JOIN users p ON p.id=a.patient_id JOIN users d ON d.id=a.doctor_id
    LEFT JOIN doctor_profiles dp ON dp.user_id=d.id LEFT JOIN departments dept ON dept.id=dp.department_id
    ORDER BY a.appointment_date DESC, a.appointment_time DESC`);
  res.json(rows);
});
router.put("/appointments/:id", async (req, res) => {
  const { status, notes, appointment_date, appointment_time } = req.body;
  await db.execute("UPDATE appointments SET status=COALESCE(?,status), notes=COALESCE(?,notes), appointment_date=COALESCE(?,appointment_date), appointment_time=COALESCE(?,appointment_time) WHERE id=?", [status || null, notes || null, appointment_date || null, appointment_time || null, req.params.id]);
  res.json({ message: "Appointment updated." });
});
router.delete("/users/:id", async (req, res) => {
  if (Number(req.params.id) === req.user.id) return res.status(400).json({ message: "You cannot remove your own account." });
  await db.execute("DELETE FROM users WHERE id=?", [req.params.id]);
  res.json({ message: "User removed." });
});
router.put("/doctors/:id", async (req, res) => {
  const { department_id, specialization, availability, consultation_fee } = req.body;
  await db.execute("UPDATE doctor_profiles SET department_id=?, specialization=?, availability=?, consultation_fee=? WHERE user_id=?", [department_id || null, specialization || null, availability || null, Number(consultation_fee) || 0, req.params.id]);
  res.json({ message: "Doctor details updated." });
});
router.get("/reports", async (req, res) => {
  const [[status], [department], [upcoming]] = await Promise.all([
    db.execute("SELECT status, COUNT(*) count FROM appointments GROUP BY status"),
    db.execute(`SELECT COALESCE(d.name,'Unassigned') department, COUNT(a.id) count FROM appointments a JOIN users u ON u.id=a.doctor_id LEFT JOIN doctor_profiles dp ON dp.user_id=u.id LEFT JOIN departments d ON d.id=dp.department_id GROUP BY d.name ORDER BY count DESC`),
    db.execute("SELECT COUNT(*) count FROM appointments WHERE appointment_date >= CURDATE()")
  ]);
  res.json({ by_status: status, by_department: department, upcoming: upcoming[0].count });
});

router.get("/departments", async (req, res) => { const [rows] = await db.execute("SELECT * FROM departments ORDER BY name"); res.json(rows); });
router.post("/departments", async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: "Department name is required." });
  const [result] = await db.execute("INSERT INTO departments (name, description) VALUES (?,?)", [req.body.name, req.body.description || null]);
  res.status(201).json({ id: result.insertId, message: "Department added." });
});
router.put("/departments/:id", async (req, res) => { await db.execute("UPDATE departments SET name=?, description=? WHERE id=?", [req.body.name, req.body.description || null, req.params.id]); res.json({ message: "Department updated." }); });
router.delete("/departments/:id", async (req, res) => { await db.execute("DELETE FROM departments WHERE id=?", [req.params.id]); res.json({ message: "Department removed." }); });

module.exports = router;
