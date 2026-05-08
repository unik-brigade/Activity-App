// Simple screen navigation logic
const screens = document.querySelectorAll('.screen');

function navTo(screenId) {
    screens.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'scale(0.95)';
        setTimeout(() => {
            s.classList.remove('active');
        }, 400);
    });

    setTimeout(() => {
        const target = document.getElementById(screenId);
        target.classList.add('active');
        // Trigger reflow
        void target.offsetWidth;
        target.style.opacity = '1';
        target.style.transform = 'scale(1)';
    }, 400);
}

// Simulate splash screen delay
window.addEventListener('load', () => {
    setTimeout(() => {
        navTo('role-selection');
    }, 2500);
});

// Simple star rating interaction
const stars = document.querySelectorAll('.rating-stars i');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.remove('fa-regular');
                s.classList.add('fa-solid', 'active');
            } else {
                s.classList.remove('fa-solid', 'active');
                s.classList.add('fa-regular');
            }
        });
    });
});

function loginStudent() {
    const pwd = document.getElementById('student-password-input').value;
    const errorMsg = document.getElementById('student-login-error');
    if (pwd !== 'mca') {
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';

    const studentInput = document.getElementById('student-id-input').value.trim();
    if (studentInput !== '') {
        document.getElementById('student-name-display').innerText = studentInput;
        document.getElementById('student-avatar-display').innerText = studentInput.charAt(0).toUpperCase();
    } else {
        document.getElementById('student-name-display').innerText = 'Sathish';
        document.getElementById('student-avatar-display').innerText = 'S';
    }
    navTo('student-dashboard');
}

function loginFaculty() {
    const pwd = document.getElementById('faculty-password-input').value;
    const errorMsg = document.getElementById('faculty-login-error');
    if (pwd !== 'mca') {
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';

    const facultyInput = document.getElementById('faculty-id-input').value.trim();
    if (facultyInput !== '') {
        document.getElementById('faculty-name-display').innerText = facultyInput;
    } else {
        document.getElementById('faculty-name-display').innerText = 'Dr. Senthil';
    }
    navTo('faculty-dashboard');
}

async function submitFeedback() {
    const name = document.getElementById('fb-name').value.trim();
    const email = document.getElementById('fb-email').value.trim();
    const message = document.getElementById('fb-message').value.trim();
    const btn = document.getElementById('fb-submit-btn');

    if (!message) {
        alert('Please enter a message.');
        return;
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1502229432545443971/eb9KTLUQDR5EN3s42cRYqlM9xrCJGghkG_mAhrkflvDftGG1tpkanH39BO3COQs8avbm';
    
    const payload = {
        embeds: [{
            title: "New App Feedback",
            color: 3447003,
            fields: [
                { name: "Name", value: name || "Anonymous", inline: true },
                { name: "Email", value: email || "No email provided", inline: true },
                { name: "Message", value: message }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    try {
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Thank you for your feedback!');
            document.getElementById('fb-name').value = '';
            document.getElementById('fb-email').value = '';
            document.getElementById('fb-message').value = '';
            navTo('role-selection');
        } else {
            alert('Failed to send feedback. Please try again later.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        btn.innerText = 'Submit Feedback';
        btn.disabled = false;
    }
}
