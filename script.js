/* ============================================
   AI GYM TRAINER - JavaScript
   Chat Widget + Animations + Interactions
   ============================================ */

// ==========================================
//  PARTICLES BACKGROUND
// ==========================================
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
    }
}

// ==========================================
//  NAVBAR SCROLL EFFECT
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
//  MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ==========================================
//  STAT COUNTER ANIMATION
// ==========================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// ==========================================
//  SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .workout-card, .step-card, .bmi-wrapper');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ==========================================
//  CHAT WIDGET - BUILT-IN CHATBOT
// ==========================================

// User data storage
let userData = {
    height: null,
    weight: null,
    age: null,
    gender: null,
    goals: [],
    state: 'welcome' // welcome, awaiting_info, awaiting_goal, awaiting_workout, ready
};

// Chat widget functions
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    widget.classList.toggle('open');
    const fab = document.getElementById('fabIcon');
    if (widget.classList.contains('open')) {
        fab.textContent = '✕';
        document.getElementById('chatInput').focus();
    } else {
        fab.textContent = '💬';
    }
}

function openChat() {
    const widget = document.getElementById('chatWidget');
    if (!widget.classList.contains('open')) {
        widget.classList.add('open');
        document.getElementById('fabIcon').textContent = '✕';
    }
    setTimeout(() => document.getElementById('chatInput').focus(), 300);
}

function closeChat() {
    const widget = document.getElementById('chatWidget');
    widget.classList.remove('open');
    document.getElementById('fabIcon').textContent = '💬';
}

// Send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Process after delay for natural feel
    setTimeout(() => {
        removeTyping();
        processInput(text);
    }, 800 + Math.random() * 600);
}

// Add message to chat
function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}-message`;
    msg.innerHTML = `<div class="message-content">${text}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

// Typing indicator
function showTyping() {
    const messages = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'message bot-message';
    typing.id = 'typingIndicator';
    typing.innerHTML = `
        <div class="message-content typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// ==========================================
//  CHATBOT LOGIC (Built-in fallback)
// ==========================================

const workoutDB = {
    chest: {
        emoji: "💪", name: "Chest",
        exercises: ["Push-ups (3 x 15 reps)", "Bench Press (4 x 12 reps)", "Incline Dumbbell Press (3 x 12 reps)", "Cable Flyes (3 x 15 reps)", "Dips (3 x 10 reps)"]
    },
    back: {
        emoji: "🔥", name: "Back",
        exercises: ["Pull-ups (3 x 10 reps)", "Deadlift (4 x 8 reps)", "Bent-over Rows (3 x 12 reps)", "Lat Pulldown (3 x 12 reps)", "Seated Cable Row (3 x 12 reps)"]
    },
    biceps: {
        emoji: "💪", name: "Biceps",
        exercises: ["Barbell Curls (3 x 12 reps)", "Hammer Curls (3 x 12 reps)", "Concentration Curls (3 x 10 reps)", "Cable Curls (3 x 15 reps)", "Preacher Curls (3 x 12 reps)"]
    },
    triceps: {
        emoji: "🏋️", name: "Triceps",
        exercises: ["Tricep Dips (3 x 12 reps)", "Skull Crushers (3 x 12 reps)", "Tricep Pushdown (3 x 15 reps)", "Overhead Extension (3 x 12 reps)", "Close-grip Bench Press (3 x 10 reps)"]
    },
    legs: {
        emoji: "🦵", name: "Legs",
        exercises: ["Squats (4 x 12 reps)", "Leg Press (3 x 15 reps)", "Lunges (3 x 12 each leg)", "Leg Curls (3 x 12 reps)", "Calf Raises (4 x 15 reps)"]
    },
    shoulders: {
        emoji: "🎯", name: "Shoulders",
        exercises: ["Overhead Press (4 x 10 reps)", "Lateral Raises (3 x 15 reps)", "Front Raises (3 x 12 reps)", "Face Pulls (3 x 15 reps)", "Arnold Press (3 x 12 reps)"]
    },
    cardio: {
        emoji: "🏃", name: "Cardio",
        exercises: ["Running (20-30 mins)", "Jump Rope (3 x 3 mins)", "Burpees (3 x 15 reps)", "Mountain Climbers (3 x 20 reps)", "High Knees (3 x 1 min)"]
    }
};

function processInput(text) {
    const lower = text.toLowerCase().trim();

    // Check for BMI calculation
    if (lower.includes('bmi') || lower.includes('body mass')) {
        handleBMI();
        return;
    }

    // Check for greeting
    if (['hi', 'hello', 'hey', 'start', 'begin'].some(g => lower === g || lower === g + '!')) {
        addMessage(`Hey there! 💪🔥 I'm your <strong>AI Gym Trainer!</strong><br><br>Share your: Height (cm), Weight (kg), Age, Gender<br>Example: <em>"170 65 21 male"</em> 📏`, 'bot');
        userData.state = 'awaiting_info';
        return;
    }

    // Check for workout types
    const workoutTypes = ['chest', 'back', 'biceps', 'triceps', 'legs', 'shoulders', 'cardio'];
    const foundWorkouts = workoutTypes.filter(w => lower.includes(w));
    if (foundWorkouts.length > 0) {
        handleWorkout(foundWorkouts);
        return;
    }

    // Check for fitness goals
    const goalKeywords = {
        'weight loss': ['weight loss', 'lose weight', 'fat loss', 'slim', 'cut', 'lean', 'shred'],
        'weight gain': ['weight gain', 'gain weight', 'bulk', 'mass', 'put on weight'],
        'muscle building': ['muscle', 'build muscle', 'strength', 'hypertrophy', 'strong', 'buff', 'tone']
    };

    let foundGoals = [];
    for (const [goal, keywords] of Object.entries(goalKeywords)) {
        if (keywords.some(k => lower.includes(k))) {
            foundGoals.push(goal);
        }
    }

    if (foundGoals.length > 0) {
        handleGoal(foundGoals);
        return;
    }

    // Try to parse user info (numbers + text)
    const numbers = text.match(/\d+\.?\d*/g);
    const textParts = text.match(/[a-zA-Z]+/g);
    
    if (numbers && numbers.length >= 3) {
        handleUserInfo(numbers, textParts);
        return;
    }

    // Fallback
    addMessage(`Sorry, I didn't get that 😅 Try:<br>
• Your info: <em>"170 65 21 male"</em><br>
• Goal: <em>"weight loss"</em><br>
• Workout: <em>"chest and back"</em><br>
• BMI: <em>"calculate bmi"</em>`, 'bot');
}

