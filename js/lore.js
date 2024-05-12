let loreData;

function init() {
  fetch("/json/txt.json")
    .then((response) => response.json())
    .then((jsonData) => {
      loreData = jsonData;
      displayContent();
    });
}

function displayContent() {
  let currentLoreIndex = parseInt(localStorage.getItem("currentLoreIndex")) || 0;
  
  if (loreData && loreData.length > 0) {
    const middleTxt = document.querySelector("#middle__txt");
    const loreContent = loreData[currentLoreIndex].text || loreData[currentLoreIndex].lore;
    middleTxt.innerText = loreContent;

    // Increment the index for the next lore text
    currentLoreIndex++;
    if (currentLoreIndex >= loreData.length) {
      currentLoreIndex = 0; // Reset to 0 when reaching the end of the lore data
    }

    // Store the current index in local storage
    localStorage.setItem("currentLoreIndex", currentLoreIndex.toString());
  }
}

document.addEventListener("DOMContentLoaded", init);

window.onload = function () {
  displayContent();
};