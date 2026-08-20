CREATE DATABASE IF NOT EXISTS healthcare_management;

USE healthcare_management;

-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',

    phone VARCHAR(20),

    address VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================
-- DEPARTMENTS TABLE
-- =========================================

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- PATIENT PROFILES TABLE
-- =========================================

CREATE TABLE patient_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    date_of_birth DATE,

    gender ENUM('Male', 'Female', 'Other'),

    blood_group VARCHAR(10),

    emergency_contact VARCHAR(20),

    medical_history TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- =========================================
-- DOCTOR PROFILES TABLE
-- =========================================

CREATE TABLE doctor_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    department_id INT,

    specialization VARCHAR(150),

    qualification VARCHAR(255),

    experience INT DEFAULT 0,

    consultation_fee DECIMAL(10,2) DEFAULT 0.00,

    availability VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
);


-- =========================================
-- APPOINTMENTS TABLE
-- =========================================

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    patient_id INT NOT NULL,

    doctor_id INT NOT NULL,

    appointment_date DATE NOT NULL,

    appointment_time TIME NOT NULL,

    reason TEXT,

    status ENUM(
        'pending',
        'confirmed',
        'completed',
        'cancelled',
        'rescheduled'
    ) DEFAULT 'pending',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- =========================================
-- MEDICAL RECORDS TABLE
-- =========================================

CREATE TABLE medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,

    patient_id INT NOT NULL,

    doctor_id INT NOT NULL,

    appointment_id INT,

    diagnosis TEXT,

    prescription TEXT,

    treatment TEXT,

    notes TEXT,

    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE SET NULL
);


-- =========================================
-- NOTIFICATIONS TABLE
-- =========================================

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================================
-- CONTACT MESSAGES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- SAMPLE DEPARTMENTS
-- =========================================

INSERT INTO departments (name, description)
VALUES
('Cardiology', 'Department dealing with heart and cardiovascular diseases.'),
('Neurology', 'Department dealing with the nervous system and neurological disorders.'),
('Dermatology', 'Department dealing with skin, hair and nail conditions.'),
('Orthopedics', 'Department dealing with bones, joints and muscles.'),
('Pediatrics', 'Department providing healthcare for children.'),
('General Medicine', 'Department providing general medical consultation.');


-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_appointments_patient
ON appointments(patient_id);

CREATE INDEX idx_appointments_doctor
ON appointments(doctor_id);

CREATE INDEX idx_appointments_date
ON appointments(appointment_date);

CREATE INDEX idx_medical_records_patient
ON medical_records(patient_id);

CREATE INDEX idx_notifications_user
ON notifications(user_id);
