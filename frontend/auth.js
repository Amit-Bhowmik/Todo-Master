// auth.js - Authentication logic for Login & Register pages
const API_BASE = 'http://localhost:5000/api';

function showMessage(text, isError = false) {
  const box = document.getElementById('messageBox');
  box.textContent = text;
  box.className = 'message-box ' + (isError ? 'msg-error' : 'msg-success');
  box.style.display = 'block';
}

// Register user in MySQL after Firebase auth 
async function registerUserInDB(uid, email) {
  try {
    await fetch(`${API_BASE}/register-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firebase_uid: uid, email })
    });
  } catch (err) {
    console.error('Failed to register user in DB:', err);
  }
}

// Email & Password Login (index.html) 
async function loginWithEmail() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    return showMessage('Please enter your email and password.', true);
  }

  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    await registerUserInDB(result.user.uid, result.user.email);
    showMessage('Login successful! Redirecting...');
    setTimeout(() => window.location.href = 'dashboard.html', 900);
  } catch (err) {
    const errorMessages = {
      'auth/user-not-found':     'No account found with this email.',
      'auth/wrong-password':     'Incorrect password.',
      'auth/invalid-email':      'Invalid email address.',
      'auth/too-many-requests':  'Too many failed attempts. Try again later.',
      'auth/invalid-credential': 'Incorrect email or password.',
    };
    showMessage(errorMessages[err.code] || err.message, true);
  }
}

// Email & Password Registration (register.html) 
async function registerWithEmail() {
  const email    = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm  = document.getElementById('regConfirm').value;

  if (!email || !password || !confirm) {
    return showMessage('Please fill in all fields.', true);
  }
  if (password.length < 6) {
    return showMessage('Password must be at least 6 characters.', true);
  }
  if (password !== confirm) {
    return showMessage('Passwords do not match.', true);
  }

  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await registerUserInDB(result.user.uid, result.user.email);
    showMessage('Account created! Redirecting...');
    setTimeout(() => window.location.href = 'dashboard.html', 900);
  } catch (err) {
    const errorMessages = {
      'auth/email-already-in-use': 'This email is already registered. Try logging in.',
      'auth/invalid-email':        'Invalid email address.',
      'auth/weak-password':        'Password is too weak. Use at least 6 characters.',
    };
    showMessage(errorMessages[err.code] || err.message, true);
  }
}

// Google Sign-In (both pages) 
async function loginWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    await registerUserInDB(result.user.uid, result.user.email);
    showMessage('Login successful! Redirecting...');
    setTimeout(() => window.location.href = 'dashboard.html', 900);
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') return;
    showMessage(err.message, true);
  }
}

// Auto-redirect if already logged in 
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = 'dashboard.html';
  }
});
