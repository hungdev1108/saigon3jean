// Function to load HTML includes
function loadHTML() {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Reinitialize mobile drawer after header is loaded
      if (
        window.SG3MobileDrawer &&
        typeof window.SG3MobileDrawer.reinit === "function"
      ) {
        setTimeout(() => {
          window.SG3MobileDrawer.reinit();
        }, 100);
      }
    })
    .catch((error) => console.error("Error loading header:", error));

  // Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
}

// Load includes when DOM is ready
document.addEventListener("DOMContentLoaded", loadHTML);
