const sections = document.querySelectorAll('section');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const welcomeText = document.getElementById('welcome-text');
let currentIndex = 0;

function showSection(index) {
    if (index < 0 || index >= sections.length) return;

    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });

    sidebarLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });

    prevBtn.classList.toggle('disabled', index === 0);
    nextBtn.classList.toggle('disabled', index === sections.length - 1);

    currentIndex = index;
    window.scrollTo(0, 0);
}

// Handle Sidebar Clicks
sidebarLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        showSection(index);
        if (welcomeText) welcomeText.style.display = 'none';
    });
});

// Handle Bottom Navigation Button Clicks
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        showSection(currentIndex - 1);
        if (welcomeText) welcomeText.style.display = 'none';
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < sections.length - 1) {
        showSection(currentIndex + 1);
        if (welcomeText) welcomeText.style.display = 'none';
    }
});

// Handle initial URL hash positioning
const currentHash = window.location.hash;
const hashIndex = Array.from(sections).findIndex(s => `#${s.id}` === currentHash);

if (hashIndex !== -1) {
    showSection(hashIndex);
    if (welcomeText) welcomeText.style.display = 'none';
} else {
    showSection(0);
}

// --- FLASHCARD GALLERY LOGIC ---
const hardwareData = [
    {
        img: './assets/pexels-zeleboba-4526279.jpg',
        title: 'Storage Drive | Hard Drive or SSD',
        description: 'The primary storage drive stores the operating system, programs, apps, and user files and documents.'
    },
    {
        img: './assets/pexels-it-services-eu-9278798-7594824.jpg',
        title: 'RAM | Memory',
        description: 'RAM is temporary memory. It stores short-term data while a PC is actively running programs or browser tabs.'
    },
    {
        img: './assets/pexels-nicolas-foster-65973708-14887610.jpg',
        title: 'Motherboard',
        description: 'A motherboard connects all components together and routes electrical signals and communication between them.'
    },
    {
        img: '/assets/pexels-jonathanborba-37368174.jpg',
        title: 'CPU | Processor',
        description: 'The CPU is the brain of a computer. It constantly takes in data, carries out instructions and does super-fast calculations to execute all the apps and programs on the computer.',
    },
    
            
            
let galleryIndex = 0;
let flipped = false;

function setupHardwareGallery() {
    const gallery = document.getElementById('hardware-gallery');
    const leftBtn = document.getElementById('hardware-left');
    const rightBtn = document.getElementById('hardware-right');

    if (!gallery || !leftBtn || !rightBtn) return;

    function renderFlashcard(index) {
        const { img, title, description } = hardwareData[index];
        gallery.innerHTML = `
            <div class="flashcard${flipped ? ' flipped' : ''}" id="current-flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <img src="${img}" alt="${title}">
                        <strong>${title}</strong>
                    </div>
                    <div class="flashcard-back">
                        <p>${description}</p>
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

document.addEventListener('DOMContentLoaded', setupHardwareGallery);
