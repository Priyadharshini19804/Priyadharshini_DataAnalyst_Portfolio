// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    // The CSS animation will handle the fade out after delay
    window.addEventListener('load', function() {
        // Preloader is now handled by CSS animation with delay
        // We'll just ensure it's completely hidden after the animation
        setTimeout(function() {
            const preloader = document.querySelector('.preloader');
            preloader.style.display = 'none';
        }, 8000); // 8 seconds (7s delay + 1s fade out)
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close menu when clicking on menu items on mobile
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Active menu item on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Experience/Education Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.timeline-container');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.querySelector(`.${target}`).classList.add('active');
        });
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block';
                } else {
                    const categories = project.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });

    // Circular Progress Animation
    const circleProgress = document.querySelectorAll('.circular-progress');
    
    const animateCircleProgress = () => {
        circleProgress.forEach(progress => {
            const percentage = progress.getAttribute('data-percentage');
            const circle = progress.querySelector('.circle');
            
            if (isElementInViewport(progress)) {
                circle.style.background = `conic-gradient(var(--primary-color) ${percentage}%, var(--primary-bg) 0%)`;
            }
        });
    };

    // Skill Bar Animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            
            if (isElementInViewport(skill.parentElement.parentElement) && skill.style.width === '0px') {
                skill.style.width = width;
            }
        });
    };

    // Counter Animation section removed (not used)

    // Utility function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Run animations on scroll
    window.addEventListener('scroll', function() {
        animateCircleProgress();
        animateSkillBars();
    });

    // Run animations on initial load
    animateCircleProgress();
    animateSkillBars();

    // Simple Contact Form with inline success message
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Show submission in progress
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Get form data
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const subject = contactForm.querySelector('input[name="subject"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            // Simulate form submission
            setTimeout(() => {
                // Clear the form
                contactForm.reset();
                
                // Show success message
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
