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
            // this.style.backgroundColor = "#2ecc71";  // Change to green on correct click
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

// function deleteTrash(element) {
//     // Add the fade-out effect
//     element.classList.add('fade-out');
    
//     // Remove the element after the animation
//     element.addEventListener('animationend', () => {
//         element.remove();
//     });
// }

function explodeTrash(trashElement) {
    const container = document.body;
    const rect = trashElement.getBoundingClientRect();
    const particleCount = 30; // Number of particles to generate

    
    // Trigger Kraken Shake
    const kraken = document.getElementById("kraken");
    kraken.classList.add("shake");

    // Remove shake class after animation ends
    kraken.addEventListener("animationend", () => {
        kraken.classList.remove("shake");
    });

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.width = `${Math.random() * 5 + 5}px`;
        particle.style.height = `${Math.random() * 5 + 5}px`;
        particle.style.backgroundColor = getRandomColor();
        particle.style.borderRadius = '50%';
        container.appendChild(particle);

        // Animate particles (no oscillation for particles)
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 200, // Spread out horizontally
            y: (Math.random() - 0.5) * 200, // Spread out vertically
            opacity: 0,
            scale: 0,
            duration: Math.random() * 1 + 0.5, // Random duration
            ease: "power3.out",
            onComplete: () => particle.remove(), // Remove particle after animation
        });
    }

    // Oscillation for trash icon
    gsap.to(trashElement, {
        x: "+=15", // Move slightly to the right
        duration: 0.1,
        yoyo: true, // Reverse the movement
        repeat: 5, // Number of oscillations
        ease: "sine.inOut",
    });

    // Animate trash icon disappearing
    gsap.to(trashElement, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.5, // Delay to allow oscillation to finish
        ease: "power2.in",
        onComplete: () => trashElement.remove(),
        
    });
    checkWin(); // Check if all trash is removed
}

// Helper function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Check if all trash is removed
function checkWin() {
    const remainingTrash = document.querySelectorAll('.trash');
    console.log(remainingTrash)
    if (remainingTrash.length === 1) {
        displayWinScreen();
        console.log("Winning son");

    }
}

// Display the win screen
function displayWinScreen() {
    const trashContainer = document.getElementById('game-board');
    const kraken = document.getElementById('kraken');
    const message = document.getElementById('message');
    const boat = document.getElementById('boat');
    const winScreen = document.getElementById('win-screen');

    // Hide trash container and kraken
    trashContainer.style.display = 'none';
    kraken.style.display = 'none';
    boat.style.display = 'none';
    message.style.display = 'none';

    // Show win screen
    winScreen.classList.remove('hidden');
}
