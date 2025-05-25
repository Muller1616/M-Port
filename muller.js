
        // Form Validation
        function validateForm(formData) {
            let isValid = true;
            const errors = {};

            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });

            // Name validation
            if (!formData.name || formData.name.trim().length < 2) {
                errors.name = 'Name must be at least 2 characters long';
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email || !emailRegex.test(formData.email)) {
                errors.email = 'Please enter a valid email address';
                isValid = false;
            }

            // Subject validation
            if (!formData.subject || formData.subject.trim().length < 5) {
                errors.subject = 'Subject must be at least 5 characters long';
                isValid = false;
            }

            // Message validation
            if (!formData.message || formData.message.trim().length < 10) {
                errors.message = 'Message must be at least 10 characters long';
                isValid = false;
            }

            // Display errors
            Object.keys(errors).forEach(field => {
                const formGroup = document.getElementById(field).parentElement;
                const errorElement = document.getElementById(`${field}-error`);
                
                formGroup.classList.add('error');
                errorElement.textContent = errors[field];
            });

            return isValid;
        }

        // Show Success Card
        function showSuccessCard() {
            const overlay = document.getElementById('overlay');
            const successCard = document.getElementById('successCard');
            
            overlay.classList.add('show');
            successCard.classList.add('show');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        // Close Success Card
        function closeSuccessCard() {
            const overlay = document.getElementById('overlay');
            const successCard = document.getElementById('successCard');
            
            overlay.classList.remove('show');
            successCard.classList.remove('show');
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }

        // Enhanced Contact Form Handler
        function handleSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Simulate form submission delay
                const submitBtn = event.target.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success card
                    showSuccessCard();
                    
                    // Reset form
                    event.target.reset();
                }, 1500);
            }
        }

        // Enhanced scroll event listener for transparent navbar
        window.addEventListener('scroll', function() {
            handleScrollAnimations();
            animateSkillBars();
            
            // Navbar background on scroll
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Typing Animation
        const typingText = document.getElementById('typing-text');
        const roles = ['Web Developer', 'Flutter Specialist', 'Problem Solver', 'Tech Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, typingSpeed);
        }

        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.querySelector('.theme-toggle i');
            
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Mobile Menu Toggle
        function toggleMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Scroll Animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Skill Bar Animations
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            });
        }

        // Download Resume
        function downloadResume() {
            // Create a sample resume content
            const link = document.createElement('a');
            link.href = '../assets/Mullercv.pdf';
            link.download = 'Muller_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        }

        // Project Modal (placeholder)
        

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                document.querySelector('.theme-toggle i').className = 'fas fa-sun';
            }
            
            // Start typing animation
            typeWriter();
            
            // Initial scroll animations
            handleScrollAnimations();
            animateSkillBars();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar');
            
            if (!navbar.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    