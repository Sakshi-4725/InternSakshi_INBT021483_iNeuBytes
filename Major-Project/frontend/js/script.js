/* =========================================================
   MEDICARE HEALTHCARE SYSTEM
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOCTOR DATA
========================================================= */

const doctors = [

    {
        id: 1,
        name: "Dr. Emily Carter",
        specialty: "Cardiologist",
        qualification: "MBBS, MD Cardiology",
        experience: 12,
        rating: 4.9,
        reviews: 328,
        fee: 800,
        available: "09:00 AM - 02:00 PM",
        hospital: "MediCare Heart Institute",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },

    {
        id: 2,
        name: "Dr. Michael Anderson",
        specialty: "Neurologist",
        qualification: "MBBS, DM Neurology",
        experience: 15,
        rating: 4.8,
        reviews: 291,
        fee: 1000,
        available: "10:00 AM - 04:00 PM",
        hospital: "City Neuro Center",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },

    {
        id: 3,
        name: "Dr. Sophia Williams",
        specialty: "Dermatologist",
        qualification: "MBBS, MD Dermatology",
        experience: 9,
        rating: 4.9,
        reviews: 245,
        fee: 700,
        available: "11:00 AM - 05:00 PM",
        hospital: "Skin & Wellness Clinic",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    },

    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Orthopedic",
        qualification: "MBBS, MS Orthopedics",
        experience: 14,
        rating: 4.7,
        reviews: 198,
        fee: 900,
        available: "09:30 AM - 03:00 PM",
        hospital: "MediCare Orthopedic Center",
        image: "https://randomuser.me/api/portraits/men/46.jpg"
    },

    {
        id: 5,
        name: "Dr. Olivia Brown",
        specialty: "Pediatrician",
        qualification: "MBBS, MD Pediatrics",
        experience: 11,
        rating: 4.9,
        reviews: 372,
        fee: 650,
        available: "10:00 AM - 06:00 PM",
        hospital: "Little Stars Hospital",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },

    {
        id: 6,
        name: "Dr. Daniel Miller",
        specialty: "Cardiologist",
        qualification: "MBBS, DM Cardiology",
        experience: 17,
        rating: 4.8,
        reviews: 410,
        fee: 1200,
        available: "08:00 AM - 01:00 PM",
        hospital: "Apollo Medical Center",
        image: "https://randomuser.me/api/portraits/men/41.jpg"
    },

    {
        id: 7,
        name: "Dr. Ava Martinez",
        specialty: "Neurologist",
        qualification: "MBBS, MD, DM Neurology",
        experience: 10,
        rating: 4.8,
        reviews: 219,
        fee: 950,
        available: "12:00 PM - 06:00 PM",
        hospital: "NeuroCare Hospital",
        image: "https://randomuser.me/api/portraits/women/50.jpg"
    },

    {
        id: 8,
        name: "Dr. Robert Taylor",
        specialty: "Orthopedic",
        qualification: "MBBS, MS Orthopedics",
        experience: 13,
        rating: 4.7,
        reviews: 187,
        fee: 850,
        available: "09:00 AM - 03:00 PM",
        hospital: "Bone & Joint Center",
        image: "https://randomuser.me/api/portraits/men/52.jpg"
    }

];


/* =========================================================
   DEMO USERS
========================================================= */

const defaultUsers = [

    {
        id: 1,
        name: "Sakshi Patient",
        email: "patient@medicare.com",
        password: "123456",
        role: "patient",
        phone: "+91 98765 11111",
        age: 21,
        gender: "Female",
        bloodGroup: "B+",
        image: "https://randomuser.me/api/portraits/women/79.jpg"
    },

    {
        id: 2,
        name: "Dr. Emily Carter",
        email: "doctor@medicare.com",
        password: "123456",
        role: "doctor",
        doctorId: 1,
        phone: "+91 98765 22222",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },

    {
        id: 3,
        name: "Admin",
        email: "admin@medicare.com",
        password: "admin123",
        role: "admin",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    }

];


/* =========================================================
   INITIALIZE LOCAL STORAGE
========================================================= */

