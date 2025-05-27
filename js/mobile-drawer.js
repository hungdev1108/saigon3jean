/**
 * SG3 Mobile Drawer Menu
 * Independent mobile drawer solution - không ảnh hưởng code hiện tại
 */

(function () {
  "use strict";

  // Namespace để tránh conflict
  window.SG3MobileDrawer = window.SG3MobileDrawer || {};

  // Private variables
  let isInitialized = false;
  let drawer = null;
  let overlay = null;
  let toggler = null;
  let closeBtn = null;
  let isOpen = false;
  let touchStartX = 0;
  let touchEndX = 0;
  let scrollPosition = 0;
  let existingDrawer = null;
  let existingOverlay = null;

  // Configuration
  const CONFIG = {
    drawerSelector: ".sg3-mobile-drawer",
    overlaySelector: ".sg3-mobile-drawer-overlay",
    togglerSelector: ".sg3-custom-toggler",
    closeSelector: ".sg3-drawer-close",
    activeClass: "sg3-active",
    bodyLockClass: "sg3-drawer-open",
    breakpoint: 992,
    swipeThreshold: 100,
    animationDuration: 400,
  };

  /**
   * Xóa drawer cũ nếu đã tồn tại
   */
  function cleanupExistingDrawer() {
    // Xóa drawer cũ
    existingDrawer = document.querySelector(CONFIG.drawerSelector);
    existingOverlay = document.querySelector(CONFIG.overlaySelector);

    if (existingDrawer) {
      existingDrawer.parentNode.removeChild(existingDrawer);
    }

    if (existingOverlay) {
      existingOverlay.parentNode.removeChild(existingOverlay);
    }

    // Xóa toggler cũ
    const existingCustomToggler = document.querySelector(
      CONFIG.togglerSelector
    );
    if (existingCustomToggler) {
      existingCustomToggler.parentNode.removeChild(existingCustomToggler);
    }
  }

  // Private Methods

  /**
   * Create drawer HTML structure
   */
  function createDrawerHTML() {
    // Get navigation items from existing navbar
    const existingNavItems = document.querySelectorAll(
      ".navbar-nav .nav-item .nav-link"
    );
    console.log("Tìm thấy nav items:", existingNavItems.length);

    let navItemsHTML = "";

    existingNavItems.forEach((link, index) => {
      const href = link.getAttribute("href") || "#";
      const text = link.textContent.trim();
      const icon = getIconForNavItem(text);

      navItemsHTML += `
                <li class="sg3-drawer-nav-item">
                    <a href="${href}" class="sg3-drawer-nav-link">
                        <i class="sg3-drawer-nav-icon ${icon}"></i>
                        ${text}
                    </a>
                </li>
            `;
    });

    // Nếu không tìm thấy menu items, thêm mặc định
    if (existingNavItems.length === 0) {
      navItemsHTML = `
        <li class="sg3-drawer-nav-item">
            <a href="index.html" class="sg3-drawer-nav-link">
                <i class="sg3-drawer-nav-icon fas fa-home"></i>
                Trang chủ
            </a>
        </li>
        <li class="sg3-drawer-nav-item">
            <a href="contact.html" class="sg3-drawer-nav-link">
                <i class="sg3-drawer-nav-icon fas fa-envelope"></i>
                Liên hệ
            </a>
        </li>
      `;
    }

    const drawerHTML = `
            <!-- Mobile Drawer Overlay -->
            <div class="sg3-mobile-drawer-overlay"></div>
            
            <!-- Mobile Drawer -->
            <div class="sg3-mobile-drawer">
                <!-- Drawer Header -->
                <div class="sg3-drawer-header">
                    <button class="sg3-drawer-close" aria-label="Close menu">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- Drawer Navigation -->
                <nav class="sg3-drawer-nav">
                    <ul class="sg3-drawer-nav-list">
                        ${navItemsHTML}
                    </ul>
                </nav>
                
                <!-- Drawer Footer -->
                <div class="sg3-drawer-footer">
                    <div class="sg3-drawer-social">
                        <a href="#" class="sg3-drawer-social-link" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="sg3-drawer-social-link" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="sg3-drawer-social-link" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="sg3-drawer-social-link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p class="sg3-drawer-copyright">© 2025 Saigon 3 Jean. All rights reserved.</p>
                </div>
            </div>
        `;

    return drawerHTML;
  }

  /**
   * Get appropriate icon for navigation item
   */
  function getIconForNavItem(text) {
    const iconMap = {
      "WHO WE ARE": "fas fa-users",
      TECHNOLOGY: "fas fa-cogs",
      SUSTAINABILITY: "fas fa-leaf",
      CONTACT: "fas fa-envelope",
      RECRUITMENT: "fas fa-briefcase",
      FACILITIES: "fas fa-building",
      "TRANG CHỦ": "fas fa-home",
      "LIÊN HỆ": "fas fa-envelope",
    };

    return iconMap[text.toUpperCase()] || "fas fa-circle";
  }

  /**
   * Replace existing navbar toggler with custom one
   */
  function replaceToggler() {
    const existingToggler = document.querySelector(".navbar-toggler");
    console.log("Tìm thấy navbar-toggler:", existingToggler ? "Có" : "Không");

    if (!existingToggler) {
      // Nếu không tìm thấy, tạo toggler mới và thêm vào header
      console.log("Tạo toggler mới vì không tìm thấy navbar-toggler");
      const header = document.querySelector("header");
      const navbar = document.querySelector(".navbar");
      const targetElement = navbar || header || document.body;

      const customToggler = document.createElement("button");
      customToggler.className = "sg3-custom-toggler fixed-position";
      customToggler.setAttribute("type", "button");
      customToggler.setAttribute("aria-label", "Toggle navigation");
      customToggler.setAttribute("aria-expanded", "false");

      // Sử dụng icon Font Awesome thay vì hamburger tự tạo
      customToggler.innerHTML = `<i class="fa-solid fa-bars"></i>`;

      if (navbar) {
        navbar.appendChild(customToggler);
      } else if (header) {
        header.appendChild(customToggler);
      } else {
        document.body.appendChild(customToggler);
      }

      return customToggler;
    }

    // Create custom toggler
    const customToggler = document.createElement("button");
    customToggler.className = "sg3-custom-toggler";
    customToggler.setAttribute("type", "button");
    customToggler.setAttribute("aria-label", "Toggle navigation");
    customToggler.setAttribute("aria-expanded", "false");

    // Sử dụng icon Font Awesome thay vì hamburger tự tạo
    customToggler.innerHTML = `<i class="fa-solid fa-bars"></i>`;

    // Replace existing toggler
    existingToggler.parentNode.replaceChild(customToggler, existingToggler);

    return customToggler;
  }

  /**
   * Initialize DOM elements
   */
  function initElements() {
    try {
      // Dọn dẹp drawer cũ nếu có
      cleanupExistingDrawer();

      // Create and inject drawer HTML
      const drawerContainer = document.createElement("div");
      drawerContainer.innerHTML = createDrawerHTML();
      document.body.appendChild(drawerContainer);

      // Replace toggler
      toggler = replaceToggler();
      console.log("Toggler được tạo:", toggler ? "Thành công" : "Thất bại");

      // Get references
      drawer = document.querySelector(CONFIG.drawerSelector);
      overlay = document.querySelector(CONFIG.overlaySelector);
      closeBtn = document.querySelector(CONFIG.closeSelector);

      console.log("Kiểm tra các phần tử cần thiết:");
      console.log("- Drawer:", drawer ? "Tìm thấy" : "Không tìm thấy");
      console.log("- Overlay:", overlay ? "Tìm thấy" : "Không tìm thấy");
      console.log("- Toggler:", toggler ? "Tìm thấy" : "Không tìm thấy");
      console.log("- CloseBtn:", closeBtn ? "Tìm thấy" : "Không tìm thấy");

      if (!drawer || !overlay || !toggler || !closeBtn) {
        console.error("SG3MobileDrawer: Required elements not found");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi khởi tạo mobile drawer:", error);
      return false;
    }
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Unbind existing events first
    if (toggler) {
      toggler.removeEventListener("click", handleToggle);
      toggler.addEventListener("click", handleToggle);
    }

    if (closeBtn) {
      closeBtn.removeEventListener("click", closeDrawer);
      closeBtn.addEventListener("click", closeDrawer);
    }

    if (overlay) {
      overlay.removeEventListener("click", closeDrawer);
      overlay.addEventListener("click", closeDrawer);
    }

    // Navigation links click
    if (drawer) {
      const navLinks = drawer.querySelectorAll(".sg3-drawer-nav-link");
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavLinkClick);
        link.addEventListener("click", handleNavLinkClick);
      });

      // Touch events for swipe
      drawer.removeEventListener("touchstart", handleTouchStart);
      drawer.removeEventListener("touchend", handleTouchEnd);
      drawer.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      drawer.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    // Escape key
    document.removeEventListener("keydown", handleKeydown);
    document.addEventListener("keydown", handleKeydown);

    // Window resize
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    // Prevent body scroll when drawer is open
    document.removeEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
  }

  /**
   * Handle toggle button click
   */
  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  /**
   * Handle navigation link click
   */
  function handleNavLinkClick(e) {
    // Add active class to clicked link
    const navLinks = drawer.querySelectorAll(".sg3-drawer-nav-link");
    navLinks.forEach((link) => link.classList.remove(CONFIG.activeClass));
    e.currentTarget.classList.add(CONFIG.activeClass);

    // Close drawer after a short delay
    setTimeout(() => {
      closeDrawer();
    }, 200);
  }

  /**
   * Handle keyboard events
   */
  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) {
      closeDrawer();
    }
  }

  /**
   * Handle touch start
   */
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  /**
   * Handle touch end
   */
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  /**
   * Process swipe gesture
   */
  function handleSwipe() {
    // Calculate swipe direction
    const swipeDistance = touchStartX - touchEndX;

    // Swipe left to close drawer (for RTL drawer on right side)
    if (swipeDistance < -CONFIG.swipeThreshold && isOpen) {
      closeDrawer();
    }
  }

  /**
   * Prevent body scroll when drawer is open
   */
  function handleTouchMove(e) {
    if (!isOpen) return;

    // Check if touching inside drawer
    if (!drawer.contains(e.target) && !toggler.contains(e.target)) {
      e.preventDefault();
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    // Auto close drawer on larger screens
    if (window.innerWidth >= CONFIG.breakpoint && isOpen) {
      closeDrawer();
    }
  }

  /**
   * Open drawer
   */
  function openDrawer() {
    if (isOpen || !drawer || !overlay || !toggler) return;

    // Store current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Open drawer
    drawer.classList.add(CONFIG.activeClass);
    overlay.classList.add(CONFIG.activeClass);
    toggler.classList.add(CONFIG.activeClass);
    toggler.setAttribute("aria-expanded", "true");

    // Thay đổi icon từ bars sang times khi mở drawer
    const togglerIcon = toggler.querySelector("i");
    if (togglerIcon) {
      togglerIcon.className = "fa-solid fa-times";
    }

    // Lock body scroll
    document.body.classList.add(CONFIG.bodyLockClass);
    document.body.style.top = `-${scrollPosition}px`;

    // Set state
    isOpen = true;

    // Set active nav item
    setActiveNavItem();

    // Focus on close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, CONFIG.animationDuration);
  }

  /**
   * Close drawer
   */
  function closeDrawer() {
    if (!isOpen || !drawer || !overlay || !toggler) return;

    // Close drawer
    drawer.classList.remove(CONFIG.activeClass);
    overlay.classList.remove(CONFIG.activeClass);
    toggler.classList.remove(CONFIG.activeClass);
    toggler.setAttribute("aria-expanded", "false");

    // Thay đổi icon từ times về bars khi đóng drawer
    const togglerIcon = toggler.querySelector("i");
    if (togglerIcon) {
      togglerIcon.className = "fa-solid fa-bars";
    }

    // Unlock body scroll
    document.body.classList.remove(CONFIG.bodyLockClass);
    document.body.style.top = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";

    // Restore scroll position
    window.scrollTo(0, scrollPosition);

    // Reset state
    isOpen = false;

    // Focus back to toggler for accessibility
    setTimeout(() => {
      if (toggler) toggler.focus();
    }, CONFIG.animationDuration);
  }

  /**
   * Set active navigation item based on current URL
   */
  function setActiveNavItem() {
    if (!drawer) return;

    const currentPath = window.location.pathname;
    const navLinks = drawer.querySelectorAll(".sg3-drawer-nav-link");

    navLinks.forEach((link) => {
      link.classList.remove(CONFIG.activeClass);
      const href = link.getAttribute("href") || "";

      if (
        href === currentPath ||
        (currentPath.includes(href) && href !== "/" && href !== "#")
      ) {
        link.classList.add(CONFIG.activeClass);
      }

      // For homepage
      if (
        (currentPath === "/" || currentPath.endsWith("index.html")) &&
        (href === "index.html" || href === "/" || href === "#")
      ) {
        link.classList.add(CONFIG.activeClass);
      }
    });
  }

  /**
   * Khởi tạo lại mobile drawer
   * Public method để sử dụng sau khi header được tải
   */
  function reinitializeDrawer() {
    console.log("Đang khởi tạo lại mobile drawer");

    // Cleanup first
    if (isOpen) {
      closeDrawer();
    }

    isInitialized = false;
    drawer = null;
    overlay = null;
    toggler = null;
    closeBtn = null;

    // Reinitialize
    init();
  }

  /**
   * Initialize the drawer
   */
  function init() {
    if (isInitialized) return;

    console.log("Bắt đầu khởi tạo mobile drawer");

    // Initialize elements
    if (!initElements()) {
      console.log("Không thể khởi tạo mobile drawer - thiếu phần tử cần thiết");
      return;
    }

    // Bind events
    bindEvents();

    // Set initialized flag
    isInitialized = true;
    console.log("Mobile drawer đã được khởi tạo thành công");

    // Expose public methods
    window.SG3MobileDrawer.open = openDrawer;
    window.SG3MobileDrawer.close = closeDrawer;
    window.SG3MobileDrawer.reinit = reinitializeDrawer;
  }

  // Initialize on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Khởi tạo lại sau khi tất cả các tài nguyên được tải
  window.addEventListener("load", function () {
    setTimeout(reinitializeDrawer, 500);
  });
})();
