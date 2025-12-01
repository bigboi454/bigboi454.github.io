const password = "monkey";

if (sessionStorage.getItem("advert_access") !== "true") {
  const userInput = prompt("Enter password to access the Advert Calendar:");
  if (userInput === password) {
    sessionStorage.setItem("advert_access", "true");
  } else {
    alert("Incorrect password.");
    window.location.href = "index.html";
  }
}

let notes = [];

fetch("notes/notes.txt")
  .then(res => res.text())
  .then(text => {
    text = text.trim();
    text = text.replace(/^\{|\}$/g, "");
    notes = text.split(/","/).map(s => s.replace(/"/g, "").trim());
  });

document.querySelectorAll(".door").forEach(door => {
  door.addEventListener("click", () => {
    door.classList.toggle("open");
    const day = parseInt(door.dataset.day);
    const noteBox = document.getElementById("note-" + day);
    const content = notes[day - 1] || "Missing Note";
    noteBox.textContent = content;
  });
});
