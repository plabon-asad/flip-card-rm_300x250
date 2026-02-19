const ad = document.getElementById("ad");
const video = document.getElementById("adVideo");
let isFlipped = false;

window.addEventListener('DOMContentLoaded', () => {
    gsap.to("#tagline", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
    });
});

function flipToBack() {
  if (isFlipped) return;

  gsap.timeline()
      .to(ad, {
        rotateX: 180,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "center center"
      })
      .add(() => {
        video.currentTime = 0;
        video.play();
        video.style.opacity = 1; // fade-in video
      }, "-=0.3");

  isFlipped = true;
}

function flipToFront() {
  if (!isFlipped) return;

  gsap.timeline()
      .add(() => {
        video.pause();
        video.style.opacity = 0; // fade-out video
      })
      .to(ad, {
        rotateX: 0,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "center center"
      });

  isFlipped = false;
}

// Desktop hover
ad.addEventListener("mouseenter", flipToBack);
ad.addEventListener("mouseleave", flipToFront);

// Mobile tap
ad.addEventListener("click", () => {
  isFlipped ? flipToFront() : flipToBack();
});
