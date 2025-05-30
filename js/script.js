// Đợi cho trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Thêm hiệu ứng cho menu khi cuộn
  const header = document.querySelector("header");
  const scrollWatcher = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  };

  window.addEventListener("scroll", scrollWatcher);

  // Gọi scrollWatcher khi trang tải xong để thiết lập trạng thái ban đầu
  scrollWatcher();

  // Thử lại việc tìm header sau khi các components được load
  setTimeout(() => {
    const headerAfterLoad = document.querySelector("header");
    if (headerAfterLoad && !header) {
      // Nếu header được tìm thấy sau khi includes.js load xong
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          headerAfterLoad.classList.add("scrolled");
        } else {
          headerAfterLoad.classList.remove("scrolled");
        }
      });
    }
  }, 500); // Đợi 500ms để includes.js có thể load header

  // Khởi tạo các nút Scroll to Top
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-to-top";
  document.body.appendChild(scrollTopBtn);

  // Ẩn/hiện nút Scroll to Top
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Xử lý sự kiện khi nhấp vào nút Scroll to Top
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Thêm hiệu ứng cho các thẻ nav-link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Nếu là link nội bộ, thêm hiệu ứng smooth scroll
      const href = this.getAttribute("href");
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Hiệu ứng cho carousel (có thể thêm thư viện như Swiper.js hoặc tự viết)
  // Ví dụ mẫu cho các phần carousel nếu cần

  // Thêm hiệu ứng Animate on Scroll cho các phần tử
  const animateElements = document.querySelectorAll(
    ".card, .section-title, .news-item, .news-list, .contact-box, .work-with-us-box, #automation"
  );

  const checkVisible = () => {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (elementPosition.top < windowHeight * 0.9) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", checkVisible);
  checkVisible(); // Kiểm tra các phần tử hiển thị ban đầu

  // Đóng menu mobile khi chọn một liên kết
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (
        window.innerWidth < 992 &&
        navbarCollapse &&
        navbarCollapse.classList.contains("show") &&
        navbarToggler
      ) {
        navbarToggler.click();
      }
    });
  });

  // Thêm bộ đếm số cho các thông số (nếu có)
  function startCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 2000; // 2 giây
    const step = (target / duration) * 10;
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      el.textContent = Math.floor(current);
    }, 10);
  }

  // Khởi động bộ đếm khi cuộn đến phần tử
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // Thêm CSS động cho nút scroll to top
  const style = document.createElement("style");
  style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            transform: translateY(20px);
            z-index: 999;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background-color: var(--secondary-color);
        }
        
        .scrolled {
            background-color: white !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .animate {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(style);

  // Video Modal Popup
  const videoModal = document.getElementById("videoModal");
  const watchVideoBtn = document.getElementById("watchVideoBtn");
  const closeVideoModal = document.getElementById("closeVideoModal");
  const videoPlayer = document.getElementById("videoPlayer");

  // Open video modal
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (videoModal) {
        videoModal.classList.add("show");
        setTimeout(() => {
          if (videoPlayer) {
            videoPlayer.play();
          }
        }, 300);
      }
    });
  }

  // Close video modal
  if (closeVideoModal && videoModal && videoPlayer) {
    closeVideoModal.addEventListener("click", function () {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoModal.classList.remove("show");
    });
  }

  // Close modal when clicking outside
  if (videoModal && videoPlayer) {
    window.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoModal.classList.remove("show");
      }
    });
  }

  // Close modal with Escape key
  if (videoModal && videoPlayer) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("show")) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoModal.classList.remove("show");
      }
    });
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const company = formData.get("company");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Basic validation
      if (!name || !company || !email || !phone || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Get submit button
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "SENDING...";
      submitBtn.style.opacity = "0.7";

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        alert(
          `Thank you ${name}! Your message has been sent successfully. We will contact you soon.`
        );

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = "1";
      }, 2000);
    });

    // Add real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this);
        }
      });
    });

    function validateField(field) {
      const value = field.value.trim();
      const isRequired = field.hasAttribute("required");

      // Remove previous error styling
      field.classList.remove("error", "success");

      if (isRequired && !value) {
        field.classList.add("error");
        return false;
      }

      // Email validation
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          field.classList.add("error");
          return false;
        }
      }

      // Phone validation
      if (field.type === "tel" && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
          field.classList.add("error");
          return false;
        }
      }

      if (value) {
        field.classList.add("success");
      }

      return true;
    }

    // Add validation CSS
    const validationStyle = document.createElement("style");
    validationStyle.textContent = `
      #contactPage input.error,
      #contactPage textarea.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
      }
      
      #contactPage input.success,
      #contactPage textarea.success {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1) !important;
      }
      
      #contactPage .submit-btn:disabled {
        cursor: not-allowed;
        transform: none !important;
      }
    `;
    document.head.appendChild(validationStyle);
  }
  
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all carousels with auto-play
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
    new bootstrap.Carousel(carousel, {
      interval: parseInt(carousel.getAttribute('data-bs-interval')) || 3000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Accordion icon animation
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const icon = this.querySelector('.accordion-icon');
      const isCollapsed = this.classList.contains('collapsed');
      
      if (isCollapsed) {
        icon.style.transform = 'rotate(0deg)';
      } else {
        icon.style.transform = 'rotate(45deg)';
      }
    });
  });

  // Initialize first accordion icon
  const firstIcon = document.querySelector('.accordion-button:not(.collapsed) .accordion-icon');
  if (firstIcon) {
    firstIcon.style.transform = 'rotate(45deg)';
  }
});
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function() {
    const productType = this.dataset.product;
    window.location.href = `product_details.html?product=${productType}`;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Carousel auto-play code (đã có)
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
    new bootstrap.Carousel(carousel, {
      interval: parseInt(carousel.getAttribute('data-bs-interval')) || 3000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true
    });
  });

  // ===== THÊM CODE NÀY ===== 
  // Product card click handlers
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent click if clicking on carousel controls
      if (e.target.closest('.carousel-indicators') || e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
        return;
      }
      
      const productType = this.dataset.product;
      if (productType) {
        window.location.href = `product_details.html?product=${productType}`;
      }
    });
    
    // Add cursor pointer and hover effect
    card.style.cursor = 'pointer';
  });
});

