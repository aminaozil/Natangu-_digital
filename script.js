// Reveal animation
const reveals=document.querySelectorAll('.reveal');
window.addEventListener('scroll',()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-50){
      el.classList.add('active');
    }
  });
});

// Carousel
let index=0;
function moveSlide(dir){
  const track=document.getElementById('carouselTrack');
  const cards=document.querySelectorAll('.card');
  const width=cards[0].offsetWidth+20;
  index+=dir;
  if(index<0) index=0;
  if(index>cards.length-3) index=cards.length-3;
  track.style.transform=`translateX(-${index*width}px)`;
}

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

const cards = document.querySelectorAll(".team-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// FILTRAGE DES RÉALISATIONS
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    portfolioCards.forEach(card => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

/// CARROUSEL DES REALISATIONS

const lightbox = document.getElementById("portfolioLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const imageCounter = document.getElementById("imageCounter");

const closeLightbox = document.querySelector(".lightbox-close");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImages = [];
let currentIndex = 0;

// OUVRIR UN PROJET
document.querySelectorAll(".portfolio-zoom").forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".portfolio-card");
    const mainImage = card.querySelector("img");

    currentImages = card.dataset.images
      ? JSON.parse(card.dataset.images)
      : [mainImage.getAttribute("src")];

    currentIndex = 0;

    lightboxTitle.textContent =
      card.dataset.title || card.querySelector("h3").textContent;

    lightboxDescription.textContent =
      card.dataset.description || card.querySelector("p").textContent;

    displayImage();

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";

    closeLightbox.focus();

  });

});

// AFFICHER LA PHOTO
function displayImage() {

  lightboxImage.src = currentImages[currentIndex];

  imageCounter.textContent =
    `Photo ${currentIndex + 1} / ${currentImages.length}`;

  // Masquer les flèches s'il n'y a qu'une photo
  prevImage.style.visibility =
    currentImages.length > 1 ? "visible" : "hidden";

  nextImage.style.visibility =
    currentImages.length > 1 ? "visible" : "hidden";
}

// PHOTO SUIVANTE
nextImage.addEventListener("click", () => {

  currentIndex = (currentIndex + 1) % currentImages.length;

  displayImage();

});

// PHOTO PRECEDENTE
prevImage.addEventListener("click", () => {

  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;

  displayImage();

});

// FERMER LA FENETRE
function closePortfolioLightbox() {

  lightbox.classList.remove("open");

  document.body.style.overflow = "";

  lightboxImage.src = "";

}

closeLightbox.addEventListener("click", closePortfolioLightbox);

// FERMER EN CLIQUANT A L'EXTERIEUR
lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {
    closePortfolioLightbox();
  }

});

// FERMER AVEC ECHAP ET NAVIGUER AU CLAVIER
document.addEventListener("keydown", event => {

  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closePortfolioLightbox();
  }

  if (event.key === "ArrowRight") {
    nextImage.click();
  }

  if (event.key === "ArrowLeft") {
    prevImage.click();
  }

});