const hamburgerIcon = document.getElementById("hamburger-icon");
const navElements = document.querySelector(".elements");

hamburgerIcon.addEventListener("click", () => navElements.classList.toggle("show"));



function showSlide(slideIndex, carouselId) {
    const carousel = document.querySelector(`#${carouselId} .carousel`);
    const slides = carousel.querySelectorAll('img');
    const totalSlides = slides.length;

    slideIndex = (slideIndex + totalSlides) % totalSlides;

    const offset = -slideIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    return slideIndex;
}

// Función para mover el slide
function moveSlide(step, carouselId) {
    const currentSlideKey = `currentSlide_${carouselId}`;
    window[currentSlideKey] = showSlide((window[currentSlideKey] || 0) + step, carouselId);
}

// Inicializar los sliders
window.currentSlide_carousel1 = 0;
window.currentSlide_carousel2 = 0;

showSlide(window.currentSlide_carousel1, 'carousel1');
showSlide(window.currentSlide_carousel2, 'carousel2');




document.addEventListener('DOMContentLoaded', () => {
   
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImg");
    const imageTitle = document.getElementById("imageTitle");
    const imageAuthor = document.getElementById("imageAuthor");
    const overlay = document.getElementById("overlay");

    function togglePopup(display, img = null) {
        popup.style.display = overlay.style.display = display;
        if (img && display === "block") {
            popupImg.src = img.src;
            popupImg.alt = img.alt;
            imageTitle.textContent = img.getAttribute("data-title");
            imageAuthor.textContent = "Por: " + img.getAttribute("data-author");
        }
    }

    window.openPopup = img => togglePopup("block", img);
    window.closePopup = () => togglePopup("none");

});


