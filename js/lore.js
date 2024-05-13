let loreData;

function init() {
  fetch("/json/txt.json")
    .then((response) => response.json())
    .then((jsonData) => {
      loreData = jsonData;
      displayContent();
    });
}
document.addEventListener("DOMContentLoaded", init);

function displayContent() {
  let currentLoreIndex =
    parseInt(localStorage.getItem("currentLoreIndex")) || 0;

  if (loreData && loreData.length > 0) {
    const middleTxt = document.querySelector("#middle__txt");
    const loreContent =
      loreData[currentLoreIndex].text || loreData[currentLoreIndex].lore;
    middleTxt.innerText = loreContent;

    currentLoreIndex++;
    if (currentLoreIndex >= loreData.length) {
      currentLoreIndex = 0;
    }

    localStorage.setItem("currentLoreIndex", currentLoreIndex.toString());
  }
}

window.onload = function () {
  displayContent();
};
