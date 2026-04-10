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
