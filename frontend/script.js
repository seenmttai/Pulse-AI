import { config } from './config.js';
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {

    applyThemeColors();

    initAnimations();

    createStars();

    setupNavigation();

    setupAIDemos();

    setupBackToTop();

    setupScrollAnimations();

    setupGlassmorphism();
});

function applyThemeColors() {
    const root = document.documentElement;

    root.style.setProperty('--primary-color', config.theme.primaryColor);
    root.style.setProperty('--secondary-color', config.theme.secondaryColor);
    root.style.setProperty('--background-dark', config.theme.backgroundDark);
    root.style.setProperty('--background-light', config.theme.backgroundLight);
    root.style.setProperty('--text-light', config.theme.textLight);
    root.style.setProperty('--text-dark', config.theme.textDark);
    root.style.setProperty('--accent-color', config.theme.accentColor);
    root.style.setProperty('--card-bg', config.theme.primaryColor + 'cc'); 

    document.title = config.info.title;

    const accuracyBars = document.querySelectorAll('.accuracy-fill');
    if (accuracyBars.length) {
        const diseaseTypes = Object.keys(config.diseaseModels);

        for (let i = 0; i < Math.min(accuracyBars.length, diseaseTypes.length); i++) {
            const diseaseType = diseaseTypes[i];
            const accuracy = config.diseaseModels[diseaseType].accuracy;

            const accuracyValue = parseFloat(accuracy.replace('%', ''));

            accuracyBars[i].style.width = '0%'; 

            const accuracyLabel = accuracyBars[i].parentElement.nextElementSibling;
            if (accuracyLabel) {
                accuracyLabel.textContent = accuracy + ' Accuracy';
            }
        }
    }
}

function initAnimations() {

    const revealText = document.querySelector('.reveal-text');
    if (revealText) {
        gsap.from(revealText, { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            ease: "power3.out" 
        });
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3 + (index * 0.2),
            ease: "power3.out"
        });
    });

    const heartLogo = document.querySelector('.heart-logo path:first-child');
    if (heartLogo) {
        gsap.to(heartLogo, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            transformOrigin: 'center center',
            ease: "power1.inOut"
        });
    }
}

