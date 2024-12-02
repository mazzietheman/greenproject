document.getElementById('recycling-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;

    const logList = document.getElementById('log-list');
    const logEntry = document.createElement('li');
    logEntry.textContent = `${quantity} x ${item}`;
    logList.appendChild(logEntry);

    // Clear the form
    document.getElementById('recycling-form').reset();
});