function initializeStorage() {

    if (!localStorage.getItem("medicareUsers")) {

        localStorage.setItem(
            "medicareUsers",
            JSON.stringify(defaultUsers)
        );

    }

    if (!localStorage.getItem("medicareDoctors")) {

        localStorage.setItem(
            "medicareDoctors",
            JSON.stringify(doctors)
        );

    }

    if (!localStorage.getItem("medicareAppointments")) {

        const defaultAppointments = [

            {
                id: 1001,
                patientId: 1,
                patientName: "Sakshi Patient",
                doctorId: 1,
                doctorName: "Dr. Emily Carter",
                specialty: "Cardiologist",
                date: "2026-08-24",
                time: "10:30 AM",
                status: "Confirmed",
                reason: "Regular Heart Checkup"
            },

            {
                id: 1002,
                patientId: 1,
                patientName: "Sakshi Patient",
                doctorId: 3,
                doctorName: "Dr. Sophia Williams",
                specialty: "Dermatologist",
                date: "2026-08-28",
                time: "02:00 PM",
                status: "Pending",
                reason: "Skin Consultation"
            }

        ];

        localStorage.setItem(
            "medicareAppointments",
            JSON.stringify(defaultAppointments)
        );

    }

}


/* =========================================================
   GET DATA
========================================================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("medicareUsers") || "[]"
    );

}

function getDoctors() {

    return JSON.parse(
        localStorage.getItem("medicareDoctors") || "[]"
    );

}

function getAppointments() {

    return JSON.parse(
        localStorage.getItem("medicareAppointments") || "[]"
    );

}


/* =========================================================
   SAVE DATA
========================================================= */

function saveUsers(users) {

    localStorage.setItem(
        "medicareUsers",
        JSON.stringify(users)
    );

}

function saveAppointments(appointments) {

    localStorage.setItem(
        "medicareAppointments",
        JSON.stringify(appointments)
    );

}


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("medicareCurrentUser") || "null"
    );

}

function setCurrentUser(user) {

    localStorage.setItem(
        "medicareCurrentUser",
        JSON.stringify(user)
    );

}

function logout() {

    localStorage.removeItem("medicareCurrentUser");

    window.location.href =
        getRootPath() + "pages/login.html";

}


/* =========================================================
   PATH HELPER
========================================================= */

function getRootPath() {

    if (window.location.pathname.includes("/pages/")) {
        return "../";
    }

    return "";
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <i class="fa-solid ${
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation"
        }"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3500);

}


/* =========================================================
   LOAD DOCTORS ON HOME PAGE
========================================================= */

function loadDoctors(filter = "all") {

    const grid =
        document.getElementById("doctorGrid");

    if (!grid) return;

    const data = getDoctors();

    const filtered =
        filter === "all"
            ? data
            : data.filter(
                doctor =>
                    doctor.specialty === filter
            );

    grid.innerHTML = filtered.map(doctor => `

        <div class="doctor-card">

            <div class="doctor-image">

                <img
                    src="${doctor.image}"
                    alt="${doctor.name}">

                <span class="verified-badge">
                    <i class="fa-solid fa-circle-check"></i>
                    Verified
                </span>

            </div>

            <div class="doctor-info">

                <div class="doctor-top">

                    <div>

                        <h3>${doctor.name}</h3>

                        <span class="doctor-specialty">
                            ${doctor.specialty}
                        </span>

                    </div>

                    <div class="rating">
                        ★ ${doctor.rating}
                        <span>(${doctor.reviews})</span>
                    </div>

                </div>

                <div class="doctor-meta">

                    <span>
                        <i class="fa-solid fa-briefcase"></i>
                        ${doctor.experience} yrs
                    </span>

                    <span>
                        <i class="fa-solid fa-hospital"></i>
                        ${doctor.hospital}
                    </span>

                </div>

                <div class="doctor-bottom">

                    <div class="fee">
                        ₹${doctor.fee}
                        <small>/ visit</small>
                    </div>

                    <button
                        class="book-btn"
                        onclick="bookDoctor(${doctor.id})">

                        Book Appointment

                    </button>

                </div>

            </div>

        </div>

    `).join("");

}


