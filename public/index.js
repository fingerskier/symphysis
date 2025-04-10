// Connect to the server via Socket.IO for real-time data-binding
const socket = io();

// Local state that mirrors the shared state from the server
let appState = {};

// Function to update the UI based on state changes
function updateUI(state) {
  document.getElementById('stateDisplay').innerText = JSON.stringify(state, null, 2);
}

// Listen for state updates broadcast by the server
socket.on('stateUpdate', (state) => {
  appState = state;
  updateUI(appState);
});

// Function to parse the URL's query string and hash into a state object
function parseURLState() {
  const params = new URLSearchParams(window.location.search);
  let state = {};
  for (const [key, value] of params.entries()) {
    state[key] = value;
  }
  // Extract context from the hash (assuming a slash-separated list)
  let context = [];
  if (window.location.hash) {
    context = window.location.hash.substring(1).split('/');
  }
  state.context = context;
  return state;
}

// On page load, initialize state from the URL and send it to the server
window.addEventListener('load', () => {
  const initialState = parseURLState();
  socket.emit('updateState', initialState);
});

// Example input to demonstrate two-way binding; sends updates on input change
function onInputChange(e) {
  const key = e.target.id;
  const value = e.target.value;
  const newState = { [key]: value };
  socket.emit('updateState', newState);
} 