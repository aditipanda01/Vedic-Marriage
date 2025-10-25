gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const iconWrappers = document.querySelectorAll('.s2-icon-wrapper');
const iconsSelector = document.querySelectorAll('.s2-arc-icon');
const imagesSelector = document.querySelectorAll('.s2-section-reveal-anm');
const radius = 350;
const totalIcons = iconsSelector.length;

// Initialize images
gsap.set(imagesSelector, { opacity: 0 });
gsap.set(imagesSelector[0], { opacity: 1 });
// Set initial opacity for all icons
gsap.set(iconsSelector, { opacity: 0 });

gsap.set(iconsSelector[0], { opacity: 1, scale: 1.25 });
gsap.set(iconsSelector[1], { opacity: 0.35, scale: 0.9 });
gsap.set(iconsSelector[2], { opacity: 0.35, scale: 0.9 });

// Function to calculate s2-arc-icon positions based on progress
function setIconPositions(progress) {
    console.log(progress);
    iconWrappers.forEach((wrapper, index) => {
        const startAngledeg = -90;
        const startAngle = startAngledeg * (Math.PI / 180);
        // const arcLength = (3.14/180)*130;
        const arcLength = 1.20;
        const angle = startAngle + (index / (totalIcons - 1)) * arcLength - progress * arcLength;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(wrapper, {
            x: x,
            y: y,
            rotation: 0,
        });
    });
}

// Function to calculate target progress for centering an icon
function getTargetProgressForIndex(index) {
    return index / (totalIcons - 1);
}

// Define background colors
const bgGrads = [
    '#ffa1ad', // orange
    '#ffa1ad', // green
    '#ffa1ad', // fuchsia
    '#ffa1ad', // green
    '#ffa1ad', // amber
    '#ffa1ad', // violet
];

// Function to update visible image and s2-arc-icon opacities
let currentVisibleIndex = -1;
function updateVisibleImage(closestIndex) {

    if (closestIndex !== currentVisibleIndex) {
        currentVisibleIndex = closestIndex; // Keep track of the currently active index

        imagesSelector.forEach((section, idx) => {
            const elemGradientDiv = section.querySelector('.s2-changeBlockGradient');
            const addSpringGrowVar = section.querySelectorAll('.s2-SpringGrowAnimation');
            const addFadeVar = section.querySelectorAll('.s2-FadeAnimation');
            if (idx !== closestIndex) {
                // Reset non-active sections
                gsap.to(section, {
                    opacity: 0,
                    // y: 40, // Slide down blocks when becoming inactive
                    y: 20, // Slight movement instead of large jumps
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.to(elemGradientDiv, {
                    backgroundColor: 'transparent',
                    duration: 0.3,
                });
            } else {
                // Animate the active section with slide-up
                gsap.to(
                    section,
                    {
                        opacity: 1,
                        y: 0, // Keep the position stable for smoother transition
                        duration: 0.5, // Slightly longer duration for smooth appearance
                        ease: "power2.out",
                    });


                gsap.to(elemGradientDiv, {
                    backgroundColor: bgGrads[closestIndex],
                    duration: 0.5,
                });
                // Spring-grow animation for green bars
                gsap.fromTo(
                    addSpringGrowVar,
                    { scaleY: 0, transformOrigin: "bottom" },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        stagger: 0,
                        ease: "elastic.out(0.5, 0.3)",
                    }
                );
                // Fade animation for horizontal gray bars
                gsap.fromTo(
                    addFadeVar,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1,
                        stagger: 0,
                        ease: "power2.out",
                    }
                );
            }
        });
        // Update s2-arc-icon opacities (updated here)
        iconsSelector.forEach((icon, idx) => {
            const distance = Math.abs(idx - closestIndex);
            const isInVisibilityWindow = distance <= 2; // Show only if within 2 positions

            gsap.to(icon, {
                opacity: isInVisibilityWindow ? (idx === closestIndex ? 1 : 0.35) : 0, // Hide icons outside window
                // scale: idx === closestIndex ? 1.25 : (isInVisibilityWindow ? 0.9 : 0.5),
                scale: idx === closestIndex ? 1.25 : isInVisibilityWindow ? 0.9 : 0.7,
                duration: 0.4,
                ease: "power2.out",
                onStart: () => {
                    icon.style.pointerEvents = isInVisibilityWindow ? 'auto' : 'none';
                }
            });
        });
    }
}

// Set initial positions
setIconPositions(0);

// Create the scroll trigger animation
gsap.to({}, {
    scrollTrigger: {
        trigger: '#s2-animation-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 50, // responsiveness of block re-renders also controls the duration of snap detection
        snap: {

            // added snap here
            snapTo: (progress) => {
                // Calculate snapping points based on the number of icons
                const snapPoints = Array.from({ length: totalIcons }, (_, i) => i / (totalIcons - 1));
                return gsap.utils.snap(snapPoints, progress);
            },
            duration: 0.3, // Optional: Snap animation duration
            directional: true, // Snap in the direction of scrolling
        },

        onUpdate: (self) => {
            setIconPositions(self.progress);
            let closestIndex = -1;
            let minDistance = Infinity;
            iconsSelector.forEach((icon, index) => {
                const rect = icon.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distanceToCenter = Math.sqrt(
                    (window.innerWidth / 2 - centerX) ** 2
                    +
                    (window.innerHeight / 2 - centerY) ** 2
                );
                if (distanceToCenter < minDistance) {
                    minDistance = distanceToCenter;
                    closestIndex = index;
                }
            });
            updateVisibleImage(closestIndex);
        },
    },
});

// Initial animation for icons appearing
gsap.from(iconsSelector, {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'back.out',
});

// Add click handlers to icons
iconsSelector.forEach((icon, index) => {
    // Hover animations
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { scale: 1.1, duration: 0.3, ease: 'back.out' });
    });
    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { scale: 1, duration: 0.3, ease: 'back.out' });
    });
    // Click to center animation
    icon.addEventListener('click', () => {
        const targetProgress = getTargetProgressForIndex(index);
        const section = document.querySelector('#s2-animation-section');
        const scrollAmount = targetProgress * (section.offsetHeight - window.innerHeight);
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: scrollAmount,
                autoKill: false,
            },
            ease: 'power2.inOut',
        });
    });
});