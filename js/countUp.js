/**
 * CountUp Animation Script
 * Tạo hiệu ứng đếm số từ 0 đến target khi scroll vào view
 */

class CountUpAnimation {
  constructor() {
    this.hasAnimated = false;
    this.counters = [];
    this.init();
  }

  init() {
    // Đợi DOM load xong
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Tìm tất cả các phần tử cần countup
    this.findCounters();

    // Thiết lập Intersection Observer
    this.setupObserver();
  }

  findCounters() {
    // Tìm các phần tử metric-value và thiết lập counter
    const metricValues = document.querySelectorAll(".metric-value");

    metricValues.forEach((element, index) => {
      const text = element.textContent.trim();
      let target = 0;
      let unit = "";

      // Phân tích text để lấy số và đơn vị
      if (text.includes("50.000")) {
        target = 50000;
        unit = " m²";
      } else if (text.includes("240")) {
        target = 240;
        unit = "";
      } else if (text.includes("1.200.000")) {
        target = 1200000;
        unit = "";
      }

      if (target > 0) {
        // Tạo structure mới cho counter
        const counterSpan = document.createElement("span");
        counterSpan.className = "counter-number";
        counterSpan.textContent = "0";

        const unitSpan = document.createElement("span");
        unitSpan.className = "counter-unit";
        unitSpan.innerHTML = unit;

        // Thay thế nội dung
        element.innerHTML = "";
        element.appendChild(counterSpan);
        element.appendChild(unitSpan);

        // Lưu thông tin counter
        this.counters.push({
          element: counterSpan,
          target: target,
          unit: unit,
          index: index,
        });
      }
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.startAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Quan sát phần tử chứa metrics
    const keyMetrics = document.querySelector(".key-metrics");
    if (keyMetrics) {
      observer.observe(keyMetrics);
    } else {
      console.warn("Key metrics element không tìm thấy");
    }
  }

  startAnimation() {
    this.counters.forEach((counter, index) => {
      // Reset về 0 ngay trước khi bắt đầu animation
      counter.element.textContent = "0";

      // Thêm delay cho mỗi counter
      setTimeout(() => {
        this.animateCounter(counter.element, counter.target, 2500);
      }, index * 200);
    });
  }

  animateCounter(element, target, duration = 2000) {
    // Kiểm tra đầu vào
    if (!element || isNaN(target) || target < 0) {
      console.error("Invalid counter element hoặc target:", element, target);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      let currentValue = Math.floor(
        startValue + (target - startValue) * easeOut
      );

      // Đảm bảo không vượt quá target
      currentValue = Math.min(currentValue, target);

      // Cập nhật giá trị
      try {
        const formattedValue = this.formatNumber(currentValue);
        element.textContent = formattedValue;
      } catch (error) {
        console.error("Lỗi khi cập nhật counter:", error);
        element.textContent = currentValue.toString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Đảm bảo hiển thị chính xác giá trị cuối
        element.textContent = this.formatNumber(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  formatNumber(number) {
    // Kiểm tra input hợp lệ
    if (isNaN(number) || number === null || number === undefined) {
      console.warn("Số không hợp lệ:", number);
      return "0";
    }

    // Chuyển thành số nguyên dương
    const validNumber = Math.floor(Math.abs(Number(number)));

    try {
      // Sử dụng định dạng số Việt Nam (dấu chấm phân cách hàng nghìn)
      return new Intl.NumberFormat("vi-VN").format(validNumber);
    } catch (error) {
      console.error("Lỗi khi format số:", error, "số gốc:", number);
      // Fallback: format thủ công
      return this.manualFormat(validNumber);
    }
  }

  manualFormat(number) {
    // Format thủ công nếu Intl.NumberFormat bị lỗi
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Method để reset animation (có thể gọi từ bên ngoài)
  reset() {
    this.hasAnimated = false;
    this.counters.forEach((counter) => {
      counter.element.textContent = "0";
    });
  }

  // Method để trigger animation thủ công
  triggerAnimation() {
    if (!this.hasAnimated) {
      this.hasAnimated = true;
      this.startAnimation();
    }
  }
}

// Khởi tạo CountUp khi script được load
const countUpAnimation = new CountUpAnimation();

// Export cho trường hợp cần sử dụng ở file khác
if (typeof module !== "undefined" && module.exports) {
  module.exports = CountUpAnimation;
}

// Gán vào window để có thể truy cập từ console (debug)
window.CountUpAnimation = countUpAnimation;
