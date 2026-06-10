document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const startButton = document.getElementById('startButton');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const unfoldButton = document.getElementById('unfoldButton');
    const finalGreetingElement = document.getElementById('finalGreeting');
    const sparklesContainer = document.getElementById('sparklesContainer');
    const floatingHeartsContainer = document.getElementById('floatingHeartsContainer');

    const steps = {
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        step4: document.getElementById('step4'),
    };

    const recipientName = "Nouri"; // Customizable Name
    const messageGreeting = "Happy Birthday,"; // Customizable Greeting
    const isMobile = window.innerWidth <= 480;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reduceAnimations = isMobile || prefersReducedMotion;

    // --- Utility Function to Transition Steps ---
    function transitionToStep(targetStepId) {
        const currentActive = document.querySelector('.step.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        steps[targetStepId].classList.add('active');
    }

    // --- Sparkles Effect for Welcome Screen ---
    function createSparkles() {
        const colors = ['#f0e68c', '#a855f7', '#e94560', '#ffffff']; // Yellow, purple, red, white
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.animationDelay = `${Math.random() * 3}s`;
            sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
            const size = Math.random() * 4 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparklesContainer.appendChild(sparkle);
        }
    }

    // --- Step 1: Welcome Screen Interactions ---
    createSparkles();
    
    startButton.addEventListener('click', () => {
        transitionToStep('step2');
        // Autoplay music (often requires user interaction first)
        backgroundMusic.play().catch(() => {
            // Show play button on mobile when autoplay fails
            showAudioPlayButton();
        });
        // Create sparkle burst on click
        createSparkleBurst();
    });
    
    function createSparkleBurst() {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            const angle = (i / 12) * 360;
            const distance = 80 + Math.random() * 60;
            const rad = (angle * Math.PI) / 180;
            sparkle.style.setProperty('--dx', `${Math.cos(rad) * distance}px`);
            sparkle.style.setProperty('--dy', `${Math.sin(rad) * distance}px`);
            sparkle.style.backgroundColor = ['#a855f7', '#f0e68c', '#e94560'][Math.floor(Math.random() * 3)]; // Purple, yellow, red
            sparkle.style.animation = 'sparkleBurst 0.8s ease-out forwards';
            sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
            sparklesContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    // --- Audio Play Button (shown on mobile when autoplay blocked) ---
    function showAudioPlayButton() {
        let playBtn = document.getElementById('audioPlayButton');
        if (!playBtn) {
            playBtn = document.createElement('button');
            playBtn.id = 'audioPlayButton';
            playBtn.className = 'audio-play-button';
            playBtn.textContent = '🎵';
            playBtn.setAttribute('aria-label', 'Play background music');
            document.body.appendChild(playBtn);
            
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                backgroundMusic.play().then(() => {
                    playBtn.classList.remove('visible');
                }).catch(() => {});
            });
        }
        playBtn.classList.add('visible');
    }

    // --- Step 2: Envelope Interactions ---
    // Uses touch-action: manipulation in CSS to eliminate 300ms tap delay on mobile
    envelopeContainer.addEventListener('click', () => {
        if (envelopeContainer.classList.contains('open')) return;
        
        envelopeContainer.classList.add('open');
        const instruction = envelopeContainer.querySelector('.click-instruction');
        if (instruction) instruction.style.opacity = '0';
        
        setTimeout(() => {
            transitionToStep('step3');
            setTimeout(() => {
                document.getElementById('letterContainer').classList.add('show');
            }, 100);
        }, 700);
    });

    // --- Step 3: Letter Unfold Interactions ---
    unfoldButton.addEventListener('click', () => {
        transitionToStep('step4');
        startCelebrationAnimations();
    });

    // --- Step 4: Grand Celebration Animations ---
    function startCelebrationAnimations() {
        // --- Typewriter Effect for Main Greeting ---
        let i = 0;
        finalGreetingElement.textContent = ''; // Clear content
        finalGreetingElement.style.borderRight = '3px solid var(--accent-yellow)'; // Ensure cursor is visible
        
        const typingInterval = setInterval(() => {
            if (i < messageGreeting.length) {
                finalGreetingElement.textContent += messageGreeting.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                finalGreetingElement.classList.add('typed'); // Add class to manage cursor animation after typing
            }
        }, 100); // Typing speed

        // --- Confetti Cannon Effect (fewer on mobile) ---
        if (reduceAnimations) {
            createConfettiCannon(40, 0.3);
            setTimeout(() => createConfettiCannon(30, 0.2), 600);
        } else {
            createConfettiCannon(100, 0.5);
            setTimeout(() => createConfettiCannon(80, 0.3), 500);
            setTimeout(() => createConfettiCannon(60, 0.2), 1000);
        }

        // --- Rising Balloons (fewer on mobile) ---
        createBalloons(reduceAnimations ? 8 : 18);
        
        // --- Floating Hearts (fewer on mobile) ---
        createFloatingHearts(reduceAnimations ? 5 : 10);

        // --- Candle Blow Timer Sequence ---
        startCandleSequence();

        // --- Background Fireworks (fewer on mobile) ---
        createFireworks(reduceAnimations ? 3 : 8);
    }

    // --- Confetti Cannon Helper ---
    function createConfettiCannon(count, delayMultiplier) {
        const confettiCannonContainer = document.querySelector('.confetti-cannon-container');
        const colors = ['#e94560', '#f0e68c', '#ffffff', '#a855f7', '#00d8d6', '#8e44ad']; // Red, yellow, white, purple, teal, violet

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`; // Random start X
            confetti.style.top = `${Math.random() * 20 - 10}vh`; // Slightly above/below top of screen

            // Randomize duration and delay
            const duration = Math.random() * 2 + 3; // 3-5 seconds
            const delay = Math.random() * delayMultiplier;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Randomize size and shape
            const size = Math.random() * 8 + 4; // 4-12px
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            if (Math.random() > 0.5) confetti.style.borderRadius = '50%'; // Make some circular

            // Randomize initial rotation for confetti
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            confettiCannonContainer.appendChild(confetti);

            // Remove after animation to prevent DOM bloat
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }

    // --- Balloons Helper ---
    function createBalloons(count) {
        const balloonsContainer = document.querySelector('.balloons-container');
        const colors = ['#e94560', '#f0e68c', '#00d8d6', '#a855f7', '#8e44ad', '#3498db']; // Red, yellow, teal, purple, violet, blue

        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');

            balloon.style.left = `${Math.random() * 80 + 10}vw`; // Avoid edges
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${Math.random() * 6 + 10}s`; // 10-16s duration
            balloon.style.animationDelay = `${Math.random() * 5}s`; // Staggered start

            balloonsContainer.appendChild(balloon);

            // Remove after animation
            balloon.addEventListener('animationend', () => balloon.remove());
        }
    }

    // --- Floating Hearts Helper ---
    function createFloatingHearts(count) {
        const hearts = ['🤍', '💜', '💖', '🤍'];
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 80 + 10}%`;
            heart.style.fontSize = `${Math.random() * 20 + 20}px`;
            heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
            heart.style.animationDelay = `${Math.random() * 3}s`;
            floatingHeartsContainer.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
        }
    }

    // --- Candle Blow Timer Sequence ---
    function startCandleSequence() {
        const messageEl = document.getElementById('candleMessage');
        const flame = document.querySelector('.flame');
        const candle = document.querySelector('.candle');

        // Step 1: After 5 seconds - show first message
        setTimeout(() => {
            messageEl.textContent = 'onfe5 3ad bach ttafi l cham3aa';
            messageEl.classList.add('show');
        }, 5000);

        // Step 2: After 8 seconds (5+3) - show second message
        setTimeout(() => {
            messageEl.textContent = 'a9waaa';
        }, 8000);

        // Step 3: After 10 seconds (5+3+2) - blow out candle
        setTimeout(() => {
            // Spawn smoke/poof particles
            createSmokePuff();
            // Remove the flame completely
            if (flame) {
                flame.style.display = 'none';
            }
            if (candle) {
                candle.classList.add('blown');
            }
        }, 10000);
    }

    function createSmokePuff() {
        const smokeContainer = document.getElementById('smokeContainer');
        if (!smokeContainer) return;
        const particles = 8;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('smoke-particle');
            const angle = (i / particles) * 360 + Math.random() * 30;
            const rad = (angle * Math.PI) / 180;
            const distance = 20 + Math.random() * 25;
            particle.style.setProperty('--dx', `${Math.cos(rad) * distance}px`);
            particle.style.setProperty('--dy', `${Math.sin(rad) * distance}px`);
            // Randomize size slightly
            const size = 8 + Math.random() * 12;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            // Randomize animation duration
            particle.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            particle.style.animationDelay = `${Math.random() * 0.1}s`;
            smokeContainer.appendChild(particle);
            // Clean up after animation
            particle.addEventListener('animationend', () => particle.remove());
        }
    }

    // --- Fireworks Helper ---
    function createFireworks(count) {
        const fireworksContainer = document.querySelector('.fireworks-container');
        const colors = ['#e94560', '#f0e68c', '#ffffff', '#a855f7', '#00d8d6']; // Red, yellow, white, purple, teal

        for (let i = 0; i < count; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            
            firework.style.left = `${Math.random() * 80 + 10}vw`;
            firework.style.bottom = `${Math.random() * 20}vh`; // Launch from bottom 20%
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 5px ${firework.style.backgroundColor}`; // Match box shadow to color
            
            // Stagger animation delay
            const delay = Math.random() * 3; // 0-3 second delay
            firework.style.animationDelay = `${delay}s, ${delay + 3}s`; // Launch and then explode
            
            fireworksContainer.appendChild(firework);

            firework.addEventListener('animationend', () => firework.remove());
        }
    }
});
