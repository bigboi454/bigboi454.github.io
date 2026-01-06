const targetDate = Date.UTC(2025, 0, 16, 0, 0, 0);
const startDate  = Date.UTC(2025, 0, 6, 0, 0, 0);

const progressPath = document.getElementById("progress");
const plane = document.getElementById("plane");

const totalDuration = targetDate - startDate;
const arcLength = 283;

let finished = false;

function confettiBurst() {
  for (let i = 0; i < 30; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    c.style.left = "50%";
    c.style.top = "50%";
    document.body.appendChild(c);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;

    c.animate(
      [
        { transform: "translate(-50%, -50%)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
          opacity: 0
        }
      ],
      { duration: 1200, easing: "ease-out" }
    );

    setTimeout(() => c.remove(), 1200);
  }
}

function triggerEnding() {
  if (finished) return;
  finished = true;

  document.querySelector(".countdown").innerHTML = "<h2>No new time yet</h2>";

  plane.setAttribute(
    "href",
    "https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg"
  );

  plane.classList.add("ending-heart");

  const heartSize = 18;

  plane.setAttribute("x", 100 - heartSize / 2);
  plane.setAttribute("y", 10 - heartSize / 2);


  progressPath.style.stroke = "#ff4d6d";

  const timer = document.querySelector(".timer");
  if (timer) timer.style.opacity = "0.25";

}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance < 0) {
    triggerEnding();
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
