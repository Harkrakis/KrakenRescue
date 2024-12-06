// List of trash piles to be clicked (these are the correct ones)
const correctTrashIds = [1, 2, 3, 4, 5, 6, 7, 8];

// Store the number of correct clicks
let correctClicks = 0;

// Add event listeners for all trash piles
document.querySelectorAll('.trash').forEach(trash => {
    trash.addEventListener('click', function() {
        const trashId = parseInt(this.getAttribute('data-id'));

        // Check if the clicked trash is correct
        if (correctTrashIds.includes(trashId)) {
            // Correct trash pile clicked
            correctClicks++;
            this.style.backgroundColor = "#2ecc71";  // Change to green on correct click
            this.style.pointerEvents = "none";  // Disable further clicks on this pile

            // Check if all trash piles have been clicked
            if (correctClicks === correctTrashIds.length) {
                document.getElementById('message').innerText = "Congratulations! You freed the Kraken!";
                document.getElementById('kraken-img').style.transform = "scale(1.2)";  // Make the Kraken 'grow' to signify it is freed
            }
        } else {
            // Wrong trash pile clicked
            this.style.backgroundColor = "#e74c3c";  // Change to red on wrong click
        }
    });
});
