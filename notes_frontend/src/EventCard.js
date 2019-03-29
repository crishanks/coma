function renderCards(currentLevel) {
  fetch("http://localhost:3000/api/v1/levels")
    .then(results => {
      return results.json();
    })
    .then(json => {
      let levelObject = json[currentLevel];
      nextLevelObject = json[currentLevel + 1];
      document.getElementById("level-title").textContent = levelObject.title;
      let levelCards = Array.from(levelObject["event_cards"]);
      levelCards.forEach(card => {
        let createdCard = createCard(card);

        assignCardToRow(createdCard);
        levelArray.push(card);
      });
    });
}

let levelArray = [];
let nextLevelObject;

function createCard(card) {
  //create card DOM elements
  const cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "col-xs-12",
    "col-sm-6",
    "col-md-4",
    "card-container",
    "col-auto",
    "mb-3"
  );

  const eventCard = document.createElement("div");
  eventCard.classList.add("card");
  eventCard.classList.add("h-100");
  eventCard.classList.add("unviewed");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("text-center");
  cardBody.id = card.id;

  const title = document.createElement("h2");
  title.textContent = card.title;
  const description = document.createElement("p");
  description.textContent = card.description;
  const acceptButton = document.createElement("button");
  acceptButton.textContent = "Yes";
  acceptButton.classList.add("btn", "btn-secondary", "btn-large");
  const denyButton = document.createElement("button");
  denyButton.classList.add("btn", "btn-secondary", "btn-large");
  denyButton.textContent = "No";

  // Event Listeners
  eventCard.addEventListener("click", () => {
    cardFocus(card, cardBody, eventCard);
  });

  acceptButton.addEventListener("click", ev => {
    //change current card content to hidden
    title.remove();
    description.remove();
    acceptButton.remove();
    denyButton.remove();

    //display card confirmation
    const response = document.createElement("p");
    response.textContent = card.confirmation_response;
    cardBody.appendChild(response);
    eventCard.classList.remove("viewing");
    eventCard.classList.add("viewed");
    ev.stopPropagation();

    //Update Resources
    let userChoice = true;
    updateResources(card, userChoice);

    //Check Health Status
    checkHealth();

    //Render New Level
    if (card.escape) {
      let title = nextLevelObject.title;
      let message = "Enter Into a New World";
      createHeroDiv(title, title, message);
    }
  });

  denyButton.addEventListener("click", ev => {
    if (card.escape) {
      eventCard.classList.add("escape-card");
      eventCard.classList.remove("viewing");
      eventCard.classList.add("unviewed");
      cardBody.style.visibility = "hidden";
      ev.stopPropagation();
    } else {
      //change current card content to hidden
      title.remove();
      description.remove();
      acceptButton.remove();
      denyButton.remove();

      //display card confirmation
      const response = document.createElement("p");
      response.textContent = card.rejection_response;
      cardBody.appendChild(response);

      eventCard.classList.remove("viewing");
      eventCard.classList.add("viewed");
      ev.stopPropagation();

      //Update Resources
      let userChoice = false;
      updateResources(card, userChoice);

      //Check Health Status
      checkHealth();
    }
  });

  //adds card to level array
  cardContainer.appendChild(eventCard);
  eventCard.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(acceptButton);
  cardBody.appendChild(denyButton);

  return cardContainer;
}

//Helper Functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function assignCardToRow(card) {
  let randomInt = getRandomInt(1, 3);
  let assignedRow = `row-${randomInt}`;
  let randomRow = document.getElementById(assignedRow);
  randomRow.appendChild(card);
}

function cardFocus(card, cardBody, eventCard) {
  let numViewing = document.getElementsByClassName("viewing").length;
  if (numViewing > 0) {
    return;
  }

  if (card.final) {
    win();
  }

  cardBody.style.visibility = "visible";
  eventCard.classList.add("border-clicked");
  eventCard.classList.remove("unviewed");
  eventCard.classList.add("viewing");
  move();
}

function checkHealth() {
  const health = document.getElementById("resource-health-value").textContent;
  let healthNum = parseInt(health);
  if (healthNum < 1) {
    lose();
  }
}

function move() {
  const foodResourceEl = document.getElementById("resource-food-value");
  if (parseInt(foodResourceEl.textContent < 0)) {
    foodResourceEl.textContent = 0;
  }
  if (parseInt(foodResourceEl.textContent) < 1) {
    const healthResourceEl = document.getElementById("resource-health-value");
    healthResourceValue = parseInt(healthResourceEl.textContent);
    healthResourceEl.textContent--;
  } else {
    foodResourceEl.textContent--;
  }
}

function updateResources(card, userChoice, ev) {
  if (userChoice) {
    //Resources
    const health = card.accept_id.health;
    const food = card.accept_id.food;
    const gold = card.accept_id.gold;
    const playerGold = parseInt(
      document.getElementById("resource-currency-value").textContent,
      10
    );
    if (playerGold + gold >= 0) {
      console.log("gold1", gold);
      changeResourceElement("health", health);
      changeResourceElement("food", food);
      changeResourceElement("currency", gold);
    } else {
      console.log("gold2", gold);
      const currentCard = document.getElementById(card.id);
      currentCard.classList.add("viewed");
      currentCard.textContent = "You Don't Have Enough Gold!";
    }
  } else {
    const health = card.reject_id.health;
    const food = card.reject_id.food;
    const gold = card.reject_id.gold;
    changeResourceElement("health", health);
    changeResourceElement("food", food);
    changeResourceElement("currency", gold);
  }
}

function changeResourceElement(resourceName, resource) {
  const el = document.getElementById(`resource-${resourceName}-value`);
  let elValue = parseInt(el.textContent);
  let sum = elValue + resource;
  if (sum < 1) {
    el.textContent = 0;
  } else {
    el.textContent = sum;
  }
}

function renderNewLevel(heroDivId) {
  //display intro to level stretch
  currentLevel++;
  createRows();
  renderCards(currentLevel);
  document.getElementById(heroDivId).remove();
}
