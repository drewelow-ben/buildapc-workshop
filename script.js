const sections = document.querySelectorAll('section');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const welcomeText = document.getElementById('welcome-text');
let currentIndex = 0;

function showSection(index) {
    // Safety check to ensure index is within range
    if (index < 0 || index >= sections.length) return;

    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });
    
    // Update button visibility (using "disabled" class from your CSS)
    prevBtn.classList.toggle('disabled', index === 0);
    nextBtn.classList.toggle('disabled', index === sections.length - 1);
    
    currentIndex = index;
    window.scrollTo(0, 0); 
}

// Handle Sidebar Clicks
sidebarLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        // We let the hash change naturally, but trigger the UI update
        showSection(index);
        welcomeText.style.display = 'none';
    });
});

// Handle Button Clicks
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) showSection(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < sections.length - 1) showSection(currentIndex + 1);
});

// INITIALIZE: Check if the URL has a hash (e.g., #safety) on load
const currentHash = window.location.hash;
const hashIndex = Array.from(sections).findIndex(s => `#${s.id}` === currentHash);

if (hashIndex !== -1) {
    showSection(hashIndex);
    welcomeText.style.display = 'none';
} else {
    // Default to first section but keep welcome text visible
    showSection(0);
}

// --- FLASHCARD GALLERY LOGIC ---
// use a different variable name so you don't conflict with section navigation
const hardwareData = [
  {
    img: '*/assets/pexels-zeleboba-4526279.jpg',
    title: 'Hard Drive',
    description: 'A hard drive stores the operating system, programs, apps, and user files and documents.'
  },
  {
    img: 'pexels-it-services-eu-9278798-7594824.jpg',
    title: 'RAM',
    description: 'RAM is a type of memory. Memory stores temporary information while a PC is running (browser tabs, open files, game data, etc.)'
  },
  {
    img: 'pexels-nicolas-foster-65973708-14887610.jpg',
    title: 'Motherboard',
    description: 'A motherboard is a hub that connects everything together and allows electrical signals to travel among the various components.'
  }
];
// Use unique names to avoid global var conflicts!
let galleryIndex = 0;
let flipped = false;

function setupHardwareGallery() {
  const gallery = document.getElementById('hardware-gallery');
  const leftBtn = document.getElementById('hardware-left');
  const rightBtn = document.getElementById('hardware-right');
  if (!gallery || !leftBtn || !rightBtn) return; // Defensive check

  function renderFlashcard(index) {
    const {img, title, description} = hardwareData[index];
    gallery.innerHTML = `
      <div class="flashcard${flipped ? ' flipped' : ''}" id="current-flashcard">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <img src="${img}" alt="${title}">
            <strong>${title}</strong>
          </div>
          <div class="flashcard-back">
            <div>${description}</div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('current-flashcard').onclick = function() {
      flipped = !flipped;
      renderFlashcard(galleryIndex);
    };
  }

  leftBtn.onclick = () => {
    galleryIndex = (galleryIndex - 1 + hardwareData.length) % hardwareData.length;
    flipped = false;
    renderFlashcard(galleryIndex);
  };
  rightBtn.onclick = () => {
    galleryIndex = (galleryIndex + 1) % hardwareData.length;
    flipped = false;
    renderFlashcard(galleryIndex);
  };

  renderFlashcard(galleryIndex);
}

// If you use defer or script at bottom, this is safe:
setupHardwareGallery();

// If you do NOT use defer, wrap this call inside
// document.addEventListener('DOMContentLoaded', setupHardwareGallery);
