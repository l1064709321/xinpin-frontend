/**
 * Joke Generator App
 * Handles UI interactions for the random joke generator
 */

let currentJoke = '';

// Get DOM elements
const jokeDisplay = document.getElementById('jokeDisplay');
const jokeButton = document.getElementById('jokeButton');
const shareButton = document.getElementById('shareButton');
const loading = document.getElementById('loading');

/**
 * Fetch and display a new joke
 */
async function fetchJoke() {
  jokeButton.disabled = true;
  loading.style.display = 'block';
  shareButton.disabled = true;

  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?format=json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Format the joke based on type
    if (data.type === 'twopart') {
      currentJoke = `${data.setup}\n\n${data.delivery}`;
      jokeDisplay.innerHTML = `
        <div class="joke-setup">${data.setup}</div>
        <div class="joke-delivery">${data.delivery}</div>
      `;
    } else {
      currentJoke = data.joke;
      jokeDisplay.innerHTML = `<p>${data.joke}</p>`;
    }

    shareButton.disabled = false;
  } catch (error) {
    console.error('Error fetching joke:', error);
    jokeDisplay.innerHTML = '<p>Oops! Failed to load a joke. Please try again.</p>';
  } finally {
    jokeButton.disabled = false;
    loading.style.display = 'none';
  }
}

/**
 * Share the current joke
 */
function shareJoke() {
  if (!currentJoke) return;

  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'Check out this joke!',
      text: currentJoke
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(currentJoke).then(() => {
      alert('Joke copied to clipboard!');
    }).catch(err => console.error('Failed to copy:', err));
  }
}

// Event listeners
jokeButton.addEventListener('click', fetchJoke);
shareButton.addEventListener('click', shareJoke);

// Load a joke when the page loads
window.addEventListener('load', fetchJoke);
