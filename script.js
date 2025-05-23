const NUM_CHECKOUTS = 3;
let checkouts = Array.from({ length: NUM_CHECKOUTS }, () => []);

function renderCheckouts() {
    const area = document.getElementById('checkoutArea');
    area.innerHTML = '';
    checkouts.forEach((queue, index) => {
        const totalItems = queue.reduce((sum, item) => sum + item, 0);
        const div = document.createElement('div');
        div.className = 'checkout';
        div.innerHTML = `
      <h3>Checkout ${index + 1} (Total: ${totalItems})</h3>
      <div class="queue">
        ${queue.map(item => `<span>${item}</span>`).join('')}
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

// Initial render
renderCheckouts();
