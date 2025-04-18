// window.addEventListener("load", () => {
//     setTimeout(() => {
//       document.querySelector(".preloader").style.display = "none";
//     }, 5000);
//   });

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    const scrollElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in');
    
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 0.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Enhanced smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('text-purple-500');
            });
            
            // Add active class to clicked link
            this.classList.add('text-purple-500');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('nav').offsetHeight;
                
                // Calculate scroll position
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const headerHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('text-purple-500');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('text-purple-500');
                    }
                });
            }
        });
    };
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        updateActiveNavLink();
    });
    
    // Trigger once on load
    handleScrollAnimation();
    updateActiveNavLink();

    // Initialize Swiper for projects
    const projectsSwiper = new Swiper('.projectsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 500,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'text-green-500 mt-4';
                successMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'text-red-500 mt-4';
                errorMessage.textContent = 'Failed to send message. Please try again.';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            } finally {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#0A0B1E]/95', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-[#0A0B1E]/95', 'shadow-lg');
        }
    });

    // Stats animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stats-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.floor(count) + (target === 99 ? '%' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + (target === 99 ? '%' : '+');
                }
            };

            updateCount();
        });
    };

    // Initialize stats animation when about section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('#about')) {
        observer.observe(document.querySelector('#about'));
    }
});

// Initialize all scripts
function initializeScripts() {
    // Enhanced smooth scrolling for navigation links
    $('a[href*="#"]').on('click', function(e) {
        // Only prevent default if navigation is to a section on this page
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            e.preventDefault();
            const target = $(this.hash);
            
            // Check if the target exists
            if (target.length) {
                // Get header height for offset
                const headerHeight = $('nav').outerHeight();
                
                // Animate scroll
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, {
                    duration: 800,
                    easing: 'swing',
                    complete: function() {
                        // Update active state
                        $('nav a').removeClass('text-purple-500');
                        $(`nav a[href="${target.selector}"]`).addClass('text-purple-500');
                    }
                });
            }
        }
    });

    // Add active state to navigation based on scroll position
    $(window).on('scroll', function() {
        const scrollPosition = $(this).scrollTop();
        const headerHeight = $('nav').outerHeight();

        // Check each section
        $('section[id]').each(function() {
            const target = $(this);
            const sectionTop = target.offset().top - headerHeight - 100;
            const sectionBottom = sectionTop + target.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = target.attr('id');
                $('nav a').removeClass('text-purple-500');
                $(`nav a[href="#${currentId}"]`).addClass('text-purple-500');
            }
        });

        // Add background and shadow to nav when scrolled
        if (scrollPosition > 0) {
            $('nav').addClass('bg-[#0A0B1E] shadow-lg');
        } else {
            $('nav').removeClass('bg-[#0A0B1E] shadow-lg');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = $('<button>', {
        class: 'md:hidden text-white p-2',
        html: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'
    });

    const mobileMenu = $('nav .hidden').clone().removeClass('hidden').addClass('mobile-menu absolute top-full left-0 right-0 bg-[#0A0B1E] p-4 border-t border-gray-800 slide-down');
    
    $('nav .container > div').append(mobileMenuBtn);
    
    mobileMenuBtn.on('click', function() {
        if ($('.mobile-menu').length) {
            $('.mobile-menu').remove();
        } else {
            $('nav').append(mobileMenu);
        }
    });

    // Animate stats numbers
    const animateStats = () => {
        $('.stats-number').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    $this.text(Math.floor(current) + ($this.data('target') === 99 ? '%' : '+'));
                    requestAnimationFrame(updateNumber);
                } else {
                    $this.text(target + ($this.data('target') === 99 ? '%' : '+'));
                }
            };

            updateNumber();
        });
    };

    // Trigger stats animation when about section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#about'));
}

// Export functions for use in index.html
window.initializeSwiper = initializeSwiper;
window.initializeScripts = initializeScripts; 