const startDiv = document.getElementById('start-div');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  startDiv.remove();
  startGame();
  startGame();
});

function startGame() {
  //Show resources nav bar with pre-set values
  const resourcesBar = document.getElementById('resources-bar');
  resourcesBar.style.visibility = "visible";
  level.style.visibility = "visible";

  // deals first hand of face-down cards w/ click listeners
  const cardRow = document.getElementById('row-1');
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
  title.textContent = "This is a story all about how";
  const description = document.createElement('p');
  description.textContent = "My life got flipped, turned upside down";
  const acceptButton = document.createElement('button');
  acceptButton.textContent = "Yes";
  const denyButton = document.createElement('button');
  denyButton.textContent = "No";

  cardRow.appendChild(cardContainer);
  cardContainer.appendChild(eventCard);
  eventCard.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(acceptButton);
  cardBody.appendChild(denyButton);
}

