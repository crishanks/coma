class Level {
  constructor() {
    this.eventCards = [];
  }

  render() {
    //fetch 5 random event cards 
    //create the instances of event Cards (calls EventCard.render(json))
    //display them on the DOM
    // deals first hand of face-down cards w/ click listeners
    const cardRow = document.getElementById('row-1');
    let individualCard = new EventCard();
    individualCard = individualCard.render();
    cardRow.appendChild(individualCard);
  }
}