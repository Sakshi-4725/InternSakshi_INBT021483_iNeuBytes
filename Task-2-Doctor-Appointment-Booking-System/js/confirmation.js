const confirmationCard =
    document.getElementById("confirmationCard");


/*
    Get latest appointment
    from localStorage
*/

const appointment =
    JSON.parse(
        localStorage.getItem(
            "latestAppointment"
        )
    );


/*
    If no appointment exists
*/

if (!appointment) {

    confirmationCard.innerHTML = `

        <div class="confirmation-empty">

            <div class="empty-icon">
                📅
            </div>

            <h2>
                No Appointment Found
            </h2>

            <p>
                Please book an appointment first.
            </p>

            <a
                href="doctors.html"
                class="confirm-home-btn"
            >
                Find a Doctor
            </a>

        </div>

    `;

}


/*
    Display appointment
*/

else {

    confirmationCard.innerHTML = `

        <!-- Success -->

        <div class="success-section">

            <div class="success-icon">
                ✓
            </div>

            <h1>
                Appointment Confirmed!
            </h1>

            <p>
                Your appointment has been successfully booked.
            </p>

        </div>


        <!-- Booking ID -->

        <div class="booking-id">

            <span>
                Booking ID
            </span>

            <strong>
                MB-${appointment.id}
            </strong>

        </div>


        <!-- Appointment Information -->

        <div class="confirmation-details">


            <div class="confirmation-doctor">

                <div class="confirmation-doctor-icon">
                    <img src="${doctor.image}" alt="${doctor.name}">
                </div>

                <div>

                    <p>
                        ${appointment.department}
                    </p>

                    <h2>
                        ${appointment.doctorName}
                    </h2>

                </div>

            </div>


            <div class="confirmation-grid">


                <div class="confirmation-item">

                    <span>
                        👤 Patient
                    </span>

                    <strong>
                        ${appointment.patientName}
                    </strong>

                </div>


                <div class="confirmation-item">

                    <span>
                        📅 Date
                    </span>

                    <strong>
                        ${formatDate(appointment.date)}
                    </strong>

                </div>


                <div class="confirmation-item">

                    <span>
                        🕐 Time
                    </span>

                    <strong>
                        ${appointment.time}
                    </strong>

                </div>


                <div class="confirmation-item">

                    <span>
                        💰 Consultation Fee
                    </span>

                    <strong>
                        ₹${appointment.fee}
                    </strong>

                </div>


                <div class="confirmation-item">

                    <span>
                        📞 Phone
                    </span>

                    <strong>
                        ${appointment.phone}
                    </strong>

                </div>


                <div class="confirmation-item">

                    <span>
                        ✉️ Email
                    </span>

                    <strong>
                        ${appointment.email}
                    </strong>

                </div>

            </div>


            <!-- Status -->

            <div class="appointment-status">

                <span class="status-dot"></span>

                Appointment Status:
                <strong>
                    ${appointment.status}
                </strong>

            </div>


            <!-- Reason -->

            ${
                appointment.reason
                    ? `
                        <div class="visit-reason">

                            <strong>
                                Reason for Visit
                            </strong>

                            <p>
                                ${appointment.reason}
                            </p>

                        </div>
                    `
                    : ""
            }

        </div>


        <!-- Actions -->

        <div class="confirmation-actions">

            <a
                href="history.html"
                class="history-btn"
            >
                View My Appointments
            </a>


            <a
                href="doctors.html"
                class="another-btn"
            >
                Book Another Appointment
            </a>

        </div>

    `;

}


/*
    Format date
*/

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