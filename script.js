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


// CARROUSEL DES RÉALISATIONS

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

if (
  lightbox &&
  lightboxImage &&
  lightboxTitle &&
  lightboxDescription &&
  imageCounter &&
  closeLightbox &&
  prevImage &&
  nextImage
) {

  // OUVRIR UN PROJET
  document.querySelectorAll(".portfolio-zoom").forEach(button => {

    button.addEventListener("click", () => {

      const card = button.closest(".portfolio-card");
      if (!card) return;

      const mainImage = card.querySelector("img");
      if (!mainImage) return;

      try {
        currentImages = card.dataset.images
          ? JSON.parse(card.dataset.images)
          : [mainImage.getAttribute("src")];
      } catch (error) {
        console.error("Erreur dans data-images :", error);
        currentImages = [mainImage.getAttribute("src")];
      }

      if (!Array.isArray(currentImages) || currentImages.length === 0) {
        currentImages = [mainImage.getAttribute("src")];
      }

      currentIndex = 0;

      lightboxTitle.textContent =
        card.dataset.title || card.querySelector("h3")?.textContent || "";

      lightboxDescription.textContent =
        card.dataset.description || card.querySelector("p")?.textContent || "";

      displayImage();

      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";

      closeLightbox.focus();
    });

  });


  // AFFICHER LA PHOTO
  function displayImage() {

    lightboxImage.src = currentImages[currentIndex];
    lightboxImage.alt = lightboxTitle.textContent;

    imageCounter.textContent =
      `Photo ${currentIndex + 1} / ${currentImages.length}`;

    prevImage.style.visibility =
      currentImages.length > 1 ? "visible" : "hidden";

    nextImage.style.visibility =
      currentImages.length > 1 ? "visible" : "hidden";
  }


  // PHOTO SUIVANTE
  nextImage.addEventListener("click", () => {

    if (currentImages.length <= 1) return;

    currentIndex = (currentIndex + 1) % currentImages.length;
    displayImage();

  });


  // PHOTO PRÉCÉDENTE
  prevImage.addEventListener("click", () => {

    if (currentImages.length <= 1) return;

    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;

    displayImage();

  });


  // FERMER LA FENÊTRE
  function closePortfolioLightbox() {

    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightboxImage.src = "";

  }

  closeLightbox.addEventListener("click", closePortfolioLightbox);


  // FERMER EN CLIQUANT À L'EXTÉRIEUR
  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closePortfolioLightbox();
    }

  });


  // NAVIGATION AU CLAVIER
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

} else {
  console.error("Certains éléments HTML de la fenêtre des réalisations sont manquants.");
}
