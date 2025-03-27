// ---------- Typing Animation ----------
const roles = [
    "Software Developer",
    "UI/UX Designer",
    "Full Stack Engineer",
    "Star-gazer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  const typingElement = document.getElementById("typing");
  const cursor = document.querySelector(".cursor");
  let typingSpeed = 100;
  let pauseBetweenRoles = 1500;
  
  function type() {
    if (charIndex < roles[roleIndex].length) {
      typingElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, pauseBetweenRoles);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 60);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(type, 500);
  
    const butterfly = document.querySelector(".butterfly-cursor");
    const sparkleContainer = document.getElementById("sparkle-container");
  
    document.addEventListener("mousemove", (e) => {
      const offsetX = -30; // Adjust to center butterfly
      const offsetY = -30;
  
      const butterflyX = e.clientX + offsetX;
      const butterflyY = e.clientY + offsetY;
  
      // Move butterfly to cursor position
      butterfly.style.transform = `translate(${butterflyX}px, ${butterflyY}px)`;
  
      // Create sparkle at butterfly's center
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${butterflyX + 25}px`; // trail from near center of gif
      sparkle.style.top = `${butterflyY + 25}px`;
      sparkleContainer.appendChild(sparkle);
  
      setTimeout(() => sparkle.remove(), 500);
    });
  });
  