function createRow() {
  let row = document.createElement("div");
  row.classList.add('row');
  return row;
}

function createRows() {
  for (let i = 1; i <= 3; i++) {
    const createdRow = createRow();
    createdRow.setAttribute('id', `row-${i}`);
    const container = document.getElementById('rows');
    container.appendChild(createdRow);
  }
}

function destroyRows() {
  for (let i = 1; i <= 3; i++) {
    let row = document.getElementById(`row-${i}`)
    row.remove();
  }
}