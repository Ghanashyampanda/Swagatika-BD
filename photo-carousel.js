// Photo Carousel for Birthday Celebration
document.addEventListener('DOMContentLoaded', function() {
  // Get all carousel elements
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Function to ensure images are loaded
  function ensureImagesLoaded() {
    const images = document.querySelectorAll('.birthday-photo');
    let allLoaded = true;
    
    images.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        allLoaded = false;
        // Force image reload if not displaying
        const src = img.src;
        img.src = '';
        setTimeout(() => {
          img.src = src;
        }, 100);
      }
    });
    
    return allLoaded;
  }
  
  // Function to update carousel position
  function updateCarousel(index) {
    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Update carousel position
    carouselContainer.style.transform = `translateX(-${index * 25}%)`;
  }
  
  // Initialize carousel
  let currentSlide = 0;
  let autoSlideInterval;
  
  // Start auto-sliding
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel(currentSlide);
    }, 5000); // Change slide every 5 seconds
  }
  
  // Stop auto-sliding
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel(currentSlide);
      stopAutoSlide();
      startAutoSlide();
    });
  });
  
  // Add touch events for mobile swipe
  if (isMobile) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoSlide();
    }, { passive: true });
    
    carouselContainer.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', () => {
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
        if (swipeDistance > 0 && currentSlide > 0) {
          // Swipe right - go to previous slide
          currentSlide--;
        } else if (swipeDistance < 0 && currentSlide < slides.length - 1) {
          // Swipe left - go to next slide
          currentSlide++;
        }
        
        updateCarousel(currentSlide);
      }
      
      startAutoSlide();
    });
  }
  
  // Check if images are loaded and start carousel
  function initCarousel() {
    if (ensureImagesLoaded()) {
      updateCarousel(currentSlide);
      startAutoSlide();
    } else {
      // If images aren't loaded yet, try again in a moment
      setTimeout(initCarousel, 500);
    }
  }
  
  // Start the carousel
  initCarousel();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    updateCarousel(currentSlide);
  });
}); 