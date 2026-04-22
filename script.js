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
