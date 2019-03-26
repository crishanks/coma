class EventCard {
  constructor() {
  }

  renderCards() {
    fetch("http://localhost:3000/api/v1/event_cards")
    .then(results => {
      return results.json();
    })
    .then(json => {
      console.log('json', json)
      json.forEach((card) => {
        let newCard = new EventCard();
        let createdCard = newCard.createCard(card);
        assignCardToRow(createdCard);
      })
    })
  }

  createCard(card) {
    //create card DOM elements
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("col-xs-12");
    cardContainer.classList.add("col-sm-6");
    cardContainer.classList.add("col-md-4");
    const eventCard = document.createElement('div');
    eventCard.classList.add("card");
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
    eventCard.addEventListener('click', () => {
      cardBody.style.visibility = 'visible';
      eventCard.classList.add('border-clicked');
    })

    acceptButton.addEventListener('click', () => {
      //change current card content to hidden
      title.remove();
      description.remove();
      acceptButton.remove();
      denyButton.remove();
      //display card.confirmation 
      const response = document.createElement('p');
      response.textContent = card.confirmation_response;
      cardBody.appendChild(response);
    })

    denyButton.addEventListener('click', () => {
      //change current card content to hidden
      title.remove();
      description.remove();
      acceptButton.remove();
      denyButton.remove();
      //display card.confirmation 
      const response = document.createElement('p');
      response.textContent = card.rejection_response;
      cardBody.appendChild(response);
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

  render() {
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function assignCardToRow(card) {
  let randomInt = getRandomInt(1, 3);
  let assignedRow = `row-${randomInt}`;
  let randomRow = document.getElementById(assignedRow);
  randomRow.appendChild(card);
}