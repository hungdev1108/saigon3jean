// Đợi cho trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Thêm hiệu ứng cho menu khi cuộn
  const header = document.querySelector("header");
  const scrollWatcher = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", scrollWatcher);

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
    ".card, .section-title, .news-item"
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
        navbarCollapse.classList.contains("show")
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
});
