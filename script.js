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
const homeBtn = document.getElementById("home-btn");

let currentSound = "";
let currentColor = "";
let currentSymbol = "";
let isPlaying = false;

// -------- BOUTONS SONS --------
document.querySelectorAll(".btn").forEach(btn => {
  addTouchEvent(btn, () => {

    if (isPlaying) return;

    currentSound = btn.getAttribute("data-sound");
    currentColor = btn.getAttribute("data-color");
    currentSymbol = btn.innerHTML;

    launchSound();
  });
});

// -------- LANCEMENT SON --------
function launchSound() {
  isPlaying = true;

  visual.innerHTML = currentSymbol;
  player.style.backgroundColor = currentColor;

  home.classList.add("hidden");
  player.classList.remove("hidden");

  audio.pause();
  audio.currentTime = 0;
  audio.src = currentSound;
  audio.load();

  audio.play().catch(err => console.log(err));
}

// -------- FIN DU SON --------
audio.addEventListener("ended", () => {
  isPlaying = false;

  setTimeout(() => {
    player.classList.add("hidden");
    home.classList.remove("hidden");
  }, 2000);
});

// -------- REECOUTER --------
addTouchEvent(replay, () => {
  if (!currentSound) return;

  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(err => console.log(err));

  isPlaying = true;
});

// -------- RETOUR ACCUEIL --------
addTouchEvent(homeBtn, () => {
  audio.pause();
  audio.currentTime = 0;
  player.classList.add("hidden");
  home.classList.remove("hidden");
  isPlaying = false;
});
