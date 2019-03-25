class EventCard {
  constructor() {
    // this.level = level;
    // this.title = title;
    // this.prompt = prompt;
    // this.confirmation = confirmation;
    // this.denial = denial;
  }

  render() {
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

    // *********REPLACE TEXT CONTENT WITH FETCHED DATA******
    const title = document.createElement('h2');
    title.textContent = "This is a story all about how";
    const description = document.createElement('p');
    description.textContent = "My life got flipped, turned upside down";
    const acceptButton = document.createElement('button');
    acceptButton.textContent = "Yes";
    const denyButton = document.createElement('button');
    denyButton.textContent = "No";

    //adds card to level array
    cardContainer.appendChild(eventCard);
    eventCard.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(acceptButton);
    cardBody.appendChild(denyButton);

    return cardContainer;
  }
}