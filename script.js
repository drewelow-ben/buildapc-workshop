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

// Sample data: Replace this with your real images/descriptions!
const hardwareData = [
  {
    img: 'https://via.placeholder.com/150?text=CPU',
    title: 'CPU',
    description: 'Central Processing Unit – the "brain" of your computer, responsible for carrying out instructions.'
  },
  {
    img: 'https://via.placeholder.com/150?text=GPU',
    title: 'Graphics Card',
    description: 'GPU – handles graphics rendering, crucial for gaming, video editing, and display output.'
  },
  {
    img: 'https://via.placeholder.com/150?text=RAM',
    title: 'RAM',
    description: 'Random Access Memory – fast, temporary memory your computer uses to store data for quick access.'
  },
  // Add more items...
];

let currentIndex = 0;
let flipped = false;

const gallery = document.getElementById('hardware-gallery');
const leftBtn = document.getElementById('hardware-left');
const rightBtn = document.getElementById('hardware-right');

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
    renderFlashcard(currentIndex);
  };
}

leftBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + hardwareData.length) % hardwareData.length;
  flipped = false;
  renderFlashcard(currentIndex);
};

rightBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % hardwareData.length;
  flipped = false;
  renderFlashcard(currentIndex);
};

// Initialize gallery
renderFlashcard(currentIndex);
