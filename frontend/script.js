document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetPasswordForm = document.getElementById('reset-password-form');
    
    const API_URL = 'http://localhost:5000'; // Your backend server URL

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
                    localStorage.setItem('cureverse-token', data.token);
                    alert('Login successful! Welcome back.');
                    // In a real app, redirect to a protected dashboard
                    // window.location.href = '/dashboard.html';
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
        // ... your existing signup logic remains here ...
    }

    // --- NEW: Forgot Password Form Logic ---
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

    // --- NEW: Reset Password Form Logic ---
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

            // Get the token from the URL query string
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