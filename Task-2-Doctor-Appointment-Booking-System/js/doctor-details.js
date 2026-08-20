const profileContainer =
    document.getElementById("doctorProfile");


/*
    Get doctor ID from URL

    Example:
    doctor-details.html?id=1
*/

const urlParams =
    new URLSearchParams(window.location.search);

const doctorId =
    Number(urlParams.get("id"));


/*
    Find doctor from doctors array
*/

const doctor =
    doctors.find(
        doctor => doctor.id === doctorId
    );


/*
    If doctor doesn't exist
*/

if (!doctor) {

    profileContainer.innerHTML = `

        <div class="profile-not-found">

            <div>🔍</div>

            <h2>Doctor Not Found</h2>

            <p>
                We couldn't find the doctor you're looking for.
            </p>

            <a
                href="doctors.html"
                class="book-btn profile-back-btn"
            >
                Back to Doctors
            </a>

        </div>

    `;

}


/*
    Display doctor profile
*/

else {

    profileContainer.innerHTML = `

        <div class="profile-card">


            <!-- Profile Header -->

            <div class="profile-header">


                <div class="profile-photo">

                    <img src="${doctor.image}" alt="${doctor.name}">

                </div>


                <div class="profile-main-info">

                    <p class="doctor-department">
                        ${doctor.department}
                    </p>


                    <h1>
                        ${doctor.name}
                    </h1>


                    <p class="qualification">
                        ${doctor.qualification}
                    </p>


                    <div class="profile-rating">

                        ⭐ ${doctor.rating}

                        <span>
                            Highly Rated
                        </span>

                    </div>

                </div>

            </div>


            <!-- Basic Information -->

            <div class="profile-stats">


                <div class="profile-stat">

                    <strong>
                        ${doctor.experience}
                    </strong>

                    <span>
                        Years Experience
                    </span>

                </div>


                <div class="profile-stat">

                    <strong>
                        ₹${doctor.fee}
                    </strong>

                    <span>
                        Consultation Fee
                    </span>

                </div>


                <div class="profile-stat">

                    <strong>
                        ${doctor.slots.length}
                    </strong>

                    <span>
                        Available Slots
                    </span>

                </div>

            </div>


            <!-- About -->

            <div class="profile-content">


                <div class="about-doctor">

                    <h2>
                        About Doctor
                    </h2>

                    <p>
                        ${doctor.about}
                    </p>


                    <h2>
                        Available Time Slots
                    </h2>


                    <div class="profile-slots">

                        ${doctor.slots.map(slot => `

                            <span>
                                🕐 ${slot}
                            </span>

                        `).join("")}

                    </div>

                </div>


                <!-- Booking Card -->

                <div class="profile-booking">

                    <div class="booking-icon">
                        📅
                    </div>


                    <h2>
                        Book an Appointment
                    </h2>


                    <p>
                        Choose a convenient date and
                        time for your consultation.
                    </p>


                    <div class="fee-display">

                        <span>
                            Consultation Fee
                        </span>

                        <strong>
                            ₹${doctor.fee}
                        </strong>

                    </div>


                    <button
                        class="full-book-btn"
                        onclick="bookAppointment(${doctor.id})"
                    >
                        Book Appointment
                    </button>

                </div>


            </div>

        </div>

    `;

}


/*
    Book Appointment
*/

function bookAppointment(id) {

    window.location.href =
        `booking.html?doctor=${id}`;

}