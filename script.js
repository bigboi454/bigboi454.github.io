const targetDate = Date.UTC(2025, 12, 27, 0, 0, 0);
const startDate  = Date.UTC(2025, 11, 1, 0, 0, 0);

const progressPath = document.getElementById("progress");
const plane = document.getElementById("plane");

const totalDuration = targetDate - startDate;
const arcLength = 283;

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "<h2>You're in Manchester! 🎉</h2>";
    plane.setAttribute("href", "https://upload.wikimedia.org/wikipedia/commons/2/2f/Emoji_u1f389.svg");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

  const progressRatio = Math.min(1, (totalDuration - distance) / totalDuration);
  const dashOffset = arcLength * (1 - progressRatio);
  progressPath.style.strokeDashoffset = dashOffset;

  const angle = Math.PI * progressRatio;
  const radius = 90;
  const x = 10 + radius + radius * Math.cos(Math.PI - angle);
  const y = 100 - radius * Math.sin(Math.PI - angle);
  plane.setAttribute("x", x - 10);
  plane.setAttribute("y", y - 10);
}

setInterval(updateCountdown, 1000);
updateCountdown();
