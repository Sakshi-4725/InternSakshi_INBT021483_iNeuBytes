const db = require("../config/db");

exports.list = async (req, res) => {
  try {
    let sql = `SELECT mr.*, p.name AS patient_name, d.name AS doctor_name FROM medical_records mr
      JOIN users p ON p.id=mr.patient_id JOIN users d ON d.id=mr.doctor_id WHERE 1=1`;
    const values = [];
    if (req.user.role === "patient") { sql += " AND mr.patient_id=?"; values.push(req.user.id); }
    if (req.user.role === "doctor") { sql += " AND mr.doctor_id=?"; values.push(req.user.id); }
    if (req.query.patient_id && req.user.role !== "patient") { sql += " AND mr.patient_id=?"; values.push(req.query.patient_id); }
    sql += " ORDER BY mr.record_date DESC";
    const [rows] = await db.execute(sql, values); res.json(rows);
  } catch (error) { res.status(500).json({ message: "Could not load medical records.", error: error.message }); }
};

exports.create = async (req, res) => {
  const { patient_id, appointment_id, diagnosis, prescription, treatment, notes } = req.body;
  if (!patient_id || !diagnosis) return res.status(400).json({ message: "Patient and diagnosis are required." });
  try {
    const [appointment] = appointment_id ? await db.execute("SELECT id, doctor_id FROM appointments WHERE id=?", [appointment_id]) : [[]];
    if (appointment_id && (!appointment[0] || appointment[0].doctor_id !== req.user.id)) return res.status(403).json({ message: "That appointment is not assigned to you." });
    const [result] = await db.execute("INSERT INTO medical_records (patient_id, doctor_id, appointment_id, diagnosis, prescription, treatment, notes) VALUES (?,?,?,?,?,?,?)", [patient_id, req.user.id, appointment_id || null, diagnosis, prescription || null, treatment || null, notes || null]);
    res.status(201).json({ id: result.insertId, message: "Medical record saved." });
  } catch (error) { res.status(500).json({ message: "Could not save medical record.", error: error.message }); }
};
