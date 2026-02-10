document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  const letters = document.querySelectorAll('.letter');
  
  // 1. Slower Popping Animation (White Text)
  letters.forEach((span, index) => {
    setTimeout(() => {
      span.style.animation = "popIn 1s forwards"; // Slower animation
    }, index * 300); // Slower delay between letters
  });
  
  // Remove Loader
  setTimeout(() => {
    loader.style.transition = "opacity 0.8s";
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      mainContent.style.display = 'block';
      handleScroll();
    }, 800);
  }, 2500); // Longer wait time for slower animation
  
  // 2. Theme Toggle (Text Color Logic handled in CSS)
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggle.checked = true;
  }
  
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // 3. Exact Interactive Scroll Line (No Delay)
  const line = document.getElementById('scroll-line');
  const timeline = document.querySelector('.timeline-wrapper');
  
  function updateLine() {
    if (!timeline) return;
    
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate the "pen" position (center of screen) relative to the timeline top
    const penPosition = (windowHeight / 2) - rect.top;
    
    // Clamp value between 0 and total height
    const height = Math.max(0, Math.min(rect.height, penPosition));
    
    // Apply height instantly (no CSS transition)
    line.style.height = `${height}px`;
  }
  
  // 4. Scroll Reveal
  function handleScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const triggerBottom = window.innerHeight * 0.85;
    
    reveals.forEach(el => {
      const box = el.getBoundingClientRect();
      if (box.top < triggerBottom) {
        el.classList.add("active");
      }
    });
    
    // Update line on every scroll
    updateLine();
  }
  
  window.addEventListener("scroll", handleScroll);
  
  // Initial check
  updateLine();
  
  // 5. Contact Form
  const form = document.querySelector('.contact-form');
  const modal = document.getElementById('success-modal');
  const closeModal = document.getElementById('close-modal');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const btn = form.querySelector('.submit-btn');
      btn.innerText = "Sending...";
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          modal.classList.add('show');
          form.reset();
        }
      } catch (err) {
        alert("Error sending message.");
      }
      btn.innerText = "Send Message";
    });
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
  }
});

// Mobile Menu Functions
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function closeMenu() {
  document.querySelector('.nav-links').classList.remove('active');
} 