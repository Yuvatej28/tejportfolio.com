import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgdc7t8-F3RsM_kvop1EgPIsc50GaJS5g",
  authDomain: "todo-app-6d5db.firebaseapp.com",
  projectId: "todo-app-6d5db",
  storageBucket: "todo-app-6d5db.firebasestorage.app",
  messagingSenderId: "191027929422",
  appId: "1:191027929422:web:9b7e5ea22de8a361befe1f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const authBox = document.getElementById("auth");
const appBox = document.getElementById("app");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const errorEl = document.getElementById("auth-error");

let currentUser = null;

// ---------- Auth ----------
function showError(err) {
  const messages = {
    "auth/invalid-credential": "Wrong email or password.",
    "auth/email-already-in-use": "That email already has an account. Try logging in.",
    "auth/weak-password": "Password needs at least 6 characters.",
    "auth/invalid-email": "That email doesn't look right.",
  };
  errorEl.textContent = messages[err.code] || err.message;
}

document.getElementById("signup-btn").addEventListener("click", async () => {
  errorEl.textContent = "";
  try {
    await createUserWithEmailAndPassword(auth, emailEl.value, passwordEl.value);
  } catch (err) {
    showError(err);
  }
});

document.getElementById("login-btn").addEventListener("click", async () => {
  errorEl.textContent = "";
  try {
    await signInWithEmailAndPassword(auth, emailEl.value, passwordEl.value);
  } catch (err) {
    showError(err);
  }
});

document.getElementById("logout-btn").addEventListener("click", () => signOut(auth));

// Runs on page load and whenever someone logs in/out
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  todosUL.innerHTML = "";

  if (user) {
    authBox.hidden = true;
    appBox.hidden = false;
    passwordEl.value = "";
    await loadTodos();
  } else {
    authBox.hidden = false;
    appBox.hidden = true;
  }
});

// ---------- Todos ----------
async function loadTodos() {
  const snap = await getDoc(doc(db, "users", currentUser.uid));
  if (snap.exists()) {
    snap.data().todos.forEach((todo) => addTodo(todo.text, todo.completed));
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text, false);
  input.value = "";
  saveTodos();
});

function addTodo(text, completed) {
  const todoEl = document.createElement("li");
  if (completed) todoEl.classList.add("completed");
  todoEl.innerText = text;

  todoEl.addEventListener("click", () => {
    todoEl.classList.toggle("completed");
    saveTodos();
  });

  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todoEl.remove();
    saveTodos();
  });

  todosUL.appendChild(todoEl);
}

async function saveTodos() {
  if (!currentUser) return;

  const todos = [...document.querySelectorAll("li")].map((li) => ({
    text: li.innerText,
    completed: li.classList.contains("completed"),
  }));

  try {
    await setDoc(doc(db, "users", currentUser.uid), { todos });
  } catch (err) {
    console.error("Save failed:", err);
  }
}
