const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const safeUser = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address });
const tokenFor = (user) => jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "8h" });

exports.register = async (req, res) => {
    const { name, email, password, role = "patient", phone, address } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
    if (!['patient', 'doctor', 'admin'].includes(role)) return res.status(400).json({ message: "Invalid account role." });
    try {
        const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length) return res.status(409).json({ message: "An account with this email already exists." });
        const hash = await bcrypt.hash(password, 12);
        const [result] = await db.execute("INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)", [name, email, hash, role, phone || null, address || null]);
        const user = { id: result.insertId, name, email, role, phone: phone || null, address: address || null };
        if (role === "patient") await db.execute("INSERT INTO patient_profiles (user_id) VALUES (?)", [user.id]);
        if (role === "doctor") await db.execute("INSERT INTO doctor_profiles (user_id) VALUES (?)", [user.id]);
        res.status(201).json({ message: "Account created successfully.", token: tokenFor(user), user: safeUser(user) });
    } catch (error) {
        res.status(500).json({ message: "Could not create your account.", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });
    try {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Incorrect email or password." });
        res.json({ message: "Welcome back.", token: tokenFor(user), user: safeUser(user) });
    } catch (error) {
        res.status(500).json({ message: "Could not sign you in.", error: error.message });
    }
};

exports.me = async (req, res) => {
    const [rows] = await db.execute("SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?", [req.user.id]);
    if (!rows[0]) return res.status(404).json({ message: "User not found." });
    res.json(rows[0]);
};
