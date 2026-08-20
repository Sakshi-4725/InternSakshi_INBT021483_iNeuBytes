const db = require("../config/db");

exports.list = async (req, res) => {
    const { department, search } = req.query;
    let sql = `SELECT u.id, u.name, u.email, u.phone, d.specialization, d.qualification, d.experience, d.consultation_fee, d.availability,
        dept.id AS department_id, dept.name AS department FROM users u JOIN doctor_profiles d ON d.user_id = u.id LEFT JOIN departments dept ON dept.id = d.department_id WHERE u.role = 'doctor'`;
    const values = [];
    if (department) { sql += " AND dept.id = ?"; values.push(department); }
    if (search) { sql += " AND (u.name LIKE ? OR d.specialization LIKE ?)"; values.push(`%${search}%`, `%${search}%`); }
    sql += " ORDER BY u.name";
    const [rows] = await db.execute(sql, values);
    res.json(rows);
};

exports.profile = async (req, res) => {
    const [rows] = await db.execute(`SELECT u.id, u.name, u.email, u.phone, u.address, d.*, dept.name AS department
        FROM users u JOIN doctor_profiles d ON d.user_id=u.id LEFT JOIN departments dept ON dept.id=d.department_id WHERE u.id=?`, [req.user.id]);
    res.json(rows[0] || {});
};

exports.updateProfile = async (req, res) => {
    const { name, phone, address, department_id, specialization, qualification, experience, consultation_fee, availability } = req.body;
    try {
        await db.execute("UPDATE users SET name=COALESCE(?, name), phone=?, address=? WHERE id=?", [name || null, phone || null, address || null, req.user.id]);
        await db.execute(`UPDATE doctor_profiles SET department_id=?, specialization=?, qualification=?, experience=?, consultation_fee=?, availability=? WHERE user_id=?`,
            [department_id || null, specialization || null, qualification || null, Number(experience) || 0, Number(consultation_fee) || 0, availability || null, req.user.id]);
        exports.profile(req, res);
    } catch (error) { res.status(500).json({ message: "Could not update profile.", error: error.message }); }
};
