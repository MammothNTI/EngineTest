// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD67h7_zcnktMCTZLhr0ZVO3HJjEuxhytU",
  authDomain: "chat-website-2d1bd.firebaseapp.com",
  databaseURL: "https://chat-website-2d1bd-default-rtdb.firebaseio.com",
  projectId: "chat-website-2d1bd",
  storageBucket: "chat-website-2d1bd.appspot.com",
  messagingSenderId: "99109679367",
  appId: "1:99109679367:web:659f186cc4a8a4ad5c95a2",
  measurementId: "G-6X8PRBMSJY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Sanitize to prevent HTML injection
function sanitize(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Send message
function sendMessage(text) {
  db.ref("messages").push(sanitize(text));
}

// Button click or Enter key
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    sendMessage(msg);
    messageInput.value = "";
  }
});

messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendBtn.click();
});

// Listen for new messages
db.ref("messages").on("value", snapshot => {
  messagesDiv.innerHTML = "";
  snapshot.forEach(child => {
    const p = document.createElement("p");
    p.textContent = child.val();
    messagesDiv.appendChild(p);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
