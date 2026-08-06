// ======================================
// HEALTHBRIDGE JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    

    // ==========================
    // APPOINTMENT FORM VALIDATION
    // ==========================

    const form = document.querySelector("form");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const department = document.getElementById("department").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            if(name === ""){
                alert("Please enter your full name.");
                return;
            }

            if(!/^[A-Za-z ]+$/.test(name)){
                alert("Name should contain only letters.");
                return;
            }

            if(!/^[0-9]{10}$/.test(phone)){
                alert("Phone number must contain exactly 10 digits.");
                return;
            }

            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                alert("Please enter a valid email.");
                return;
            }

            if(date === ""){
                alert("Please choose appointment date.");
                return;
            }

            if(time === ""){
                alert("Please choose appointment time.");
                return;
            }

            alert("✅ Appointment Booked Successfully!");

            form.reset();

        });
        // ==========================
// MOBILE MENU TOGGLE
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-toggle i");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

    }else{

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});
window.addEventListener("resize", () => {

    if(window.innerWidth > 768){

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});

    }


    // ==========================
    // ACTIVE NAVIGATION
    // ==========================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if(window.scrollY >= top &&
               window.scrollY < top + height){

                current = section.id;
            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });
        

    });


    // ==========================
    // STICKY HEADER EFFECT
    // ==========================

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            header.style.background="#ffffff";
            header.style.boxShadow="0 8px 25px rgba(0,0,0,.10)";

        }

        else{

            header.style.background="rgba(255,255,255,.75)";
            header.style.boxShadow="none";

        }

    });


    // ==========================
    // SCROLL REVEAL ANIMATION
    // ==========================

    const revealElements = document.querySelectorAll(
        ".about, .services, .doctors, #appointment, #testimonials, #contact"
    );

    function reveal(){

        const trigger = window.innerHeight - 100;

        revealElements.forEach(el=>{

            const top = el.getBoundingClientRect().top;

            if(top < trigger){

                el.style.opacity="1";
                el.style.transform="translateY(0)";

            }

        });

    }

    reveal();

    window.addEventListener("scroll",reveal);


    // ==========================
    // COUNTER ANIMATION
    // ==========================

    const counters=document.querySelectorAll(".stat h2");

    let counterStarted=false;

    function startCounter(){

        if(counterStarted) return;

        const hero=document.querySelector(".hero");

        const heroTop=hero.getBoundingClientRect().bottom;

        if(heroTop>0){

            counterStarted=true;

            counters.forEach(counter=>{

                const text=counter.innerText;

                let target=0;

                if(text.includes("20")) target=20;
                if(text.includes("15")) target=15;

                if(text==="24/7") return;

                let count=0;

                const interval=setInterval(()=>{

                    count++;

                    if(count>=target){

                        counter.innerText=text;

                        clearInterval(interval);

                    }

                    else{

                        if(text.includes("K"))
                            counter.innerText=count+"K+";
                        else
                            counter.innerText=count+"+";

                    }

                },70);

            });

        }

    }

    startCounter();

    window.addEventListener("scroll",startCounter);


    // ==========================
    // SCROLL TO TOP BUTTON
    // ==========================

    const topBtn=document.createElement("button");

    topBtn.innerHTML="↑";

    topBtn.id="topBtn";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style,{
        position:"fixed",
        right:"25px",
        bottom:"25px",
        width:"55px",
        height:"55px",
        borderRadius:"50%",
        border:"none",
        background:"#0F766E",
        color:"#fff",
        fontSize:"22px",
        cursor:"pointer",
        display:"none",
        boxShadow:"0 10px 25px rgba(0,0,0,.2)",
        zIndex:"999"
    });

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            topBtn.style.display="block";

        }

        else{

            topBtn.style.display="none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });


    // ==========================
    // CURRENT YEAR IN FOOTER
    // ==========================

    const footer=document.querySelector("footer p");

    if(footer){

        footer.innerHTML=`&copy; ${new Date().getFullYear()} HealthBridge Medical Center. All Rights Reserved.`;

    }

});
