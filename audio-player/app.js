const audio = document.querySelector(".audio");
const totalProgressBar = document.querySelector(".progress-bar");
const pause = document.querySelector(".pause");
const progress = document.querySelector(".total-progress");
const player = document.querySelector(".btn-play");

let currentProgress = 0;

let duration = 0;
let howManyPixelsPerSecond = 0;

audio.addEventListener("loadedmetadata", () => {
  duration = audio.duration;
  howManyPixelsPerSecond = 240 / duration;
});

audio.addEventListener("timeupdate", () => {
  progress.style.width = `${howManyPixelsPerSecond * audio.currentTime}px`;
  currentProgress = audio.currentTime;
});

player.addEventListener("click", () => {
  audio.load();
  audio.play();

  audio.currentTime = currentProgress;

  player.style.display = "none";
  pause.style.display = "inline";
});

pause.addEventListener("click", () => {
  audio.pause();
  pause.style.display = "none";
  player.style.display = "inline";
});

totalProgressBar.addEventListener("click", (event) => {
  const test = totalProgressBar.getBoundingClientRect();
  const xLocation = event.clientX - test.left;
  const percentage = xLocation / 240;
  const newCurrentTime = duration * percentage;
  audio.currentTime = newCurrentTime;
});
