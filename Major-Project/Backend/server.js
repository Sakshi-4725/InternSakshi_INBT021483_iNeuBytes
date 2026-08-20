const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, ".env"),
    override: true
});

console.log("DB CONFIG:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const recordRoutes = require("./routes/recordRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5000").split(",").map(origin => origin.trim());

app.disable("x-powered-by");
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); callback(new Error("Origin is not allowed by CORS.")); } }));
app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/public", publicRoutes);

app.get("/api/health", async (req, res, next) => {
    try { await db.query("SELECT 1"); res.json({ status: "ok" }); }
    catch (error) { next(error); }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.use((req, res) => res.status(404).json({ message: "Route not found." }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error." });
});

// Server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await db.verifyConnection();
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Unable to start server because the database is unavailable:", error.message);
        process.exit(1);
    }
}

if (require.main === module) startServer();
module.exports = app;
