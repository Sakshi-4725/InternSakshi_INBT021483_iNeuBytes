const doctorGrid = document.getElementById("doctorGrid");

const doctorSearch = document.getElementById("doctorSearch");

const departmentFilter =
    document.getElementById("departmentFilter");

const resetFilters =
    document.getElementById("resetFilters");

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");


function displayDoctors(list) {

    doctorGrid.innerHTML = "";

    resultCount.textContent =
        `Showing ${list.length} doctor${list.length !== 1 ? "s" : ""}`;


    if (list.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    list.forEach(doctor => {

        const card =
            document.createElement("div");

        card.className = "doctor-card";


        card.innerHTML = `

            <div class="doctor-image">

               <img src="${doctor.image}" alt="${doctor.name}">

                <div class="rating">
                    ⭐ ${doctor.rating}
                </div>

            </div>


            <div class="doctor-card-content">

                <p class="doctor-department">
                    ${doctor.department}
                </p>


                <h3>
                    ${doctor.name}
                </h3>


                <p class="qualification">
                    ${doctor.qualification}
                </p>


                <div class="doctor-info">

                    <span>
                        💼 ${doctor.experience} years
                    </span>

                    <span>
                        💰 ₹${doctor.fee}
                    </span>

                </div>


                <div class="available-slots">

                    <strong>
                        Available:
                    </strong>

                    <div class="slots">

                        ${doctor.slots.map(slot => `
                            <span>${slot}</span>
                        `).join("")}

                    </div>

                </div>


                <div class="doctor-actions">

                    <button
                        class="profile-btn"
                        onclick="viewDoctor(${doctor.id})"
                    >
                        View Profile
                    </button>


                    <button
                        class="book-btn"
                        onclick="bookDoctor(${doctor.id})"
                    >
                        Book Now
                    </button>

                </div>

            </div>

        `;


        doctorGrid.appendChild(card);

    });

}


function filterDoctors() {

    const searchValue =
        doctorSearch.value
            .toLowerCase()
            .trim();


    const departmentValue =
        departmentFilter.value;


    const filteredDoctors =
        doctors.filter(doctor => {

            const matchesName =
                doctor.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesDepartment =
                departmentValue === "All" ||
                doctor.department === departmentValue;


            return matchesName &&
                   matchesDepartment;

        });


    displayDoctors(filteredDoctors);

}


function viewDoctor(id) {

    window.location.href =
        `doctor-details.html?id=${id}`;

}


function bookDoctor(id) {

    window.location.href =
        `booking.html?doctor=${id}`;

}


doctorSearch.addEventListener(
    "input",
    filterDoctors
);


departmentFilter.addEventListener(
    "change",
    filterDoctors
);


resetFilters.addEventListener(
    "click",
    () => {

        doctorSearch.value = "";

        departmentFilter.value = "All";

        displayDoctors(doctors);

    }
);


displayDoctors(doctors);