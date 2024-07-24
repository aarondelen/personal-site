/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav_link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
// const contactForm = document.getElementById('contact-form'),
//     contactMessage = document.getElementById('contact-message')

// const sendEmail = (e) => {
//     e.preventDefault()

//     // serviceID - templateID - #form - publicKey
//     emailjs.sendForm('service_4axwtje','template_5e540l6','#contact-form','pvpPvFCw98Ec4GN3t')
//     .then(() => {
//         // Show sent message
//         contactMessage.textContent = 'Message sent successfully ✅'

//         // Remove message after five seconds
//         setTimeout(() => {
//             contactMessage.textContent = ''
//         }, 5000)

//         // Clear input fields
//         contactForm.reset()
//     }, () => {
//         // Show error message
//         contactMessage.textContent = 'Message not sent (service error) ❌'
//     })
// }

// contactForm.addEventListener('submit', sendEmail)


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 450,
    // reset: true // Animations repeat
})

sr.reveal('.hero_perfil, .about_image, .contact_mail', {origin: 'right'})
sr.reveal('.hero_name, .hero_info, .about_container .section_title-1, .about_info, .contact_social, .contact_data', {origin: 'left'})
sr.reveal('.services_card, .projects_card', {origin: 'bottom'})
sr.reveal('.section_title-2, .section_title-1', {origin: 'top'})
// sr.reveal('.services_card, .projects_card', {interval: 100})

// Add an event listener to detect when the page is refreshed
window.onload = function() {
    window.location.href = "#hero";
};

// SWEET ALERT 2 //

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Check if any of the fields are empty
    if (name === "" || email === "" || subject === "" || message === "") {
        // Show the SweetAlert2 modal for empty fields
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all required fields!",
        });
    } else {
        // Show a confirmation SweetAlert2 modal
        Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: "You are about to send the message.",
            showCancelButton: true,
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "No, cancel.",
        }).then((result) => {
            // If the user confirms, submit the form
            if (result.isConfirmed) {
                // Send the email using Email.js
                emailjs.sendForm('service_4axwtje','template_5e540l6','#contact-form','pvpPvFCw98Ec4GN3t')
                .then(() => {
                    // Show success message
                    document.getElementById("contact-message").textContent = 'Message sent successfully ✅';
                    
                    // Show success SweetAlert2 prompt
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                    });

                    // Clear input fields after 5 seconds
                    setTimeout(() => {
                        document.getElementById("contact-message").textContent = '';
                        document.getElementById("contact-form").reset();
                    }, 3000);
                }, () => {
                    // Show error message
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Message not sent (service error) ❌",
                    });
                });
            }
        });
    }
});

    // TYPED JS

    const typed = new Typed('.multiple-text', {
        strings: ['Computer Engineer', 'Frontend Developer', 'Copywriter'],
        typeSpeed: 125,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    })

    // MUSIC BUTTON FUNC 

    document.addEventListener("DOMContentLoaded", function() {
        // Function to play or pause the background music
        function toggleBackgroundMusic() {
            var audio = document.getElementById("bg-music");
            audio.volume = 0.25;
            var audioButton = document.getElementById("audio-button");
    
            // Toggle between play and pause
            if (audio.paused) {
                audio.muted = false;
                audio.play();
                audioButton.style.color = "var(--first-color)"; // Change icon color
            } else {
                audio.pause();
                audioButton.style.color = "var(--title-color)"; // Change icon color
            }
        }
    
        // Event listener for the music button
        var audioButton = document.getElementById("audio-button");
        audioButton.addEventListener("click", toggleBackgroundMusic);
    
        // Check if the user has interacted with the page before
        var interacted = localStorage.getItem("interacted");
        if (!interacted) {
            // If not, play the background music automatically
            toggleBackgroundMusic();
    
            // Set a flag in local storage to indicate interaction
            localStorage.setItem("interacted", "true");
        }
    });

