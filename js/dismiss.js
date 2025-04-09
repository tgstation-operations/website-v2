const dismissBtns = document.querySelectorAll(".dismiss");
const storage = window.localStorage;
dismissBtns.forEach(function (d) {
  d.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    parent.classList.add("hidden");
    storage.setItem(parent.getAttribute("id"), "hidden");
  });
});

for (let [key, value] of Object.entries(storage)) {
  if (document.getElementById(key)) {
    document.getElementById(key).classList.add(value);
  }
}

const clearSettings = document.querySelector(".clearSettings");
clearSettings.addEventListener("click", function (e) {
  e.preventDefault();
  for (let [key, value] of Object.entries(storage)) {
    if (document.getElementById(key)) {
      document.getElementById(key).classList.remove(value);
    }
  }
  if (storage.getItem("space")) {
    document.getElementById("space-bg-container").classList.remove("pause");
    document
      .getElementById("animationControl")
      .classList.replace("fa-play", "fa-pause");
  }
  storage.clear();
});
