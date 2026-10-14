// Open or create a database named 'MyDatabase' with version 1
const request = window.indexedDB.open("LocalCustomKits", 1);

request.onerror = (event) => {
  console.error("Database error:", event.target.error);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log("Database opened successfully:", db);
};

// This event is where you create tables (called "Object Stores")
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
};