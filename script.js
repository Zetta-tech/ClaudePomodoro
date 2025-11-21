// Pomodoro Timer Application
class PomodoroTimer {
    constructor() {
        // Timer state
        this.isRunning = false;
        this.isPaused = false;
        this.currentMode = 'focus'; // 'focus', 'shortBreak', 'longBreak'
        this.sessionCount = 1;
        this.completedSessions = 0;
        this.timeRemaining = 25 * 60; // seconds
        this.totalTime = 25 * 60;
        this.timerInterval = null;

        // Settings
        this.settings = {
            focusTime: 25,
            shortBreak: 5,
            longBreak: 15
        };

        // DOM elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.progressCircle = document.getElementById('progressCircle');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.sessionCountDisplay = document.getElementById('sessionCount');
        this.completedCountDisplay = document.getElementById('completedCount');
        this.modeText = document.querySelector('.mode-text');

        // Settings inputs
        this.focusTimeInput = document.getElementById('focusTime');
        this.shortBreakInput = document.getElementById('shortBreak');
        this.longBreakInput = document.getElementById('longBreak');

        // Initialize
        this.init();
    }

    init() {
        // Event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        // Settings inputs
        this.focusTimeInput.addEventListener('change', (e) => {
            this.settings.focusTime = parseInt(e.target.value);
            if (this.currentMode === 'focus' && !this.isRunning) {
                this.timeRemaining = this.settings.focusTime * 60;
                this.totalTime = this.settings.focusTime * 60;
                this.updateDisplay();
            }
        });

        this.shortBreakInput.addEventListener('change', (e) => {
            this.settings.shortBreak = parseInt(e.target.value);
        });

        this.longBreakInput.addEventListener('change', (e) => {
            this.settings.longBreak = parseInt(e.target.value);
        });

        // Initial display
        this.updateDisplay();
        this.updateProgress();
        this.updateSessionInfo();

        // Add subtle floating animation to timer display
        this.addTimerFloatEffect();

        // Play ambient background sound on interaction (optional)
        this.setupSoundEffects();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;

            // Add visual feedback
            this.startBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.startBtn.style.transform = '';
            }, 200);

            this.timerInterval = setInterval(() => {
                this.tick();
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;
            clearInterval(this.timerInterval);
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;

            // Visual feedback
            this.pauseBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.pauseBtn.style.transform = '';
            }, 200);
        }
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timerInterval);

        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;

        // Reset to current mode's time
        if (this.currentMode === 'focus') {
            this.timeRemaining = this.settings.focusTime * 60;
            this.totalTime = this.settings.focusTime * 60;
        } else if (this.currentMode === 'shortBreak') {
            this.timeRemaining = this.settings.shortBreak * 60;
            this.totalTime = this.settings.shortBreak * 60;
        } else {
            this.timeRemaining = this.settings.longBreak * 60;
            this.totalTime = this.settings.longBreak * 60;
        }

        this.updateDisplay();
        this.updateProgress();

        // Visual feedback
        this.resetBtn.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            this.resetBtn.style.transform = '';
        }, 500);
    }

    tick() {
        if (this.timeRemaining > 0) {
            this.timeRemaining--;
            this.updateDisplay();
            this.updateProgress();
        } else {
            this.complete();
        }
    }

    complete() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;

        // Play completion sound
        this.playCompletionSound();

        // Show notification
        this.showNotification();

        // Update session tracking
        if (this.currentMode === 'focus') {
            this.completedSessions++;
            this.sessionCount++;

            // Determine next mode
            if (this.completedSessions % 4 === 0) {
                this.switchMode('longBreak');
            } else {
                this.switchMode('shortBreak');
            }
        } else {
            this.switchMode('focus');
        }

        this.updateSessionInfo();
    }

    switchMode(mode) {
        this.currentMode = mode;

        let duration;
        let modeLabel;

        if (mode === 'focus') {
            duration = this.settings.focusTime * 60;
            modeLabel = 'Focus Time';
        } else if (mode === 'shortBreak') {
            duration = this.settings.shortBreak * 60;
            modeLabel = 'Short Break';
        } else {
            duration = this.settings.longBreak * 60;
            modeLabel = 'Long Break';
        }

        this.timeRemaining = duration;
        this.totalTime = duration;
        this.modeText.textContent = modeLabel;

        // Animate mode change
        this.modeText.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.modeText.style.transform = 'scale(1)';
        }, 300);

        this.updateDisplay();
        this.updateProgress();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateProgress() {
        const radius = 130;
        const circumference = 2 * Math.PI * radius;
        const progress = (this.timeRemaining / this.totalTime);
        const offset = circumference - (progress * circumference);

        this.progressCircle.style.strokeDashoffset = offset;
    }

    updateSessionInfo() {
        this.sessionCountDisplay.textContent = this.sessionCount;
        this.completedCountDisplay.textContent = this.completedSessions;

        // Animate the updated values
        this.sessionCountDisplay.style.transform = 'scale(1.3) rotate(5deg)';
        this.completedCountDisplay.style.transform = 'scale(1.3) rotate(-5deg)';

        setTimeout(() => {
            this.sessionCountDisplay.style.transform = 'scale(1) rotate(0deg)';
            this.completedCountDisplay.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    showNotification() {
        // Browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const title = this.currentMode === 'focus'
                ? 'Focus session complete!'
                : 'Break time is over!';
            const body = this.currentMode === 'focus'
                ? 'Great work! Time for a break.'
                : 'Ready to focus again?';

            new Notification(title, {
                body: body,
                icon: '⏰'
            });
        }

        // Visual notification on page
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: white;
            padding: 30px 50px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            font-size: 1.5rem;
            font-weight: 600;
            color: #667eea;
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        `;
        notification.textContent = this.currentMode === 'focus'
            ? 'Time for a break! 🎉'
            : 'Back to focus! 💪';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'popOut 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2000);
    }

    playCompletionSound() {
        // Create a simple audio context for a pleasant completion sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 523.25; // C5 note
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);

            // Second note
            setTimeout(() => {
                const oscillator2 = audioContext.createOscillator();
                const gainNode2 = audioContext.createGain();
                oscillator2.connect(gainNode2);
                gainNode2.connect(audioContext.destination);
                oscillator2.frequency.value = 659.25; // E5 note
                oscillator2.type = 'sine';
                gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator2.start(audioContext.currentTime);
                oscillator2.stop(audioContext.currentTime + 0.5);
            }, 200);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    addTimerFloatEffect() {
        // Add subtle floating effect to timer that responds to time
        setInterval(() => {
            if (!this.isRunning) {
                const randomY = Math.sin(Date.now() / 1000) * 3;
                this.timerDisplay.style.transform = `translateY(${randomY}px)`;
            }
        }, 50);
    }

    setupSoundEffects() {
        // Request notification permission on first interaction
        document.addEventListener('click', () => {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }, { once: true });
    }
}

// Add pop-in and pop-out animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
    }

    @keyframes popOut {
        from {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(0) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Theme Management System
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);

        // Theme toggle event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);

        // Add rotation animation to toggle button
        this.themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 500);
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        // Save theme preference
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    // Method to add custom themes in the future
    addCustomTheme(themeName, themeVariables) {
        const style = document.createElement('style');
        const cssVariables = Object.entries(themeVariables)
            .map(([key, value]) => `--${key}: ${value};`)
            .join('\n');

        style.textContent = `
            body.${themeName}-theme {
                ${cssVariables}
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the timer and theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
    new ThemeManager();
});

// Add mouse interaction effects to floating objects
document.addEventListener('mousemove', (e) => {
    const objects = document.querySelectorAll('.float-circle, .float-rectangle, .float-triangle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    objects.forEach((obj) => {
        const rect = obj.getBoundingClientRect();
        const objX = rect.left + rect.width / 2;
        const objY = rect.top + rect.height / 2;

        const deltaX = mouseX - objX;
        const deltaY = mouseY - objY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 200) {
            const force = (200 - distance) / 200;
            const moveX = (deltaX / distance) * force * 20;
            const moveY = (deltaY / distance) * force * 20;

            obj.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        } else {
            obj.style.transform = '';
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (!startBtn.disabled) {
            startBtn.click();
        } else if (!pauseBtn.disabled) {
            pauseBtn.click();
        }
    } else if (e.code === 'KeyR' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('resetBtn').click();
    }
});

// Add scroll animations for settings panel
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const settingsPanel = document.querySelector('.settings-panel');
    if (settingsPanel) {
        observer.observe(settingsPanel);
    }
});
