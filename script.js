const sections = document.querySelectorAll('section');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const welcomeText = document.getElementById('welcome-text');
let currentIndex = 0;

function showSection(index) {
    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });
    
    // Hide welcome text once they start navigating
    welcomeText.style.display = 'none';
    
    // Update button visibility
    prevBtn.classList.toggle('disabled', index === 0);
    nextBtn.classList.toggle('disabled', index === sections.length - 1);
    
    currentIndex = index;
    window.scrollTo(0, 0); // Scroll to top when changing sections
}

// Sidebar link clicks
sidebarLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(index);
    });
});

// Button clicks
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) showSection(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < sections.length - 1) showSection(currentIndex + 1);
});

// Initialize the first section
showSection(0);
