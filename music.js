const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

if (music) {

    music.volume = 0.25;

    const enabled = localStorage.getItem("musicEnabled");
    const savedTime = localStorage.getItem("musicTime");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    if (enabled === "true") {

        music.play().catch(() => {
            console.log("Waiting for user interaction.");
        });

    }

    setInterval(() => {

        if (!music.paused) {
            localStorage.setItem("musicTime", music.currentTime);
        }

    }, 500);

}

if (toggle && music) {

    toggle.addEventListener("click", () => {

        if (music.paused) {

            music.play();
            localStorage.setItem("musicEnabled", "true");
            toggle.textContent = "♪";

        } else {

            music.pause();
            localStorage.setItem("musicEnabled", "false");
            toggle.textContent = "🔇";

        }

    });

}