/* =========================================================
   BOOK DOCTOR
========================================================= */

function bookDoctor(doctorId) {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        window.location.href =
            "pages/login.html";

        return;

    }

    if (currentUser.role !== "patient") {

        showToast(
            "Only patients can book appointments.",
            "error"
        );

        return;

    }

    window.location.href =
        `pages/patient-dashboard.html?doctor=${doctorId}`;

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

function initializeFilters() {

    const buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            loadDoctors(
                button.dataset.specialty
            );

        });

    });

}


/* =========================================================
   LOGIN
========================================================= */

function initializeLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("password").value;

        const users = getUsers();

        const user = users.find(
            item =>
                item.email.toLowerCase() === email &&
                item.password === password
        );

        if (!user) {

            showToast(
                "Invalid email or password.",
                "error"
            );

            return;

        }

        setCurrentUser(user);

        showToast(
            "Login successful! Redirecting..."
        );

        setTimeout(() => {

            if (user.role === "admin") {

                window.location.href =
                    "admin-dashboard.html";

            } else if (user.role === "doctor") {

                window.location.href =
                    "doctor-dashboard.html";

            } else {

                window.location.href =
                    "patient-dashboard.html";

            }

        }, 700);

    });

}


/* =========================================================
   REGISTER
========================================================= */

function initializeRegister() {

    const form =
        document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value
                .trim()
                .toLowerCase();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const gender =
            document.getElementById("gender").value;

        const age =
            document.getElementById("age").value;

        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {

            showToast(
                "Please fill all required fields.",
                "error"
            );

            return;

        }

        if (password.length < 6) {

            showToast(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }

        if (password !== confirmPassword) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;

        }

        const users = getUsers();

        if (
            users.some(
                user =>
                    user.email.toLowerCase() === email
            )
        ) {

            showToast(
                "An account with this email already exists.",
                "error"
            );

            return;

        }

        const newUser = {

            id: Date.now(),

            name,

            email,

            password,

            role: "patient",

            phone,

            age,

            gender,

            bloodGroup: "Not specified",

            image:
                "https://randomuser.me/api/portraits/women/79.jpg"

        };

        users.push(newUser);

        saveUsers(users);

        setCurrentUser(newUser);

        showToast(
            "Account created successfully!"
        );

        setTimeout(() => {

            window.location.href =
                "patient-dashboard.html";

        }, 800);

    });

}


/* =========================================================
   PATIENT DASHBOARD
========================================================= */

function initializePatientDashboard() {

    const dashboard =
        document.getElementById("patientDashboard");

    if (!dashboard) return;

    const user = getCurrentUser();

    if (!user || user.role !== "patient") {

        window.location.href = "login.html";

        return;

    }

    document.getElementById("patientName").textContent =
        user.name;

    document.getElementById("patientHeaderName").textContent =
        user.name;

    document.getElementById("patientEmail").textContent =
        user.email;

    const avatar =
        document.getElementById("patientAvatar");

    if (avatar) {
        avatar.src = user.image;
    }

    loadPatientAppointments(user);

    setupAppointmentModal(user);

}


/* =========================================================
   PATIENT APPOINTMENTS
========================================================= */

function loadPatientAppointments(user) {

    const appointments =
        getAppointments()
            .filter(
                appointment =>
                    appointment.patientId === user.id
            );

    const container =
        document.getElementById(
            "patientAppointments"
        );

    if (!container) return;

    if (!appointments.length) {

        container.innerHTML = `
            <div class="empty-state">
                No appointments found.
            </div>
        `;

        return;

    }

    container.innerHTML =
        appointments.map(appointment => {

            const date =
                new Date(appointment.date);

            return `

                <div class="appointment-item">

                    <div class="appointment-date">

                        <strong>
                            ${date.getDate()}
                        </strong>

                        <span>
                            ${date.toLocaleString(
                                "en",
                                {month:"short"}
                            )}
                        </span>

                    </div>

                    <div class="appointment-details">

                        <strong>
                            ${appointment.doctorName}
                        </strong>

                        <span>
                            ${appointment.specialty}
                            •
                            ${appointment.time}
                        </span>

                    </div>

                    <span class="status ${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>

                </div>

            `;

        }).join("");

    const stat =
        document.getElementById("appointmentCount");

    if (stat) {
        stat.textContent = appointments.length;
    }

}


