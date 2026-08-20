const router = require("express").Router();
const db = require("../config/db");

router.get("/departments", async (req, res) => {
  const [rows] = await db.execute(`SELECT d.*, COUNT(dp.user_id) AS doctor_count FROM departments d
    LEFT JOIN doctor_profiles dp ON dp.department_id=d.id GROUP BY d.id ORDER BY d.name`);
  res.json(rows);
});
router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: "Name, email, and message are required." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
  if (String(name).length > 100 || String(subject || "").length > 255 || String(message).length > 5000) return res.status(400).json({ message: "Your message is too long." });
  try { await db.execute("INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)", [name, email, subject || null, message]); res.status(201).json({ message: "Thank you. Our team will contact you shortly." }); }
  catch (error) { res.status(500).json({ message: "Could not send message. Please try again." }); }
});
module.exports = router;
