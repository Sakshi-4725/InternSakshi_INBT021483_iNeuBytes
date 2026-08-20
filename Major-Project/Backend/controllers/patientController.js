const db = require("../config/db");

exports.profile = async (req, res) => {
    const [rows] = await db.execute(`SELECT u.id, u.name, u.email, u.phone, u.address, p.date_of_birth, p.gender, p.blood_group, p.emergency_contact, p.medical_history
        FROM users u LEFT JOIN patient_profiles p ON p.user_id = u.id WHERE u.id = ?`, [req.user.id]);
    res.json(rows[0] || {});
};

exports.updateProfile = async (req, res) => {
    const { name, phone, address, date_of_birth, gender, blood_group, emergency_contact, medical_history } = req.body;
    try {
        await db.execute("UPDATE users SET name = COALESCE(?, name), phone = ?, address = ? WHERE id = ?", [name || null, phone || null, address || null, req.user.id]);
        await db.execute(`INSERT INTO patient_profiles (user_id, date_of_birth, gender, blood_group, emergency_contact, medical_history)
            VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE date_of_birth=VALUES(date_of_birth), gender=VALUES(gender), blood_group=VALUES(blood_group), emergency_contact=VALUES(emergency_contact), medical_history=VALUES(medical_history)`,
            [req.user.id, date_of_birth || null, gender || null, blood_group || null, emergency_contact || null, medical_history || null]);
        exports.profile(req, res);
    } catch (error) { res.status(500).json({ message: "Could not update profile.", error: error.message }); }
};
