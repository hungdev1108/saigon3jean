document.addEventListener("DOMContentLoaded", function () {
  // Sample data for machines in different stages
  const machineData = {
    // Stage 1 machines are already in HTML
    "stage-2": [
      {
        id: "lazer",
        name: "LAZER MACHINE",
        image: "../images/machinery-page/lazer_machine.png",
        description:
          "Lazer machine with advanced technology, helping to optimize production processes and ensure the highest quality of products.",
      },
      {
        id: "wash",
        name: "WASH MACHINE",
        image: "../images/machinery-page/wash_machine.png",
        description:
          "Advanced wash system with efficient denim fabric processing, saving water and energy in production processes.",
      },
      {
        id: "dry",
        name: "DRY MACHINE",
        image: "../images/machinery-page/wash_machine.png",
        description:
          "Industrial drying machine with quick and uniform drying capabilities, saving time and energy in production processes.",
      },
    ],
    "stage-3": [
      {
        id: "lazer",
        name: "LAZER MACHINE",
        image: "../images/machinery-page/lazer_machine.png",
        description:
          "High-power lazer machine with high precision and detail processing capabilities, suitable for complex designs.",
      },
      {
        id: "wash",
        name: "WASH MACHINE",
        image: "../images/machinery-page/wash_machine.png",
        description:
          "Industrial wash machine with filtration and water reuse systems, reducing environmental impact in production processes.",
      },
    ],
    "stage-4": [
      {
        id: "lazer",
        name: "LAZER MACHINE",
        image: "../images/machinery-page/lazer_machine.png",
        description:
          "Newest lazer machine with AI integration, automating processes and optimizing production efficiency.",
      },
      {
        id: "wash",
        name: "WASH MACHINE",
        image: "../images/machinery-page/wash_machine.png",
        description:
          "Fully automatic wash system with batch processing capabilities, ensuring efficiency and uniform quality.",
      },
      {
        id: "cutting",
        name: "CUTTING MACHINE",
        image: "../images/machinery-page/lazer_machine.png",
        description:
          "High-precision automatic cutting machine, optimizing material usage and increasing production efficiency.",
      },
    ],
  };

  // Populate stage machines with tabs
  function populateStageMachines() {
    for (let stage = 2; stage <= 4; stage++) {
      const stageData = machineData[`stage-${stage}`];

      if (stageData) {
        // Get tab and content containers
        const tabsContainer = document.querySelector(
          `#stage${stage}MachineTabs`
        );
        const contentContainer = document.querySelector(
          `#stage${stage}MachineContent`
        );

        if (tabsContainer && contentContainer) {
          // Clear existing content
          tabsContainer.innerHTML = "";
          contentContainer.innerHTML = "";

          // Create tabs and content for each machine
          stageData.forEach((machine, index) => {
            // Create tab
            const tabItem = document.createElement("li");
            tabItem.className = "nav-item";
            tabItem.setAttribute("role", "presentation");

            const tabButton = document.createElement("button");
            tabButton.className = index === 0 ? "nav-link active" : "nav-link";
            tabButton.id = `${machine.id}-tab-stage${stage}`;
            tabButton.setAttribute("data-bs-toggle", "tab");
            tabButton.setAttribute(
              "data-bs-target",
              `#${machine.id}-content-stage${stage}`
            );
            tabButton.setAttribute("type", "button");
            tabButton.setAttribute("role", "tab");
            tabButton.setAttribute(
              "aria-controls",
              `${machine.id}-content-stage${stage}`
            );
            tabButton.setAttribute(
              "aria-selected",
              index === 0 ? "true" : "false"
            );
            tabButton.textContent = machine.name;

            tabItem.appendChild(tabButton);
            tabsContainer.appendChild(tabItem);

            // Create content
            const contentPane = document.createElement("div");
            contentPane.className =
              index === 0 ? "tab-pane fade show active" : "tab-pane fade";
            contentPane.id = `${machine.id}-content-stage${stage}`;
            contentPane.setAttribute("role", "tabpanel");
            contentPane.setAttribute(
              "aria-labelledby",
              `${machine.id}-tab-stage${stage}`
            );

            const machineItem = document.createElement("div");
            machineItem.className = "machine-item";

            const imageContainer = document.createElement("div");
            imageContainer.className = "machine-image-container";

            const image = document.createElement("img");
            image.src = machine.image;
            image.alt = machine.name;
            image.className = "img-fluid";

            const overlay = document.createElement("div");
            overlay.className = "machine-overlay";

            const description = document.createElement("div");
            description.className = "machine-description";

            const title = document.createElement("h5");
            title.textContent = "DESCRIPTION";

            const text = document.createElement("p");
            text.textContent = machine.description;

            description.appendChild(title);
            description.appendChild(text);
            overlay.appendChild(description);
            imageContainer.appendChild(image);
            imageContainer.appendChild(overlay);
            machineItem.appendChild(imageContainer);
            contentPane.appendChild(machineItem);
            contentContainer.appendChild(contentPane);
          });
        }
      }
    }
  }

  // Handle stage selection
  function handleStageSelection() {
    const stageItems = document.querySelectorAll(".stage-item");
    const machineWrappers = document.querySelectorAll(".machines-wrapper");

    stageItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all stage items
        stageItems.forEach((stageItem) => {
          stageItem.classList.remove("active");
        });

        // Add active class to clicked stage item
        this.classList.add("active");

        // Get selected stage
        const selectedStage = this.getAttribute("data-stage");

        // Hide all machine wrappers
        machineWrappers.forEach((wrapper) => {
          wrapper.classList.remove("active");
        });

        // Show selected stage machines
        const selectedMachines = document.querySelector(
          `.stage-${selectedStage}-machines`
        );
        if (selectedMachines) {
          selectedMachines.classList.add("active");
        }
      });
    });
  }

  // Handle machine overlay visibility
  function handleMachineOverlay() {
    const machineItems = document.querySelectorAll(".machine-item");

    machineItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Toggle overlay visibility
        const overlay = this.querySelector(".machine-overlay");
        if (overlay) {
          if (overlay.style.opacity === "1") {
            overlay.style.opacity = "0";
          } else {
            overlay.style.opacity = "1";
          }
        }
      });
    });

    // Also add event listeners for dynamically created machine items
    document.addEventListener("click", function (e) {
      if (e.target.closest(".machine-item")) {
        const machineItem = e.target.closest(".machine-item");
        const overlay = machineItem.querySelector(".machine-overlay");
        if (overlay) {
          if (overlay.style.opacity === "1") {
            overlay.style.opacity = "0";
          } else {
            overlay.style.opacity = "1";
          }
        }
      }
    });
  }

  // Initialize
  populateStageMachines();
  handleStageSelection();
  handleMachineOverlay();
});
