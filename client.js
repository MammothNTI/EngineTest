// Optional: Firebase setup to save/load code
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

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const codeInput = document.getElementById("codeInput");
const runBtn = document.getElementById("runBtn");
const output = document.getElementById("output");

// Safe console wrapper
function captureConsole() {
  const originalLog = console.log;
  const logs = [];
  console.log = function(...args) {
    logs.push(args.join(" "));
    originalLog.apply(console, args);
  };
  return () => {
    console.log = originalLog;
    return logs.join("\n");
  };
}

// Run code safely
runBtn.addEventListener("click", () => {
  const code = codeInput.value;
  output.textContent = ""; // clear output

  const restoreConsole = captureConsole();

  try {
    // eslint-disable-next-line no-eval
    const result = eval(code); // simple JS eval
    const logs = restoreConsole();
    output.textContent = (logs ? logs + "\n" : "") + (result !== undefined ? result : "");
  } catch (err) {
    restoreConsole();
    output.textContent = "Error: " + err.message;
  }
});

// Optional: Save code to Firebase
function saveCode(code) {
  db.ref("codes").push(code);
}

// Optional: Load last saved code
db.ref("codes").limitToLast(1).on("value", snapshot => {
  snapshot.forEach(child => {
    codeInput.value = child.val();
  });
});
