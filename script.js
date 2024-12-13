let currentCount = 0; // Current number AI is outputting
let expectedCount = 1; // The correct next number in sequence
let rewardPoints = 0; // Total reward points

// Learning weights for AI
let aiState = {
  randomness: 1.0, // Higher value = more random guesses
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function aiNextNumber() {
  // Decide whether to guess randomly or learn the correct sequence
  if (Math.random() < aiState.randomness) {
    return getRandomInt(100); // Random guess between 1 and 100
  } else {
    return expectedCount; // Learned behavior
  }
}

function updateRewards(isCorrect) {
  if (isCorrect) {
    rewardPoints++;
    aiState.randomness = Math.max(0, aiState.randomness - 0.05); // Reduce randomness
  } else {
    aiState.randomness = Math.min(1.0, aiState.randomness + 0.02); // Increase randomness
  }
  document.getElementById("rewardPoints").textContent = rewardPoints;
}

function updateUI() {
  document.getElementById("aiCount").textContent = currentCount;
  document.getElementById("expectedCount").textContent = expectedCount;
}

function startCounting() {
  const statusMessage = document.getElementById("statusMessage");
  const interval = setInterval(() => {
    currentCount = aiNextNumber(); // Get AI's next guess
    const isCorrect = currentCount === expectedCount;

    // Update rewards and AI learning
    updateRewards(isCorrect);

    if (isCorrect) {
      statusMessage.textContent = "AI counted correctly!";
      expectedCount++; // Increment to the next number
    } else {
      statusMessage.textContent = `AI made a mistake! Guessed ${currentCount}, expected ${expectedCount}.`;
    }

    // Reset if sequence ends (now goes to 100 instead of 10)
    if (expectedCount > 100) {
      expectedCount = 1;
    }

    updateUI();
  }, 1000);

  document.getElementById("startButton").disabled = true; // Disable button after start
}

// Attach event listener
document.getElementById("startButton").addEventListener("click", startCounting);
