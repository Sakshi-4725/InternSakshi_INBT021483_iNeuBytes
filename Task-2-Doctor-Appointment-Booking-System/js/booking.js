const selectedDoctor =
    document.getElementById("selectedDoctor");

const timeSlot =
    document.getElementById("timeSlot");

const appointmentDate =
    document.getElementById("appointmentDate");

const liveSummary =
    document.getElementById("liveSummary");

const bookingForm =
    document.getElementById("bookingForm");


/* Get doctor ID from URL */

const params =
    new URLSearchParams(window.location.search);

const doctorId =
    Number(params.get("doctor"));


/* Set minimum appointment date to today */

const today =
    new Date().toISOString().split("T")[0];

appointmentDate.min = today;


/* Add doctors to dropdown */

doctors.forEach(doctor => {

    const option =
        document.createElement("option");

    option.value = doctor.id;

    option.textContent =
        `${doctor.name} — ${doctor.department}`;

    selectedDoctor.appendChild(option);

});


/* Automatically select doctor from URL */

if (doctorId) {

    selectedDoctor.value = doctorId;

    loadDoctorSlots(doctorId);

    updateSummary();

}


/* Load available time slots */

function loadDoctorSlots(id) {

    const doctor =
        doctors.find(
            doctor => doctor.id === Number(id)
        );


    timeSlot.innerHTML = `
        <option value="">
            Select a time slot
        </option>
    `;


    if (!doctor) {
        return;
    }


    doctor.slots.forEach(slot => {

        const option =
            document.createElement("option");

        option.value = slot;

        option.textContent = slot;

        timeSlot.appendChild(option);

    });

}


/* Doctor changed */

selectedDoctor.addEventListener(
    "change",
    () => {

        loadDoctorSlots(
            selectedDoctor.value
        );

        updateSummary();

    }
);


/* Update summary when fields change */

selectedDoctor.addEventListener(
    "change",
    updateSummary
);

appointmentDate.addEventListener(
    "change",
    updateSummary
);

timeSlot.addEventListener(
    "change",
    updateSummary
);


/* Update appointment summary */

function updateSummary() {

    const doctor =
        doctors.find(
            doctor =>
                doctor.id === Number(
                    selectedDoctor.value
                )
        );


    if (!doctor) {

        liveSummary.innerHTML = `

            <div class="summary-placeholder">

                <span>🩺</span>

                <p>
                    Select a doctor to view
                    appointment details.
                </p>

            </div>

        `;

        return;
    }


    const date =
        appointmentDate.value
            ? formatDate(appointmentDate.value)
            : "Select a date";


    const slot =
        timeSlot.value ||
        "Select a time slot";


    liveSummary.innerHTML = `

        <div class="summary-doctor">

            <div class="summary-doctor-icon">
                👨‍⚕️
            </div>

            <div>

                <h3>
                    ${doctor.name}
                </h3>

                <p>
                    ${doctor.department}
                </p>

            </div>

        </div>


        <div class="summary-row">

            <span>📅 Date</span>

            <strong>
                ${date}
            </strong>

        </div>


        <div class="summary-row">

            <span>🕐 Time</span>

            <strong>
                ${slot}
            </strong>

        </div>


        <div class="summary-row">

            <span>💰 Consultation Fee</span>

            <strong>
                ₹${doctor.fee}
            </strong>

        </div>

    `;

}


/* Format date */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* Form submission */

bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const doctor =
            doctors.find(
                doctor =>
                    doctor.id === Number(
                        selectedDoctor.value
                    )
            );


        if (!doctor) {

            alert("Please select a doctor.");

            return;

        }


        if (!appointmentDate.value) {

            alert("Please select an appointment date.");

            return;

        }


        if (!timeSlot.value) {

            alert("Please select a time slot.");

            return;

        }


        const appointment = {

            id: Date.now(),

            patientName:
                document.getElementById(
                    "patientName"
                ).value.trim(),

            age:
                document.getElementById(
                    "patientAge"
                ).value,

            gender:
                document.getElementById(
                    "gender"
                ).value,

            phone:
                document.getElementById(
                    "phone"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            doctorId:
                doctor.id,

            doctorName:
                doctor.name,

            department:
                doctor.department,

            date:
                appointmentDate.value,

            time:
                timeSlot.value,

            reason:
                document.getElementById(
                    "reason"
                ).value.trim(),

            fee:
                doctor.fee,

            status:
                "Confirmed"

        };


        /* Get previous appointments */

        const appointments =
            JSON.parse(
                localStorage.getItem(
                    "appointments"
                )
            ) || [];


        /* Add new appointment */

        appointments.push(appointment);


        /* Save appointments */

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );


        /* Store latest appointment */

        localStorage.setItem(
            "latestAppointment",
            JSON.stringify(appointment)
        );


        /* Go to confirmation */

        window.location.href =
            "confirmation.html";

    }
);