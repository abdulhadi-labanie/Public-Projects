// Create animated trees
function createTrees() {
    const dashboard = document.querySelector('.dashboard-preview');
    const treeCount = 10;
    
    for (let i = 0; i < treeCount; i++) {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.left = `${(i * 15) + Math.random() * 5}%`;
        tree.style.animationDelay = `${Math.random() * 2}s`;
        dashboard.appendChild(tree);
    }
}

// Create campfire
function createCampfire() {
    const dashboard = document.querySelector('.dashboard-preview');
    const campfire = document.createElement('div');
    campfire.className = 'campfire';
    
    const flames = document.createElement('div');
    flames.className = 'flames';
    
    for (let i = 0; i < 3; i++) {
        const flame = document.createElement('div');
        flame.className = 'flame';
        flames.appendChild(flame);
    }
    
    const logs = document.createElement('div');
    logs.className = 'logs';
    
    campfire.appendChild(flames);
    campfire.appendChild(logs);
    dashboard.appendChild(campfire);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createTrees();
    createCampfire();
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header animation
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});