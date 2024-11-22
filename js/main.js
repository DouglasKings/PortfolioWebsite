// Selecting the hamburger menu button using its class name
let burgerBtn = document.querySelector(".burger-menu-btn");

// Selecting the actual menu that will be toggled on and off
let burgerMenu = document.querySelector(".burger-menu");

// Variable to track whether the menu is currently open or not
let isBurgerOpen = false;

// Function to close the burger menu
function closeBurgerMenu() {
    burgerMenu.style.display = "none";
    burgerBtn.style.backgroundPosition = "center, center left 50px";
    isBurgerOpen = false;
}

// Function to open the burger menu
function openBurgerMenu() {
    burgerMenu.style.display = "block";
    burgerBtn.style.backgroundPosition = "center left 50px, center";
    isBurgerOpen = true;
}

// Event listener for the click action on the hamburger menu button
burgerBtn.onclick = function() {
    if (!isBurgerOpen) {
        openBurgerMenu();
    } else {
        closeBurgerMenu();
    }
};

// Select all menu items in the burger menu
const menuItems = document.querySelectorAll('.burger-menu ul li a');

// Add click event listeners to all menu items
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section from the href attribute
        const targetId = this.getAttribute('href');
        
        // Handle home navigation
        if (targetId === '#' || targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // For other sections
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        
        // Close the burger menu after a short delay to ensure smooth transition
        setTimeout(closeBurgerMenu, 100);
    });
});

// Function to set active state for navigation items
function setActiveNav() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.burger-menu ul li a');
    let scrollPos = window.scrollY;

    // Handle home active state
    if (scrollPos < 100) { // Adjust this value based on your needs
        navItems.forEach(item => item.classList.remove('active'));
        const homeLink = Array.from(navItems).find(item => 
            item.getAttribute('href') === '#' || 
            item.getAttribute('href') === '#home'
        );
        if (homeLink) homeLink.classList.add('active');
        return;
    }

    sections.forEach((section, index) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop - 60 && scrollPos < sectionTop + sectionHeight - 60) {
            navItems[index].classList.add('active');
        } else {
            navItems[index].classList.remove('active');
        }
    });
}

// Throttle function to limit calls to setActiveNav on scroll
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Throttle the scroll event listener for performance
window.addEventListener('scroll', throttle(setActiveNav, 100));

// Call setActiveNav initially to set correct active state when the page loads
setActiveNav();

// Close burger menu when clicking outside
document.addEventListener('click', function(e) {
    if (isBurgerOpen && 
        !burgerMenu.contains(e.target) && 
        !burgerBtn.contains(e.target)) {
        closeBurgerMenu();
    }
});

// Handle mobile devices orientation change
window.addEventListener('orientationchange', function() {
    if (isBurgerOpen) {
        closeBurgerMenu();
    }
});