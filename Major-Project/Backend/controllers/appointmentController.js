const db = require("../config/db");

const appointmentSql = `SELECT a.*, p.name AS patient_name, p.email AS patient_email, d.name AS doctor_name, dp.specialization, dept.name AS department
    FROM appointments a JOIN users p ON p.id=a.patient_id JOIN users d ON d.id=a.doctor_id
    LEFT JOIN doctor_profiles dp ON dp.user_id=d.id LEFT JOIN departments dept ON dept.id=dp.department_id`;

exports.list = async (req, res) => {
    let sql = appointmentSql + " WHERE 1=1"; const values = [];
    if (req.user.role === "patient") { sql += " AND a.patient_id=?"; values.push(req.user.id); }
    if (req.user.role === "doctor") { sql += " AND a.doctor_id=?"; values.push(req.user.id); }
    if (req.query.status) { sql += " AND a.status=?"; values.push(req.query.status); }
    sql += " ORDER BY a.appointment_date DESC, a.appointment_time DESC";
    const [rows] = await db.execute(sql, values); res.json(rows);
};

exports.create = async (req, res) => {
    const { doctor_id, appointment_date, appointment_time, reason } = req.body;
    if (!doctor_id || !appointment_date || !appointment_time) return res.status(400).json({ message: "Doctor, date, and time are required." });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(appointment_date) || !/^\d{2}:\d{2}(:\d{2})?$/.test(appointment_time)) return res.status(400).json({ message: "Enter a valid appointment date and time." });
    if (new Date(`${appointment_date}T00:00:00`) < new Date(new Date().toDateString())) return res.status(400).json({ message: "Appointments cannot be booked in the past." });
    try {
        const [doctor] = await db.execute("SELECT id FROM users WHERE id=? AND role='doctor'", [doctor_id]);
        if (!doctor.length) return res.status(404).json({ message: "Doctor not found." });
        const [clash] = await db.execute("SELECT id FROM appointments WHERE doctor_id=? AND appointment_date=? AND appointment_time=? AND status NOT IN ('cancelled', 'rescheduled')", [doctor_id, appointment_date, appointment_time]);
        if (clash.length) return res.status(409).json({ message: "That appointment slot is no longer available." });
        const [result] = await db.execute("INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason) VALUES (?, ?, ?, ?, ?)", [req.user.id, doctor_id, appointment_date, appointment_time, reason || null]);
        res.status(201).json({ message: "Appointment booked.", id: result.insertId });
    } catch (error) { res.status(500).json({ message: "Could not book appointment.", error: error.message }); }
};

exports.update = async (req, res) => {
    const { status, appointment_date, appointment_time, reason, notes } = req.body;
    const statuses = ["pending", "confirmed", "completed", "cancelled", "rescheduled"];
    if (status && !statuses.includes(status)) return res.status(400).json({ message: "Invalid appointment status." });
    if (appointment_date && !/^\d{4}-\d{2}-\d{2}$/.test(appointment_date)) return res.status(400).json({ message: "Enter a valid appointment date." });
    if (appointment_time && !/^\d{2}:\d{2}(:\d{2})?$/.test(appointment_time)) return res.status(400).json({ message: "Enter a valid appointment time." });
    const [found] = await db.execute("SELECT * FROM appointments WHERE id=?", [req.params.id]);
    if (!found[0]) return res.status(404).json({ message: "Appointment not found." });
    const item = found[0];
    if (req.user.role === "patient" && item.patient_id !== req.user.id) return res.status(403).json({ message: "Not your appointment." });
    if (req.user.role === "doctor" && item.doctor_id !== req.user.id) return res.status(403).json({ message: "Not your appointment." });
    if (req.user.role === "patient" && status && !["cancelled", "rescheduled"].includes(status)) return res.status(403).json({ message: "Patients can only cancel or reschedule appointments." });
    await db.execute("UPDATE appointments SET status=COALESCE(?,status), appointment_date=COALESCE(?,appointment_date), appointment_time=COALESCE(?,appointment_time), reason=COALESCE(?,reason), notes=COALESCE(?,notes) WHERE id=?", [status || null, appointment_date || null, appointment_time || null, reason || null, notes || null, item.id]);
    res.json({ message: "Appointment updated." });
};
