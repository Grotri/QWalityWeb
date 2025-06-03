import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZBOSx-R6sna4NXkJN3gWsSWgqeJ7GV6k",
  authDomain: "qwality-46b56.firebaseapp.com",
  projectId: "qwality-46b56",
  storageBucket: "qwality-46b56.firebasestorage.app",
  messagingSenderId: "118172327667",
  appId: "1:118172327667:web:dbc2e03f6cc48cb6e2a186",
  measurementId: "G-SEPML84YWJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, logEvent };