/* =========================================================
   APPOINTMENT MODAL
========================================================= */

function setupAppointmentModal(user) {

    const modal =
        document.getElementById(
            "appointmentModal"
        );

    if (!modal) return;

    const doctorSelect =
        document.getElementById(
            "appointmentDoctor"
        );

    if (doctorSelect) {

        doctorSelect.innerHTML =
            `<option value="">Select Doctor</option>` +

            getDoctors().map(
                doctor => `

                    <option value="${doctor.id}">
                        ${doctor.name}
                        - ${doctor.specialty}
                    </option>

                `
            ).join("");

    }


    const params =
        new URLSearchParams(
            window.location.search
        );

    const doctorId =
        params.get("doctor");

    if (doctorId) {

        modal.classList.add("show");

        if (doctorSelect) {
            doctorSelect.value = doctorId;
        }

    }


    const form =
        document.getElementById(
            "appointmentForm"
        );

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const doctorId =
            Number(
                document.getElementById(
                    "appointmentDoctor"
                ).value
            );

        const date =
            document.getElementById(
                "appointmentDate"
            ).value;

        const time =
            document.getElementById(
                "appointmentTime"
            ).value;

        const reason =
            document.getElementById(
                "appointmentReason"
            ).value;

        if (!doctorId || !date || !time) {

            showToast(
                "Please complete appointment details.",
                "error"
            );

            return;

        }

        const doctor =
            getDoctors().find(
                item => item.id === doctorId
            );

        const appointments =
            getAppointments();

        appointments.push({

            id: Date.now(),

            patientId: user.id,

            patientName: user.name,

            doctorId: doctor.id,

            doctorName: doctor.name,

            specialty: doctor.specialty,

            date,

            time,

            reason,

            status: "Pending"

        });

        saveAppointments(appointments);

        modal.classList.remove("show");

        form.reset();

        loadPatientAppointments(user);

        showToast(
            "Appointment booked successfully!"
        );

    });

}


/* =========================================================
   OPEN APPOINTMENT MODAL
========================================================= */

function openAppointmentModal() {

    const modal =
        document.getElementById(
            "appointmentModal"
        );

    if (modal) {
        modal.classList.add("show");
    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    document
        .querySelectorAll(".modal")
        .forEach(modal =>
            modal.classList.remove("show")
        );

}


/* =========================================================
   DOCTOR DASHBOARD
========================================================= */

function initializeDoctorDashboard() {
   

    const dashboard =
        document.getElementById(
            "doctorDashboard"
        );
    

    if (!dashboard) return;

    const user = getCurrentUser();

    if (!user || user.role !== "doctor") {

        window.location.href = "login.html";

        return;

    }

    const doctor =
        getDoctors().find(
            item => item.id === user.doctorId
        );

    if (!doctor) return;

    document.getElementById(
        "doctorName"
    ).textContent = doctor.name;

    document.getElementById(
        "doctorSpecialty"
    ).textContent = doctor.specialty;

    document.getElementById(
        "doctorQualification"
    ).textContent = doctor.qualification;

    document.getElementById(
        "doctorExperience"
    ).textContent =
        doctor.experience + " Years Experience";

    document.getElementById(
        "doctorAvatar"
    ).src = doctor.image;

    const profileImage =
    document.getElementById("doctorProfileImage");

if (profileImage) {
    profileImage.src = doctor.image;
}

    document.getElementById(
        "doctorHeaderName"
    ).textContent = doctor.name;

    loadDoctorAppointments(doctor);

}


/* =========================================================
   DOCTOR APPOINTMENTS
========================================================= */

function loadDoctorAppointments(doctor) {

    const appointments =
        getAppointments()
            .filter(
                appointment =>
                    appointment.doctorId === doctor.id
            );

    const container =
        document.getElementById(
            "doctorAppointments"
        );

    if (!container) return;

    container.innerHTML =
        appointments.map(appointment => `

            <tr>

                <td>
                    <strong>
                        ${appointment.patientName}
                    </strong>
                </td>

                <td>
                    ${appointment.date}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>
                    ${appointment.reason || "Consultation"}
                </td>

                <td>

                    <span class="status ${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>

                </td>

                <td>

                    ${
                        appointment.status === "Pending"

                        ?

                        `
                        <button
                            class="book-btn"
                            onclick="updateAppointmentStatus(
                                ${appointment.id},
                                'Confirmed'
                            )">

                            Confirm

                        </button>
                        `

                        :

                        `
                        <button
                            class="btn btn-outline"
                            onclick="updateAppointmentStatus(
                                ${appointment.id},
                                'Completed'
                            )">

                            Complete

                        </button>
                        `

                    }

                </td>

            </tr>

        `).join("");

    const count =
        document.getElementById(
            "doctorAppointmentCount"
        );

    if (count) {
        count.textContent = appointments.length;
    }

}


