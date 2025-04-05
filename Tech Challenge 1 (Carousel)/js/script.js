document.addEventListener('DOMContentLoaded', function() {
    // Declare variables for carousel elements
    const slides = document.querySelectorAll('.carousel__slide'); // Select all slides in the carousel
    const dots = document.querySelectorAll('.carousel__dot'); // Select all dots in the carousel
    const prevButton = document.querySelector('.carousel__button--prev'); // Select prev button
    const nextButton = document.querySelector('.carousel__button--next'); // Select next button
    
    let currentSlide = 0; // Save the current active slide
    const totalSlides = slides.length; // Save the number of slide in the carousel
    let isAnimating = false; // Make sure animation wont overlap
    
    // Calculate height for carousel wrapper
    function setHeight() {
        const activeSlide = document.querySelector('.carousel__slide--active');
        if (activeSlide) {
            const height = activeSlide.offsetHeight; // Take the height of the active carousel slide
            document.querySelector('.carousel__wrapper').style.minHeight = `${height}px`; // Make it the minimum height of the wrapper
        }
    }
    
    function showSlide(index) {
        if (isAnimating) return; // If animation is still running, do not change slide yet
        isAnimating = true; // Otherwise, animation on
        
        slides[currentSlide].classList.remove('carousel__slide--active'); // Remove active modification from current slide
        dots[currentSlide].classList.remove('carousel__dot--active'); // Remove active modification from current dot
        
        slides[index].classList.add('carousel__slide--active'); // Add active modification to slide index
        dots[index].classList.add('carousel__dot--active'); // Add active modification to dot index
        
        // Update current slide number as index
        currentSlide = index;
        
        // Wait for animation to finish
        setTimeout(function() {
            isAnimating = false;
            setHeight();
        }, 600);
    }

    // Set height when page loads
    setHeight();
    
    // Event listeners for buttons
    nextButton.addEventListener('click', function() {
        const next = (currentSlide + 1) % totalSlides; // Count next slide number
        showSlide(next); // Show next slide
    });

    prevButton.addEventListener('click', function() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides; // Count prev slide number (no negatives)
        showSlide(prev); // Show previous slide
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() { // When a dot is clicked
            if (index !== currentSlide) { // If the slide index is not current slide,
                showSlide(index); // Show slide index as current slide
            }
        });
    });
    
    // Update carousel wrapper height when resizing window
    window.addEventListener('resize', setHeight);
});