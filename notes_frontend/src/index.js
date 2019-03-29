const startDiv = document.getElementById("start-div");
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  startDiv.remove();
  startGame();
});
let currentLevel = 0;

function startGame() {
  //Show resources nav bar with pre-set values
  const resourcesBar = document.getElementById("resources-bar");
  resourcesBar.style.visibility = "visible";

  //set values
  const health = (document.getElementById(
    "resource-health-value"
  ).textContent = 10);
  const food = (document.getElementById("resource-food-value").textContent = 3);
  const currency = (document.getElementById(
    "resource-currency-value"
  ).textContent = 10);

  //set current level
  currentLevel = 0;

  //Create Rows
  createRows();

  //Show level with cards face-down
  level.style.visibility = "visible";
  renderCards(currentLevel);
}

function lose() {
  const level = document.getElementById("level");
  level.classList.add("fadeOut");
  let title = "You Lose";
  let message = "How Unfortunate. Would you like to play again?";
  setTimeout(() => {
    createHeroDiv("lose", title, message);
  }, 3000);
}

function win() {
  let title = "You Win";
  let message = "Congratulations. Would you like to play again?";
  createHeroDiv("win", title, message);
}

function createHeroDiv(str, title, message) {
  destroyRows();
  const body = document.body;
  const heroDiv = document.createElement("div");
  heroDiv.classList.add(
    "hero-unit",
    "shadow",
    "fixed-top",
    "gradient",
    "fadeIn"
  );
  heroDiv.id = `${str}-hero-div`;
  const h2 = document.createElement("h2");
  h2.id = `${str}-hero-title`;
  h2.textContent = title;
  const p = document.createElement("p");
  p.id = `${str}-hero-content`;
  p.textContent = message;
  const button = document.createElement("button");
  button.id = "start-button";
  button.textContent = "Continue";
  button.classList.add("btn", "btn-secondary", "btn-large");

  button.addEventListener("click", () => {
    const levelTitle = document.getElementById("level-title").textContent;

    if (str === "win" || str === "lose") {
      document.getElementById(`${str}-hero-div`).remove();
      const levelDiv = document.getElementById("level");
      levelDiv.classList.remove("fadeOut");
      startGame();
    } else {
      renderNewLevel(`${str}-hero-div`);
    }
  });

  body.appendChild(heroDiv);
  heroDiv.appendChild(h2);
  heroDiv.appendChild(p);
  heroDiv.appendChild(button);
}
