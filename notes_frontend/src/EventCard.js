function renderCards(currentLevel) {
  fetch("http://localhost:3000/api/v1/levels")
  .then(results => {
    return results.json();
  })
  .then(json => {
    let levelObject = json[currentLevel];
    let levelCards = Array.from(levelObject["event_cards"]);
    levelCards.forEach((card) => {
      let createdCard = createCard(card);
      assignCardToRow(createdCard);
      currentLevel++;
    })
  })
}

function createCard(card) {
  //create card DOM elements
  const cardContainer = document.createElement('div');
  cardContainer.classList.add("col-xs-12");
  cardContainer.classList.add("col-sm-6");
  cardContainer.classList.add("col-md-4");

  const eventCard = document.createElement('div');
  eventCard.classList.add("card");
  eventCard.classList.add("h-100");
  eventCard.classList.add("unviewed");

  const cardBody = document.createElement('div');
  
  cardBody.classList.add("card-body");
  cardBody.classList.add("text-center");

  const title = document.createElement('h2');
  title.textContent = card.title;
  const description = document.createElement('p');
  description.textContent = card.description;
  const acceptButton = document.createElement('button');
  acceptButton.textContent = "Yes";
  const denyButton = document.createElement('button');
  denyButton.textContent = "No";

  // Event Listeners
  eventCard.addEventListener('click', () => {cardFocus(cardBody, eventCard)});

  acceptButton.addEventListener('click', (ev) => {
    //change current card content to hidden
    title.remove();
    description.remove();
    acceptButton.remove();
    denyButton.remove();

    //display card confirmation
    const response = document.createElement('p');
    response.textContent = card.confirmation_response;
    cardBody.appendChild(response);
    eventCard.classList.remove('viewing');
    eventCard.classList.add('viewed');
    ev.stopPropagation();

    //Update Resources
    let userChoice = true;
    updateResources(card, userChoice);

    //Check Health Status
    checkHealth();
  })

  denyButton.addEventListener('click', (ev) => {
    //change current card content to hidden
    title.remove();
    description.remove();
    acceptButton.remove();
    denyButton.remove();

    //display card confirmation 
    const response = document.createElement('p');
    response.textContent = card.rejection_response;
    cardBody.appendChild(response);
    eventCard.classList.remove('viewing');
    eventCard.classList.add('viewed');
    ev.stopPropagation();

    //Update Resources
    let userChoice = false;
    updateResources(card, userChoice);

    //Check Health Status
    checkHealth();
  })

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

function cardFocus(cardBody, eventCard, ev) {
  let numViewing = document.getElementsByClassName('viewing').length;
  if (numViewing > 0) {
    return;
  } 
    cardBody.style.visibility = 'visible';
    eventCard.classList.add('border-clicked');
  
    eventCard.classList.remove('unviewed');
    eventCard.classList.add('viewing');
  // if eventCard has the class "viewed", prevent eventListener
}

function checkHealth() {
  const health = document.getElementById('resource-health-value').textContent;
  let healthNum = parseInt(health);
  if (healthNum <= 0) {
    gameOver();
  }
}

function updateResources(card, userChoice) {
  if (userChoice) {
    //Resources
    const health = card.accept_id.health;
    const food = card.accept_id.food;
    const gold = card.accept_id.gold;
    changeResourceElement(card, 'health', health);
    changeResourceElement(card, 'food', food);
    changeResourceElement(card, 'currency', gold);

  } else {
    const health = card.reject_id.health;
    const food = card.reject_id.food;
    const gold = card.reject_id.gold;
    changeResourceElement(card, 'health', health);
    changeResourceElement(card, 'food', food);
    changeResourceElement(card, 'currency', gold);
  }
}

function changeResourceElement(card, resourceName, resource) {
  const el = document.getElementById(`resource-${resourceName}-value`);
  let elValue = parseInt(el.textContent);
  elValue += resource;
  el.textContent = elValue;
}

// function parseValue(response) {
//   const responseArray = response.split(' ');
//   const numString = responseArray.filter(word => parseInt(word));
//   const num = parseInt(numString);
//   return num;
// }

// function parseResourceWord(response) {
//   const num = parseValue(response);
//   const responseArray = response.split(' ');
//   for (let i = 0; i < responseArray.length; i++) {
//     const currentWord = responseArray[i];
//     if (currentWord == num) {
//       let resourceWord = responseArray.slice(i + 1, i + 2);
//       return resourceWord[0];
//     }
//   }
// }

// function updateResources(response) {
//   const value = parseValue(response);
//   const resourceValue = parseResourceWord(response);
//   if (resourceValue === 'Gold.') {
//     updateElement('resource-currency-value', value);
//   } else if (resourceValue === 'Food.') {
//     updateElement('resource-food-value', value);
//   } else if (resourceValue === 'Health.') {
//     updateElement('resource-health-value', value);
//   }
// }

// function updateElement(id, value) {
//   let el = document.getElementById(id);
//   let elValue = parseInt(el.textContent);
//   elValue += value;
//   el.textContent = elValue;
// }