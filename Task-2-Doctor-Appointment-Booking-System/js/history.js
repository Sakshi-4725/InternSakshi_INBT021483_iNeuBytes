/*
    Get appointments from localStorage
*/

let appointments =
    JSON.parse(
        localStorage.getItem(
            "appointments"
        )
    ) || [];


const appointmentList =
    document.getElementById(
        "appointmentList"
    );

const emptyHistory =
    document.getElementById(
        "emptyHistory"
    );

const totalAppointments =
    document.getElementById(
        "totalAppointments"
    );

const confirmedAppointments =
    document.getElementById(
        "confirmedAppointments"
    );

const totalFees =
    document.getElementById(
        "totalFees"
    );

const historyMessage =
    document.getElementById(
        "historyMessage"
    );


/*
    Display appointments
*/

function displayAppointments() {

    appointmentList.innerHTML = "";


    /*
        Empty state
    */

    if (appointments.length === 0) {

        emptyHistory.style.display =
            "block";

        appointmentList.style.display =
            "none";

        historyMessage.textContent =
            "You have no appointments yet.";

        updateStats();

        return;

    }


    emptyHistory.style.display =
        "none";

    appointmentList.style.display =
        "flex";

    historyMessage.textContent =
        `You have ${appointments.length} appointment${
            appointments.length !== 1
                ? "s"
                : ""
        }.`;


    /*
        Show newest appointment first
    */

    const sortedAppointments =
        [...appointments].reverse();


    sortedAppointments.forEach(
        appointment => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "appointment-card";


            card.innerHTML = `

                <div class="appointment-card-top">


                    <div class="appointment-doctor">

                        <div class="history-doctor-icon">
                            👨‍⚕️
                        </div>


                        <div>

                            <p>
                                ${appointment.department}
                            </p>

                            <h3>
                                ${appointment.doctorName}
                            </h3>

                        </div>

                    </div>


                    <span class="appointment-status-badge">

                        ${appointment.status}

                    </span>


                </div>


                <div class="appointment-card-details">


                    <div>

                        <span>
                            👤 Patient
                        </span>

                        <strong>
                            ${appointment.patientName}
                        </strong>

                    </div>


                    <div>

                        <span>
                            📅 Date
                        </span>

                        <strong>
                            ${formatDate(
                                appointment.date
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            🕐 Time
                        </span>

                        <strong>
                            ${appointment.time}
                        </strong>

                    </div>


                    <div>

                        <span>
                            💰 Fee
                        </span>

                        <strong>
                            ₹${appointment.fee}
                        </strong>

                    </div>

                </div>


                <div class="appointment-card-bottom">


                    <span>
                        Booking ID:
                        MB-${appointment.id}
                    </span>


                    <button
                        class="cancel-btn"
                        onclick="cancelAppointment(${appointment.id})"
                    >
                        Cancel Appointment
                    </button>

                </div>

            `;


            appointmentList.appendChild(
                card
            );

        }
    );


    updateStats();

}


/*
    Update statistics
*/

function updateStats() {

    totalAppointments.textContent =
        appointments.length;


    const confirmed =
        appointments.filter(
            appointment =>
                appointment.status ===
                "Confirmed"
        ).length;


    confirmedAppointments.textContent =
        confirmed;


    const fees =
        appointments.reduce(
            (total, appointment) =>
                total +
                Number(appointment.fee),
            0
        );


    totalFees.textContent =
        `₹${fees}`;

}


/*
    Cancel appointment
*/

function cancelAppointment(id) {

    const appointment =
        appointments.find(
            appointment =>
                appointment.id === id
        );


    if (!appointment) {
        return;
    }


    const confirmCancel =
        confirm(
            `Are you sure you want to cancel the appointment with ${appointment.doctorName}?`
        );


    if (!confirmCancel) {
        return;
    }


    /*
        Remove appointment
    */

    appointments =
        appointments.filter(
            appointment =>
                appointment.id !== id
        );


    /*
        Update localStorage
    */

    localStorage.setItem(
        "appointments",
        JSON.stringify(
            appointments
        )
    );


    /*
        Update latest appointment
        if necessary
    */

    const latest =
        JSON.parse(
            localStorage.getItem(
                "latestAppointment"
            )
        );


    if (
        latest &&
        latest.id === id
    ) {

        if (appointments.length > 0) {

            localStorage.setItem(
                "latestAppointment",
                JSON.stringify(
                    appointments[
                        appointments.length - 1
                    ]
                )
            );

        } else {

            localStorage.removeItem(
                "latestAppointment"
            );

        }

    }


    displayAppointments();

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


/*
    Initial display
*/

displayAppointments();