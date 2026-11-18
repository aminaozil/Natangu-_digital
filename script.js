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

// OUVERTURE DES IMAGES EN GRAND
const lightbox = document.getElementById("portfolioLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.querySelector(".lightbox-close");

document.querySelectorAll(".portfolio-zoom").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".portfolio-card");
    const image = card.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    closeLightbox.focus();
  });
});

function closePortfolioLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", closePortfolioLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closePortfolioLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closePortfolioLightbox();
  }
});
