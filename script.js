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
    
    // Initialize music controls
    initMusicControls();
  });
  
  function initMusicControls() {
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = musicToggle.querySelector('.play-icon');
    const pauseIcon = musicToggle.querySelector('.pause-icon');
    
    // Load saved preferences
    const savedVolume = localStorage.getItem('musicVolume') || 50;
    const savedPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicTime') || 0);
    
    volumeSlider.value = savedVolume;
    audio.volume = savedVolume / 100;
    
    // Resume from saved time
    if (savedTime > 0) {
      audio.currentTime = savedTime;
    }
    
    if (savedPlaying) {
      audio.play().catch(() => {
        // Auto-play might be blocked by browser
        console.log('Auto-play blocked by browser');
      });
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
    }
    
    // Toggle play/pause
    musicToggle.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        localStorage.setItem('musicPlaying', 'true');
      } else {
        audio.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        localStorage.setItem('musicPlaying', 'false');
      }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = e.target.value / 100;
      localStorage.setItem('musicVolume', e.target.value);
    });
    
    // Save music time before page unload
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('musicTime', audio.currentTime);
    });
  }
  