function createStars() {
    const starContainer = document.createElement('div');
    starContainer.classList.add('stars');
    document.body.appendChild(starContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${5 + Math.random() * 10}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starContainer.appendChild(star);
    }

    const starStyle = document.createElement('style');
    starStyle.textContent = `
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }

        .star {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: twinkle linear infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(starStyle);
}

function setupNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function setupAIDemos() {

    const alzheimerInput = document.getElementById('alzheimer-input');
    const alzheimerAnalyzeBtn = document.getElementById('alzheimer-analyze');
    const alzheimerResult = document.getElementById('alzheimer-result');
    const alzheimerLoader = document.getElementById('alzheimer-loader');

    if (alzheimerAnalyzeBtn) {
        alzheimerAnalyzeBtn.addEventListener('click', function() {
            if (!alzheimerInput.files[0]) {
                showNotification('Please select an MRI scan image first', 'error');
                return;
            }

            alzheimerLoader.style.display = 'flex';
            alzheimerResult.innerHTML = '';

            setTimeout(() => {
                const randomResult = Math.random();
                let diagnosis, confidence, severity;

                if (randomResult < 0.3) {
                    diagnosis = 'No signs of dementia detected';
                    confidence = '97.3%';
                    severity = 'None';
                } else if (randomResult < 0.6) {
                    diagnosis = 'Mild cognitive impairment detected';
                    confidence = '96.8%';
                    severity = 'Mild';
                } else if (randomResult < 0.9) {
                    diagnosis = 'Moderate dementia detected';
                    confidence = '95.2%';
                    severity = 'Moderate';
                } else {
                    diagnosis = 'Severe dementia detected';
                    confidence = '98.1%';
                    severity = 'Severe';
                }

                alzheimerLoader.style.display = 'none';
                alzheimerResult.innerHTML = `
                    <div class="result-card">
                        <div class="result-header ${severity === 'None' ? 'healthy' : 'attention'}">
                            <h4>${diagnosis}</h4>
                            <div class="confidence-badge">Confidence: ${confidence}</div>
                        </div>
                        <div class="result-details">
                            <p><strong>Severity:</strong> ${severity}</p>
                            <p><strong>Analysis:</strong> Our AI has analyzed the MRI scan and detected patterns ${severity === 'None' ? 'consistent with normal brain aging' : 'associated with neurodegenerative changes'}.</p>
                            <p><strong>Recommendation:</strong> ${severity === 'None' ? 'Routine follow-up in 12 months' : 'Consultation with a neurologist is recommended within the next ' + (severity === 'Mild' ? '3 months' : (severity === 'Moderate' ? '1 month' : '1 week'))}.</p>
                        </div>
                    </div>
                `;

                gsap.from(alzheimerResult.querySelector('.result-card'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                });
            }, 2500);
        });
    }

    const retinaInput = document.getElementById('retina-input');
    const retinaAnalyzeBtn = document.getElementById('retina-analyze');
    const retinaResult = document.getElementById('retina-result');
    const retinaLoader = document.getElementById('retina-loader');

    if (retinaAnalyzeBtn) {
        retinaAnalyzeBtn.addEventListener('click', function() {
            if (!retinaInput.files[0]) {
                showNotification('Please select a retinal scan image first', 'error');
                return;
            }

            retinaLoader.style.display = 'flex';
            retinaResult.innerHTML = '';

            setTimeout(() => {
                const randomResult = Math.random();
                let diagnosis, confidence, stage;

                if (randomResult < 0.4) {
                    diagnosis = 'No diabetic retinopathy detected';
                    confidence = '97.8%';
                    stage = 'None';
                } else if (randomResult < 0.7) {
                    diagnosis = 'Mild NPDR detected';
                    confidence = '96.5%';
                    stage = 'Mild';
                } else if (randomResult < 0.9) {
                    diagnosis = 'Moderate NPDR detected';
                    confidence = '98.2%';
                    stage = 'Moderate';
                } else {
                    diagnosis = 'Severe NPDR/PDR detected';
                    confidence = '97.9%';
                    stage = 'Severe';
                }

                retinaLoader.style.display = 'none';
                retinaResult.innerHTML = `
                    <div class="result-card">
                        <div class="result-header ${stage === 'None' ? 'healthy' : 'attention'}">
                            <h4>${diagnosis}</h4>
                            <div class="confidence-badge">Confidence: ${confidence}</div>
                        </div>
                        <div class="result-details">
                            <p><strong>Stage:</strong> ${stage}</p>
                            <p><strong>Analysis:</strong> Our AI has analyzed the retinal image and ${stage === 'None' ? 'found no signs of microaneurysms or hemorrhages' : 'detected potential ' + (stage === 'Mild' ? 'microaneurysms' : (stage === 'Moderate' ? 'dot and blot hemorrhages' : 'neovascularization and severe hemorrhages'))}.</p>
                            <p><strong>Recommendation:</strong> ${stage === 'None' ? 'Routine follow-up in 12 months' : 'Ophthalmology consultation ' + (stage === 'Mild' ? 'within 6 months' : (stage === 'Moderate' ? 'within 3 months' : 'urgently within 1 week'))}.</p>
                        </div>
                    </div>
                `;

                gsap.from(retinaResult.querySelector('.result-card'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                });
            }, 2500);
        });
    }

    const pneumoniaInput = document.getElementById('pneumonia-input');
    const pneumoniaAnalyzeBtn = document.getElementById('pneumonia-analyze');
    const pneumoniaResult = document.getElementById('pneumonia-result');
    const pneumoniaLoader = document.getElementById('pneumonia-loader');

    if (pneumoniaAnalyzeBtn) {
        pneumoniaAnalyzeBtn.addEventListener('click', function() {
            if (!pneumoniaInput.files[0]) {
                showNotification('Please select a chest X-ray image first', 'error');
                return;
            }

            pneumoniaLoader.style.display = 'flex';
            pneumoniaResult.innerHTML = '';

            setTimeout(() => {
                const randomResult = Math.random();
                let diagnosis, confidence, severity;

                if (randomResult < 0.6) {
                    diagnosis = 'No pneumonia detected';
                    confidence = '96.1%';
                    severity = 'None';
                } else {
                    diagnosis = 'Pneumonia detected';
                    confidence = '95.8%';
                    severity = randomResult < 0.8 ? 'Moderate' : 'Severe';
                }

                pneumoniaLoader.style.display = 'none';
                pneumoniaResult.innerHTML = `
                    <div class="result-card">
                        <div class="result-header ${severity === 'None' ? 'healthy' : 'attention'}">
                            <h4>${diagnosis}</h4>
                            <div class="confidence-badge">Confidence: ${confidence}</div>
                        </div>
                        <div class="result-details">
                            <p><strong>Severity:</strong> ${severity}</p>
                            <p><strong>Analysis:</strong> Our AI has analyzed the chest X-ray and ${severity === 'None' ? 'found clear lung fields without consolidation' : 'detected ' + (severity === 'Moderate' ? 'patchy consolidation in the lower lung zones' : 'extensive consolidation in multiple lung zones with possible pleural effusion')}.</p>
                            <p><strong>Recommendation:</strong> ${severity === 'None' ? 'No specific action needed' : (severity === 'Moderate' ? 'Medical consultation within 24 hours' : 'Urgent medical attention required')}.</p>
                        </div>
                    </div>
                `;

                gsap.from(pneumoniaResult.querySelector('.result-card'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                });
            }, 2500);
        });
    }

    const heartAnalyzeBtn = document.getElementById('heart-analyze');
    if (heartAnalyzeBtn) {
        heartAnalyzeBtn.addEventListener('click', function() {
            window.open('https://heartbreaker.streamlit.app', '_blank');
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    gsap.to(notification, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        onComplete: () => {
            setTimeout(() => {
                gsap.to(notification, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    onComplete: () => {
                        notification.remove();
                    }
                });
            }, 3000);
        }
    });
}

function setupBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function setupScrollAnimations() {

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                if (entry.target.classList.contains('disease-card')) {
                    const accuracyFill = entry.target.querySelector('.accuracy-fill');
                    if (accuracyFill) {
                        const width = accuracyFill.style.width;
                        accuracyFill.style.width = '0%';
                        setTimeout(() => {
                            accuracyFill.style.width = width || '90%';
                        }, 100);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    const elements = document.querySelectorAll('.problem-item, .highlight, .disease-card, .feature-card, .tech-card, .journey-step, .impact-card');

    elements.forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.problem-item, .highlight, .disease-card, .feature-card, .tech-card, .journey-step, .impact-card').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

function setupGlassmorphism() {

    const body = document.body;

    for (let i = 0; i < 6; i++) {
        const blob = document.createElement('div');
        blob.className = 'glass-blob';

        if (i % 2 === 0) {
            blob.style.background = config.theme.primaryColor;
        } else {
            blob.style.background = config.theme.accentColor;
        }

        const size = 200 + Math.random() * 300;
        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;

        blob.style.left = `${Math.random() * 100}vw`;
        blob.style.top = `${Math.random() * 200}vh`;

        body.appendChild(blob);

        gsap.to(blob, {
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            duration: 20 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}