// Modern Milestones Slick Carousel - Production Ready
$(document).ready(function() {
  // Check if milestones carousel exists
  if ($('.milestones-carousel').length) {
      
      // Initialize Slick Carousel with modern settings
      $('.milestones-carousel').slick({
          centerMode: true,      // No padding for exact 3 items
          centerPadding: '0px',  // Không padding để hiển thị đúng 3 item
          slidesToShow: 3,       // Show exactly 3 items
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          dots: false,           // Remove dots navigation
          infinite: true,        // Smooth transition speed
          cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Smoother easing
          speed: 700,            // Slightly slower for smoother transitions
          focusOnSelect: true,   // Click to select
          variableWidth: false,  // Đảm bảo width cố định cho mỗi item
          pauseOnHover: true,
          pauseOnFocus: true,
          waitForAnimate: true,// Wait for animation to complete before next slide
          responsive: [
              {
                  breakpoint: 992,
                  settings: {
                      slidesToShow: 3,
                      centerPadding: '0px',
                     
                  }
              },
              {
                  breakpoint: 768,
                  settings: {
                      slidesToShow: 1,
                      centerMode: true,    // Bật centerMode cho mobile
                      centerPadding: '15%',
                      arrows: false,
                      
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      centerMode: true,    // Bật centerMode cho mobile
                      centerPadding: '10%',
                      arrows: false,
                      
                  }
              }
          ]
      });

      // Click on partial visible items to navigate
      $(document).on('click', '.timeline-item', function(e) {
        var $slide = $(this).closest('.slick-slide');
        
        // Only navigate if not center slide
        if (!$slide.hasClass('slick-center')) {
            e.preventDefault();
            
            // Add transitioning class to all slides to prevent multiple clicks
            $('.milestones-carousel .slick-slide').addClass('is-transitioning');
            
            var slideIndex = $slide.data('slick-index');
            $('.milestones-carousel').slick('slickGoTo', slideIndex);
            
            // Remove transitioning class after animation completes
            setTimeout(function() {
                $('.milestones-carousel .slick-slide').removeClass('is-transitioning');
            }, 700); // Match with transition speed
        }
        
        // // Add ripple effect
        // addRippleEffect($(this), e);
      });

      // Enhanced hover effects for arrows
      $('.milestones-carousel .slick-prev, .milestones-carousel .slick-next').hover(
          function() {
              $(this).css('transform', 'scale(1.15)');
          },
          function() {
              $(this).css('transform', 'scale(1)');
          }
      );

      // Custom event handlers for better UX
      $('.milestones-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          // Add loading state or prepare next slide
          $('.timeline-item').removeClass('slide-changing');
          $('.slick-slide[data-slick-index="' + nextSlide + '"] .timeline-item').addClass('slide-changing');
          
          // Fix height during transition
          var currentHeight = $('.slick-slide[data-slick-index="' + currentSlide + '"] .timeline-item').outerHeight();
          var nextHeight = $('.slick-slide[data-slick-index="' + nextSlide + '"] .timeline-item').outerHeight();
          
          // Ensure smooth height transition
          if (currentHeight !== nextHeight) {
              $('.milestones-carousel').css('height', Math.max(currentHeight, nextHeight) + 'px');
          }
      });

      $('.milestones-carousel').on('afterChange', function(event, slick, currentSlide) {
          // Clean up after slide change
          $('.timeline-item').removeClass('slide-changing');
          $('.milestones-carousel').css('height', '');
          
          // Optional: track analytics
          console.log('Milestone slide changed to:', currentSlide);
      });

      // Keyboard navigation
      $(document).on('keydown', function(e) {
          if ($('.milestones-carousel').is(':hover') || $('.milestones-carousel').is(':focus-within')) {
              if (e.keyCode === 37) { // Left arrow
                  $('.milestones-carousel').slick('slickPrev');
                  e.preventDefault();
              } else if (e.keyCode === 39) { // Right arrow
                  $('.milestones-carousel').slick('slickNext');
                  e.preventDefault();
              }
          }
      });

      // Touch/swipe enhancements for mobile
      var touchStartX = 0;
      var touchEndX = 0;
      
      $('.milestones-carousel').on('touchstart', function(e) {
          touchStartX = e.originalEvent.touches[0].clientX;
      });
      
      $('.milestones-carousel').on('touchend', function(e) {
          touchEndX = e.originalEvent.changedTouches[0].clientX;
          handleSwipe();
      });
      
      function handleSwipe() {
          var swipeThreshold = 50;
          var diff = touchStartX - touchEndX;
          
          if (Math.abs(diff) > swipeThreshold) {
              if (diff > 0) {
                  // Swipe left - next slide
                  $('.milestones-carousel').slick('slickNext');
              } else {
                  // Swipe right - previous slide
                  $('.milestones-carousel').slick('slickPrev');
              }
          }
      }
  }

  // Ripple effect function
  // function addRippleEffect($element, event) {
  //     var ripple = $('<span class="click-ripple"></span>');
  //     var size = Math.max($element.outerWidth(), $element.outerHeight());
  //     var x = event.pageX - $element.offset().left - size / 2;
  //     var y = event.pageY - $element.offset().top - size / 2;
      
  //     ripple.css({
  //         width: size,
  //         height: size,
  //         left: x,
  //         top: y
  //     }).appendTo($element);
      
  //     // Remove ripple after animation
  //     setTimeout(function() {
  //         ripple.remove();
  //     }, 800);
  // }

  // Intersection Observer for scroll animations (optional enhancement)
  if ('IntersectionObserver' in window) {
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
                  // Start autoplay when section comes into view
                  if (entry.target.classList.contains('milestones-section')) {
                      $('.milestones-carousel').slick('slickPlay');
                  }
              } else {
                  // Pause autoplay when section is out of view
                  if (entry.target.classList.contains('milestones-section')) {
                      $('.milestones-carousel').slick('slickPause');
                  }
              }
          });
      }, observerOptions);

      // Observe the milestones section
      const milestonesSection = document.querySelector('.milestones-section');
      if (milestonesSection) {
          observer.observe(milestonesSection);
      }
  }

  // Window resize handler for better responsive behavior
  $(window).on('resize', debounce(function() {
      if ($('.milestones-carousel').hasClass('slick-initialized')) {
          $('.milestones-carousel').slick('refresh');
      }
  }, 250));

  // Debounce function for performance
  function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  }
});