/* =========================================================
   UPDATE APPOINTMENT
========================================================= */

function updateAppointmentStatus(
    appointmentId,
    status
) {

    const appointments =
        getAppointments();

    const appointment =
        appointments.find(
            item => item.id === appointmentId
        );

    if (!appointment) return;

    appointment.status = status;

    saveAppointments(appointments);

    showToast(
        `Appointment marked as ${status}.`
    );

    initializeDoctorDashboard();

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function initializeAdminDashboard() {

    const dashboard =
        document.getElementById(
            "adminDashboard"
        );

    if (!dashboard) return;

    const user = getCurrentUser();

    if (!user || user.role !== "admin") {

        window.location.href = "login.html";

        return;

    }

    loadAdminStats();

    loadAdminUsers();

    loadAdminAppointments();

}


/* =========================================================
   ADMIN STATS
========================================================= */

function loadAdminStats() {

    const users = getUsers();

    const appointments = getAppointments();

    const patients =
        users.filter(
            user => user.role === "patient"
        ).length;

    const doctorCount =
        getDoctors().length;

    const patientElement =
        document.getElementById(
            "adminPatients"
        );

    const doctorElement =
        document.getElementById(
            "adminDoctors"
        );

    const appointmentElement =
        document.getElementById(
            "adminAppointments"
        );

    if (patientElement) {
        patientElement.textContent = patients;
    }

    if (doctorElement) {
        doctorElement.textContent = doctorCount;
    }

    if (appointmentElement) {
        appointmentElement.textContent =
            appointments.length;
    }

}


/* =========================================================
   ADMIN USERS
========================================================= */

function loadAdminUsers() {

    const container =
        document.getElementById(
            "adminUsers"
        );

    if (!container) return;

    const users =
        getUsers()
            .filter(
                user =>
                    user.role !== "admin"
            );

    container.innerHTML =
        users.map(user => `

            <tr>

                <td>

                    <strong>
                        ${user.name}
                    </strong>

                </td>

                <td>
                    ${user.email}
                </td>

                <td>
                    ${user.phone || "-"}
                </td>

                <td>
                    <span class="status confirmed">
                        ${user.role}
                    </span>
                </td>

                <td>
                    <button
                        class="book-btn"
                        onclick="deleteUser(${user.id})">

                        Delete

                    </button>
                </td>

            </tr>

        `).join("");

}


/* =========================================================
   ADMIN APPOINTMENTS
========================================================= */

function loadAdminAppointments() {

    const container =
        document.getElementById(
            "adminAppointmentTable"
        );

    if (!container) return;

    const appointments =
        getAppointments();

    container.innerHTML =
        appointments.map(appointment => `

            <tr>

                <td>
                    ${appointment.patientName}
                </td>

                <td>
                    ${appointment.doctorName}
                </td>

                <td>
                    ${appointment.date}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>

                    <span class="status ${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>

                </td>

            </tr>

        `).join("");

}


/* =========================================================
   DELETE USER
========================================================= */

function deleteUser(userId) {

    if (
        !confirm(
            "Are you sure you want to delete this user?"
        )
    ) return;

    let users = getUsers();

    users =
        users.filter(
            user => user.id !== userId
        );

    saveUsers(users);

    loadAdminUsers();

    loadAdminStats();

    showToast(
        "User deleted successfully."
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );

    const nav =
        document.querySelector(
            ".nav-links"
        );

    if (!button || !nav) return;

    button.addEventListener(
        "click",
        () => {

            nav.style.display =
                nav.style.display === "flex"
                    ? "none"
                    : "flex";

            nav.style.position = "absolute";

            nav.style.top = "76px";

            nav.style.left = "0";

            nav.style.right = "0";

            nav.style.background = "white";

            nav.style.padding = "20px";

            nav.style.flexDirection = "column";

            nav.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.1)";

        }
    );

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeStorage();

        loadDoctors();

        initializeFilters();

        initializeLogin();

        initializeRegister();

        initializePatientDashboard();

        initializeDoctorDashboard();

        initializeAdminDashboard();

        initializeMobileMenu();

        document
            .querySelectorAll(".logout-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    logout
                );

            });

    }
);

