async function loadNotes(password) {
  const res = await fetch(`https://bigboi454-github-io-ecld-duo7uy5u5-bigboi454s-projects.vercel.app/api/notes?pw=${encodeURIComponent(password)}`);
  const data = await res.json();

  if (data.error) {
    alert("Wrong password");
    return null;
  }

  return data.notes;
}

(async () => {
  const userInput = prompt("Enter password to access the Advert Calendar:");
  const notes = await loadNotes(userInput);

  if (!notes) {
    window.location.href = "index.html";
    return;
  }

  // attach notes to your doors
  document.querySelectorAll(".door").forEach(door => {
    door.addEventListener("click", () => {
      door.classList.toggle("open");
      const day = parseInt(door.dataset.day);
      const noteBox = document.getElementById("note-" + day);
      noteBox.textContent = notes[day - 1] || "Missing Note";
    });
  });
})();
