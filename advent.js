if (typeof process !== "undefined") {
  require('dotenv').config();
}

const password = process.env.PASSWORD;
const notes = JSON.parse(process.env.NOTES);

if (sessionStorage.getItem("advert_access") !== "true") {
  const userInput = prompt("Enter password to access the Advert Calendar:");
  if (userInput === password) {
    sessionStorage.setItem("advert_access", "true");
  } else {
    alert("Incorrect password.");
    window.location.href = "index.html";
  }
}

document.querySelectorAll(".door").forEach(door => {
  door.addEventListener("click", () => {
    door.classList.toggle("open");
    const day = parseInt(door.dataset.day);
    const noteBox = document.getElementById("note-" + day);
    const content = notes[day - 1] || "Missing Note";
    noteBox.textContent = content;
  });
});
