const spaceBG = document.querySelector("#space-bg-container");
const spaceControl = document.querySelector("#animationControl");

if (storage.getItem("space")) {
  spaceBG.classList.add("pause");
  spaceControl.classList.replace("fa-pause", "fa-play");
  console.log("space is PAUSED");
}

spaceControl.addEventListener("click", function (e) {
  console.log("clicked");
  if (storage.getItem("space")) {
    console.log("space is PAUSED");
    spaceBG.classList.remove("pause");
    spaceControl.classList.replace("fa-play", "fa-pause");
    storage.removeItem("space");
  } else {
    console.log("space is UNPAUSED");
    spaceBG.classList.add("pause");
    spaceControl.classList.replace("fa-pause", "fa-play");
    storage.setItem("space", true);
  }
});
//   if (!storage.getItem("space")) {
//     spaceBG.classList.remove("pause");
//     spaceControl.classList.add("fa-pause");
//     spaceControl.classList.remove("fa-play");
//     storage.removeItem("space");
//   } else {
//     spaceBG.classList.add("pause");
//     spaceControl.classList.remove("fa-pause");
//     spaceControl.classList.add("fa-play");
//     storage.setItem("space", true);
//   }
// });