// Handle timeline year styling for center slide
$('.milestones-carousel').on('afterChange', function(event, slick, currentSlide) {
  // Remove center class from all years
  $('.timeline-year').removeClass('center-year');
  
  // Add center class to current slide's year
  $('.slick-slide').eq(currentSlide).find('.timeline-year').addClass('center-year');
  
  console.log('Milestone slide changed to:', currentSlide);
});

// Initial center year on page load
setTimeout(function() {
  var currentSlide = $('.milestones-carousel').slick('slickCurrentSlide');
  $('.slick-slide').eq(currentSlide).find('.timeline-year').addClass('center-year');
}, 100);
// Trong phần xử lý click của timeline-item
$(document).on('click', '.timeline-item', function(e) {
  var $slide = $(this).closest('.slick-slide');
  
  // Xóa class center-year khỏi tất cả timeline-year
  $('.timeline-year').removeClass('center-year');
  
  // Thêm class center-year vào timeline-year của slide được click
  $slide.find('.timeline-year').addClass('center-year');
  
  // Only navigate if not center slide
  if (!$slide.hasClass('slick-center')) {
      e.preventDefault();
      var slideIndex = $slide.data('slick-index');
      $('.milestones-carousel').slick('slickGoTo', slideIndex);
  }
  
  // Add ripple effect
  // addRippleEffect($(this), e);
});