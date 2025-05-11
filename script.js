document.addEventListener('DOMContentLoaded', function() {
            const body = document.body;
            const cursor = document.querySelector('.custom-cursor');
            const linksAndButtons = document.querySelectorAll('a, button, .insta-gallery-item, .reel-item-vertical, input, textarea');
            const themeToggleBtn = document.getElementById('themeToggleBtn');
            const themeIcon = themeToggleBtn.querySelector('i');
            const typewriterElement = document.getElementById('typewriter');
            const scrollTopBtn = document.getElementById('scrollTopBtn');

            function applyTheme(theme) {
                if (theme === 'dark') {
                    body.classList.add('dark-mode');
                    body.classList.remove('light-mode');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    body.classList.add('light-mode');
                    body.classList.remove('dark-mode');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }

            const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
            applyTheme(savedTheme);

            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem('portfolioTheme', newTheme);
            });

            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            linksAndButtons.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
            });
            document.addEventListener('mousedown', () => cursor.classList.add('click-effect'));
            document.addEventListener('mouseup', () => cursor.classList.remove('click-effect'));

            if (typewriterElement) {
                const words = ["Web Developer.", "Graphic Designer.", "Creative Thinker."];
                let wordIndex = 0;
                let charIndex = 0;
                let currentWord = "";
                let isDeleting = false;

                typewriterElement.classList.remove('initial-anim');
                typewriterElement.style.animation = 'none'; 
                typewriterElement.style.borderRight = '.15em solid var(--accent-color)';
                typewriterElement.style.width = 'auto'; 

                function type() {
                    currentWord = words[wordIndex];
                    typewriterElement.style.borderRightColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();


                    if (isDeleting) {
                        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                        charIndex--;
                    } else {
                        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                        charIndex++;
                    }

                    if (!isDeleting && charIndex === currentWord.length) {
                        setTimeout(() => isDeleting = true, 1800);
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                    }

                    let typeSpeed = isDeleting ? 60 : 120;
                    if (!isDeleting && charIndex === currentWord.length) {
                        typeSpeed = 1800;
                    }
                    setTimeout(type, typeSpeed);
                }
                setTimeout(type, 300); 
            }
            document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight || 60;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                });
            });

            window.onscroll = function() {
                if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                    scrollTopBtn.style.display = "flex";
                    setTimeout(() => scrollTopBtn.style.opacity = "1", 10);
                } else {
                    scrollTopBtn.style.opacity = "0";
                    setTimeout(() => scrollTopBtn.style.display = "none", 300);
                }
            };
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({top: 0, behavior: 'smooth'});
            });

            const sections = document.querySelectorAll('.fade-in-section');
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "0px 0px -100px 0px" });
            sections.forEach(section => sectionObserver.observe(section));

            document.getElementById('currentYear').textContent = new Date().getFullYear();

            const galleryItems = document.querySelectorAll('.insta-gallery-item');
            const modal = document.getElementById('galleryModal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const closeModalBtn = document.getElementById('galleryModalClose');

            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    modalImage.src = item.querySelector('img').src;
                    modalImage.alt = item.querySelector('img').alt;
                    modalTitle.textContent = item.dataset.title;
                    modalDescription.textContent = item.dataset.description;
                    modal.classList.add('active');
                });
            });

            function closeModal() {
                modal.classList.remove('active');
            }
            closeModalBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => { 
                if (e.target === modal) {
                    closeModal();
                }
            });
            document.addEventListener('keydown', (e) => { 
                if (e.key === "Escape" && modal.classList.contains('active')) {
                    closeModal();
                }
            });

            const reelVideos = document.querySelectorAll('.reels-container-vertical video');
            reelVideos.forEach(video => {
                video.addEventListener('play', () => {
                    reelVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                      });
                });
            });
        });