/* =========================================================
   API INTEGRATION
   The functions below replace the original demo-localStorage flows.
========================================================= */

const API_BASE = "/api";
const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/lego/2.jpg";

function getAuthToken() {
    return localStorage.getItem("medicareAuthToken");
}

function saveSession(user, token) {
    setCurrentUser(user);
    localStorage.setItem("medicareAuthToken", token);
}

async function api(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("medicareAuthToken");
            localStorage.removeItem("medicareCurrentUser");
        }
        throw new Error(data.message || "Something went wrong. Please try again.");
    }
    return data;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

function toApiTime(value) {
    const match = String(value).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return value;
    let hour = Number(match[1]);
    if (match[3].toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (match[3].toUpperCase() === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

function formatTime(value) {
    const parts = String(value || "").slice(0, 5).split(":");
    if (parts.length !== 2) return value || "";
    let hour = Number(parts[0]);
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${String(hour).padStart(2, "0")}:${parts[1]} ${suffix}`;
}

function mapDoctor(doctor) {
    return {
        ...doctor,
        specialty: doctor.specialization || doctor.department || "General Medicine",
        qualification: doctor.qualification || "",
        experience: doctor.experience || 0,
        fee: doctor.consultation_fee || 0,
        hospital: doctor.department || "MediCare Healthcare",
        image: DEFAULT_AVATAR
    };
}

async function loadDoctors(filter = "all") {
    const grid = document.getElementById("doctorGrid");
    try {
        const doctors = (await api("/doctors")).map(mapDoctor);
        const filtered = filter === "all" ? doctors : doctors.filter(d => d.specialty === filter);
        if (!grid) return doctors;
        grid.innerHTML = filtered.length ? filtered.map(doctor => `
            <div class="doctor-card"><div class="doctor-image"><img src="${doctor.image}" alt="${escapeHtml(doctor.name)}"></div>
            <div class="doctor-info"><div class="doctor-top"><div><h3>${escapeHtml(doctor.name)}</h3><span class="doctor-specialty">${escapeHtml(doctor.specialty)}</span></div></div>
            <div class="doctor-meta"><span><i class="fa-solid fa-briefcase"></i> ${doctor.experience} yrs</span><span><i class="fa-solid fa-hospital"></i> ${escapeHtml(doctor.hospital)}</span></div>
            <div class="doctor-bottom"><div class="fee">₹${doctor.fee}<small>/ visit</small></div><button class="book-btn" onclick="bookDoctor(${doctor.id})">Book Appointment</button></div></div></div>`).join("") :
            '<div class="empty-state">No doctors found.</div>';
        return doctors;
    } catch (error) {
        if (grid) grid.innerHTML = '<div class="empty-state">Unable to load doctors. Please start the server and try again.</div>';
        return [];
    }
}

function logout() {
    localStorage.removeItem("medicareCurrentUser");
    localStorage.removeItem("medicareAuthToken");
    window.location.href = getRootPath() + "pages/login.html";
}

function initializeLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", async event => {
        event.preventDefault();
        try {
            const data = await api("/auth/login", { method: "POST", body: JSON.stringify({
                email: document.getElementById("email").value.trim().toLowerCase(),
                password: document.getElementById("password").value
            }) });
            saveSession(data.user, data.token);
            showToast("Login successful! Redirecting...");
            setTimeout(() => { window.location.href = data.user.role === "admin" ? "admin-dashboard.html" : data.user.role === "doctor" ? "doctor-dashboard.html" : "patient-dashboard.html"; }, 500);
        } catch (error) { showToast(error.message, "error"); }
    });
}

function initializeRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", async event => {
        event.preventDefault();
        const password = document.getElementById("password").value;
        if (password !== document.getElementById("confirmPassword").value) return showToast("Passwords do not match.", "error");
        try {
            const data = await api("/auth/register", { method: "POST", body: JSON.stringify({
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim().toLowerCase(),
                phone: document.getElementById("phone").value.trim(), password, role: "patient"
            }) });
            saveSession(data.user, data.token);
            showToast("Account created successfully!");
            setTimeout(() => { window.location.href = "patient-dashboard.html"; }, 500);
        } catch (error) { showToast(error.message, "error"); }
    });
}

async function loadPatientAppointments() {
    const container = document.getElementById("patientAppointments");
    if (!container) return;
    try {
        const appointments = await api("/appointments");
        container.innerHTML = appointments.length ? appointments.map(a => {
            const date = new Date(a.appointment_date);
            return `<div class="appointment-item"><div class="appointment-date"><strong>${date.getDate()}</strong><span>${date.toLocaleString("en", { month: "short" })}</span></div><div class="appointment-details"><strong>${escapeHtml(a.doctor_name)}</strong><span>${escapeHtml(a.specialization || a.department || "Consultation")} • ${formatTime(a.appointment_time)}</span></div><span class="status ${a.status}">${a.status}</span></div>`;
        }).join("") : '<div class="empty-state">No appointments found.</div>';
        const count = document.getElementById("appointmentCount");
        if (count) count.textContent = appointments.length;
    } catch (error) { container.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`; }
}

async function setupAppointmentModal() {
    const modal = document.getElementById("appointmentModal");
    const doctorSelect = document.getElementById("appointmentDoctor");
    if (!modal || !doctorSelect) return;
    const doctors = await loadDoctors();
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>' + doctors.map(d => `<option value="${d.id}">${escapeHtml(d.name)} - ${escapeHtml(d.specialty)}</option>`).join("");
    const selected = new URLSearchParams(window.location.search).get("doctor");
    if (selected) { doctorSelect.value = selected; modal.classList.add("show"); }
    const form = document.getElementById("appointmentForm");
    if (!form || form.dataset.apiReady) return;
    form.dataset.apiReady = "true";
    form.addEventListener("submit", async event => {
        event.preventDefault();
        try {
            await api("/appointments", { method: "POST", body: JSON.stringify({
                doctor_id: Number(doctorSelect.value), appointment_date: document.getElementById("appointmentDate").value,
                appointment_time: toApiTime(document.getElementById("appointmentTime").value), reason: document.getElementById("appointmentReason").value.trim()
            }) });
            modal.classList.remove("show"); form.reset(); await loadPatientAppointments(); showToast("Appointment booked successfully!");
        } catch (error) { showToast(error.message, "error"); }
    });
}

async function initializePatientDashboard() {
    const dashboard = document.getElementById("patientDashboard");
    if (!dashboard) return;
    const user = getCurrentUser();
    if (!user || user.role !== "patient" || !getAuthToken()) return window.location.href = "login.html";
    ["patientName", "patientHeaderName", "patientProfileName"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = user.name; });
    const email = document.getElementById("patientEmail"); if (email) email.textContent = user.email;
    ["patientAvatar", "patientProfileImage"].forEach(id => { const el = document.getElementById(id); if (el) el.src = DEFAULT_AVATAR; });
    await Promise.all([loadPatientAppointments(), setupAppointmentModal()]);
}

async function loadDoctorAppointments() {
    const container = document.getElementById("doctorAppointments");
    if (!container) return;
    try {
        const appointments = await api("/appointments");
        container.innerHTML = appointments.map(a => `<tr><td><strong>${escapeHtml(a.patient_name)}</strong></td><td>${a.appointment_date}</td><td>${formatTime(a.appointment_time)}</td><td>${escapeHtml(a.reason || "Consultation")}</td><td><span class="status ${a.status}">${a.status}</span></td><td><button class="book-btn" onclick="updateAppointmentStatus(${a.id}, '${a.status === "pending" ? "confirmed" : "completed"}')">${a.status === "pending" ? "Confirm" : "Complete"}</button></td></tr>`).join("");
        const count = document.getElementById("doctorAppointmentCount"); if (count) count.textContent = appointments.length;
    } catch (error) { container.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`; }
}

async function initializeDoctorDashboard() {
    const dashboard = document.getElementById("doctorDashboard");
    if (!dashboard) return;
    const user = getCurrentUser();
    if (!user || user.role !== "doctor" || !getAuthToken()) return window.location.href = "login.html";
    try {
        const doctor = await api("/doctors/profile");
        const name = doctor.name || user.name;
        ["doctorName", "doctorHeaderName"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = name; });
        const specialty = document.getElementById("doctorSpecialty"); if (specialty) specialty.textContent = doctor.specialization || "Doctor";
        const qualification = document.getElementById("doctorQualification"); if (qualification) qualification.textContent = doctor.qualification || "";
        const experience = document.getElementById("doctorExperience"); if (experience) experience.textContent = `${doctor.experience || 0} Years Experience`;
        ["doctorAvatar", "doctorProfileImage"].forEach(id => { const el = document.getElementById(id); if (el) el.src = DEFAULT_AVATAR; });
        await loadDoctorAppointments();
    } catch (error) { showToast(error.message, "error"); }
}

async function updateAppointmentStatus(id, status) {
    try { await api(`/appointments/${id}`, { method: "PUT", body: JSON.stringify({ status }) }); await loadDoctorAppointments(); showToast(`Appointment marked as ${status}.`); }
    catch (error) { showToast(error.message, "error"); }
}

async function loadAdminStats() {
    try { const stats = await api("/admin/stats"); [["adminPatients", stats.patients], ["adminDoctors", stats.doctors], ["adminAppointments", stats.appointments]].forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.textContent = value; }); }
    catch (error) { showToast(error.message, "error"); }
}

async function loadAdminUsers() {
    const container = document.getElementById("adminUsers"); if (!container) return;
    try { const users = (await api("/admin/users")).filter(u => u.role !== "admin"); container.innerHTML = users.map(u => `<tr><td><strong>${escapeHtml(u.name)}</strong></td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.phone || "-")}</td><td><span class="status confirmed">${u.role}</span></td><td><button class="book-btn" onclick="deleteUser(${u.id})">Delete</button></td></tr>`).join(""); }
    catch (error) { container.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`; }
}

async function loadAdminAppointments() {
    const container = document.getElementById("adminAppointmentTable"); if (!container) return;
    try { const rows = await api("/admin/appointments"); container.innerHTML = rows.map(a => `<tr><td>${escapeHtml(a.patient_name)}</td><td>${escapeHtml(a.doctor_name)}</td><td>${a.appointment_date}</td><td>${formatTime(a.appointment_time)}</td><td><span class="status ${a.status}">${a.status}</span></td></tr>`).join(""); }
    catch (error) { container.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`; }
}

async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try { await api(`/admin/users/${id}`, { method: "DELETE" }); await Promise.all([loadAdminUsers(), loadAdminStats()]); showToast("User deleted successfully."); }
    catch (error) { showToast(error.message, "error"); }
}
