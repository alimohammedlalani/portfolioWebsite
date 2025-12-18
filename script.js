        // 1. Navigation Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
        // 2. Typewriter Effect
        const lines = [
            "> Computer Science & AI Undergraduate",
            "> Aspiring Software Developer",
  "> AI Enthusiast & Problem Solver"
];

    const el = document.getElementById("typewriter");

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentLine = lines[lineIndex];

  if (!isDeleting) {
    // Typing
    el.textContent = currentLine.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentLine.length) {
      setTimeout(() => (isDeleting = true), 1000); // pause after typing
    }
  } else {
    // Deleting
    el.textContent = currentLine.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length; // loop
    }
  }

  const speed = isDeleting ? 30 : 50;
  setTimeout(typeEffect, speed);
}

// start
typeEffect();


        // 3. Scroll Reveal Animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // 4. 3D Tilt Effect for Project Cards (Vanilla JS)
        const cards = document.querySelectorAll('.tilt-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });

        // 5. Modal Logic
        function openModal(id) {
            const modal = document.getElementById(id);
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('open'), 10); // Slight delay for transition
            document.body.style.overflow = 'hidden';
        }

        function closeModal(id) {
            const modal = document.getElementById(id);
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300); // Wait for transition
        }
        
        // Close on outside click
        window.onclick = function(event) {
            if (event.target.classList.contains('modal-overlay')) {
                closeModal(event.target.id);
            }
        }