function handleUserInfo(numbers, textParts) {
    userData.height = parseFloat(numbers[0]);
    userData.weight = parseFloat(numbers[1]);
    userData.age = parseInt(numbers[2]);
    
    // Try to find gender
    const genderWords = ['male', 'female', 'man', 'woman', 'boy', 'girl'];
    if (textParts) {
        const found = textParts.find(t => genderWords.includes(t.toLowerCase()));
        userData.gender = found ? found.toLowerCase() : 'not specified';
    } else {
        userData.gender = 'not specified';
    }

    userData.state = 'awaiting_goal';

    addMessage(`Got it! 💪<br><br>
📏 Height: <strong>${userData.height} cm</strong><br>
⚖️ Weight: <strong>${userData.weight} kg</strong><br>
🎂 Age: <strong>${userData.age}</strong><br>
👤 Gender: <strong>${userData.gender}</strong><br><br>
What is your fitness goal? 🎯<br>
<em>(Weight Loss / Weight Gain / Muscle Building)</em>`, 'bot');
}

function handleGoal(goals) {
    userData.goals = goals;
    userData.state = 'awaiting_workout';

    let advice = [];
    goals.forEach(goal => {
        if (goal === 'weight loss') advice.push('🔥 Cardio + Fat Burning exercises');
        if (goal === 'weight gain') advice.push('💪 Strength Training + High Calorie Diet');
        if (goal === 'muscle building') advice.push('🏋️ Hypertrophy Training + Protein Intake');
    });

    addMessage(`Great choice! 🔥<br><br>${advice.join('<br>')}<br><br>
Now tell me which muscle groups you want to train! 💪<br>
<em>(chest, back, biceps, triceps, legs, shoulders, cardio)</em>`, 'bot');
}

function handleWorkout(types) {
    let response = '🔥 <strong>Your Workout Plan:</strong><br><br>';

    types.forEach(type => {
        const workout = workoutDB[type];
        if (workout) {
            response += `${workout.emoji} <strong>${workout.name}:</strong><br>`;
            workout.exercises.forEach(ex => {
                response += `• ${ex}<br>`;
            });
            response += '<br>';
        }
    });

    response += '💪 Stay consistent and crush it! 🔥<br>';
    response += '<em>Type "calculate bmi" to check your BMI!</em>';

    addMessage(response, 'bot');
}

function handleBMI() {
    if (!userData.height || !userData.weight) {
        addMessage(`⚠️ I need your height and weight first!<br>Please share your info:<br><em>"170 65 21 male"</em>`, 'bot');
        return;
    }

    const heightM = userData.height / 100;
    const bmi = (userData.weight / (heightM * heightM)).toFixed(1);

    let category, emoji, tip;
    if (bmi < 18.5) {
        category = 'Underweight'; emoji = '⚠️';
        tip = 'Consider increasing calorie intake and strength training.';
    } else if (bmi <= 24.9) {
        category = 'Normal'; emoji = '💪';
        tip = 'Great shape! Keep maintaining a balanced diet and regular exercise.';
    } else if (bmi <= 29.9) {
        category = 'Overweight'; emoji = '⚡';
        tip = 'Try cardio exercises and a balanced diet to get in shape.';
    } else {
        category = 'Obese'; emoji = '🏃';
        tip = 'Focus on regular exercise and consult a nutritionist.';
    }

    addMessage(`🧮 <strong>BMI Results:</strong><br><br>
Your BMI is <strong>${bmi} (${category})</strong> ${emoji}<br><br>
📊 BMI Scale:<br>
• Underweight: &lt; 18.5<br>
• Normal: 18.5 - 24.9<br>
• Overweight: 25 - 29.9<br>
• Obese: 30+<br><br>
💡 <strong>Tip:</strong> ${tip}`, 'bot');
}

// Enter key to send
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});

// ==========================================
//  INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initMobileMenu();
    animateCounters();
    initScrollAnimations();
});
