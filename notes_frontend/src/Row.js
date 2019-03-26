class Row {
  constructor() {
    this.cards = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  }

  createRow() {
    let row = document.createElement("div");
    row.classList.add('row');
    return row;
  }

  render() {
    while (this.cards > 0) {
      //append card to row
      createRow();
      this.cards--;
    }
    return row;
  }
}