const NUM_CHECKOUTS = 3;
let checkouts = Array.from({ length: NUM_CHECKOUTS }, () => []);

function renderCheckouts() {
  const area = document.getElementById('checkoutArea');
  area.innerHTML = '';
  checkouts.forEach((queue, index) => {
    const entriesCount = queue.length;
    const totalItems = queue.reduce((sum, item) => sum + item, 0);
    const div = document.createElement('div');
    div.className = 'checkout';
    div.innerHTML = `
      <div class="header">
        <h3 class="counter-title">Counter ${index + 1}</h3>
        <span class="counter-count">${entriesCount} Customers</span>
      </div>
      <div class="queue">
        ${queue.map(item => `<span>${item} items</span>`).join('')}
        <p class="total">Total items: ${totalItems}</p>
      </div>
    `;
    area.appendChild(div);
  });
}

function assignCustomer() {
  const input = document.getElementById('itemsInput');
  const items = parseInt(input.value);
  if (isNaN(items) || items <= 0) return alert('Enter a valid number of items.');

  const totals = checkouts.map(queue => queue.reduce((sum, item) => sum + item, 0));
  const minTotal = Math.min(...totals);
  const index = totals.indexOf(minTotal);
  checkouts[index].push(items);

  input.value = '';
  renderCheckouts();
}

renderCheckouts();
