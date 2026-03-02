function addTouchEvent(element, callback) {
  element.addEventListener("click", callback);
  element.addEventListener("touchstart", function(e) {
    e.preventDefault();
    callback();
  });
}
const home = document.getElementById("home");
const player = document.getElementById("player");
const audio = document.getElementById("audio");
const visual = document.getElementById("visual");
const replay = document.getElementById("replay");

let currentSound = "";
let currentColor = "";
let currentSymbol = "";
let isPlaying = false;

document.querySelectorAll(".btn").forEach(btn => {
 addTouchEvent(btn, () => {
  playSound(btn);
});
    if (isPlaying) return;

    currentSound = btn.getAttribute("data-sound");
    currentColor = btn.getAttribute("data-color");
    currentSymbol = btn.innerHTML; // conserve l’image pour visual

    launchSound();
  });
});

function launchSound() {
  isPlaying = true;

  visual.innerHTML = currentSymbol; // affiche l’image
  player.style.backgroundColor = currentColor;

  home.classList.add("hidden");
  player.classList.remove("hidden");

  audio.pause();
  audio.currentTime = 0;
  audio.src = currentSound;
  audio.load();

  audio.play().catch(err => console.log(err));
}

audio.addEventListener("ended", () => {
  isPlaying = false;

  setTimeout(() => {
    player.classList.add("hidden");
    home.classList.remove("hidden");
  }, 2000);
});

replay.addEventListener("pointerdown", () => {
  if (!currentSound) return;

  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(err => console.log(err));

  isPlaying = true;
});

const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("pointerdown", () => {
  audio.pause();           // stoppe le son en cours
  audio.currentTime = 0;   // remet à zéro
  player.classList.add("hidden");
  home.classList.remove("hidden");
  isPlaying = false;       // autorise la prochaine lecture
});
