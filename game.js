// Initialize table count
let tableCount = 0;

// Rate per minute
const ratePerMinute = 3;

// Function to create a new table
function createNewTable() {
    // Clone the template
    const tableTemplate = document.getElementById('table-template');
    const newTable = tableTemplate.cloneNode(true);
    newTable.classList.remove('hidden');
    newTable.id = '';

    // Update table number
    const tableNumber = ++tableCount;
    newTable.querySelector('.table-number').textContent = tableNumber;

    // Timer variables
    let startTime;
    let timerInterval;
    let elapsedSeconds = 0;

    const checkinBtn = newTable.querySelector('.checkin-btn');
    const snookerActive = newTable.querySelector('.snooker-active');
    const checkoutBtn = newTable.querySelector('.checkout-btn');
    const elapsedTimeElement = newTable.querySelector('.elapsed-time');
    const totalCostElement = newTable.querySelector('.total-cost');
    const startTimeElement = newTable.querySelector('.start-time');

    // Function to format time (HH:MM:SS)
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    // Function to update the elapsed time and calculate cost
    function updateTimer() {
        elapsedSeconds++;
        elapsedTimeElement.textContent = formatTime(elapsedSeconds);
        const totalCost = (elapsedSeconds / 60) * ratePerMinute;
        totalCostElement.textContent = `Rs.${totalCost.toFixed(2)}`;
    }

    // Handle Check In
    checkinBtn.addEventListener('click', function () {
        startTime = new Date();
        startTimeElement.textContent = startTime.toLocaleTimeString();
        checkinBtn.classList.add('hidden');
        snookerActive.classList.remove('hidden');

        // Start the timer
        timerInterval = setInterval(updateTimer, 1000);
    });

    // Handle Check Out
    checkoutBtn.addEventListener('click', function () {
        clearInterval(timerInterval);

        // Calculate total elapsed time and stop timer
        const endTime = new Date();
        const totalElapsedMinutes = Math.floor(elapsedSeconds / 60);
        const totalCost = totalElapsedMinutes * ratePerMinute;

        totalCostElement.textContent = `Rs.${totalCost.toFixed(2)}`;
        checkinBtn.classList.remove('hidden');
        snookerActive.classList.add('hidden');

        // Reset timer variables
        elapsedSeconds = 0;
        elapsedTimeElement.textContent = '00:00:00';
    });

    // Add the new table to the container
    document.getElementById('tables-container').insertBefore(newTable, document.getElementById('add-table-btn'));
}

// Event listener for adding a new table
// document.getElementById('add-table-btn').addEventListener('click', createNewTable);

// Initial creation of the first table
createNewTable();


