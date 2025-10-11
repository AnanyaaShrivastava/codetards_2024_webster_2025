document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration ---
    const API_URL = 'http://localhost:5000'; // Your backend server URL
    const TOKEN_KEY = 'cureverse-token'; // The key for storing the auth token

    // --- Element Selectors ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetPasswordForm = document.getElementById('reset-password-form');

    // --- ✨ New: Auto-Redirect for Logged-In Users ---
    // This runs on pages like index.html and signup.html.
    // If a token is found, it means the user is already logged in.
    if (loginForm || signupForm) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            console.log('Token found, redirecting to homepage.');
            window.location.href = 'homepage.html'; // Redirect to the main app page
        }
    }

    // --- Login Form Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageEl = document.getElementById('login-message');
            messageEl.textContent = '';
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem(TOKEN_KEY, data.token);
                    window.location.href = 'homepage.html';
                } else {
                    messageEl.textContent = data.msg || 'Login failed. Please check your credentials.';
                    messageEl.style.color = 'salmon';
                }
            } catch (error) {
                messageEl.textContent = 'An error occurred. Please try again.';
                messageEl.style.color = 'salmon';
            }
        });
    }

    // --- Signup Form Logic ---
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const messageEl = document.getElementById('signup-message');
            messageEl.textContent = '';

            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (password.length < 6) {
                messageEl.textContent = 'Password must be at least 6 characters long.';
                messageEl.style.color = 'salmon';
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageEl.textContent = 'Account created successfully! You can now log in.';
                    messageEl.style.color = 'lightgreen';
                    signupForm.reset();
                } else {
                    messageEl.textContent = data.msg || 'Signup failed. Please try again.';
                    messageEl.style.color = 'salmon';
                }
            } catch (error) {
                console.error('Signup Error:', error);
                messageEl.textContent = 'An error occurred. Please check your connection and try again.';
                messageEl.style.color = 'salmon';
            }
        });
    }

    // --- Forgot Password Form Logic ---
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageEl = document.getElementById('message');
            messageEl.textContent = '';

            const email = document.getElementById('forgot-email').value;

            try {
                const response = await fetch(`${API_URL}/api/auth/forgotpassword`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageEl.textContent = 'If an account with that email exists, a reset link has been sent.';
                    messageEl.style.color = 'lightgreen';
                    forgotPasswordForm.reset();
                } else {
                     messageEl.textContent = data.msg || 'An error occurred.';
                     messageEl.style.color = 'salmon';
                }
            } catch (error) {
                messageEl.textContent = 'An error occurred. Please try again.';
                messageEl.style.color = 'salmon';
            }
        });
    }

    // --- Reset Password Form Logic ---
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageEl = document.getElementById('message');
            messageEl.textContent = '';

            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                messageEl.textContent = 'Passwords do not match.';
                messageEl.style.color = 'salmon';
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const resetToken = urlParams.get('token');

            if (!resetToken) {
                messageEl.textContent = 'Invalid or missing reset token.';
                messageEl.style.color = 'salmon';
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/resetpassword/${resetToken}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: newPassword }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageEl.textContent = 'Password has been reset successfully! Redirecting to login...';
                    messageEl.style.color = 'lightgreen';
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    messageEl.textContent = data.msg || 'Failed to reset password. The link may be expired.';
                    messageEl.style.color = 'salmon';
                }
            } catch (error) {
                messageEl.textContent = 'An error occurred. Please try again.';
                messageEl.style.color = 'salmon';
            }
        });
    }
});