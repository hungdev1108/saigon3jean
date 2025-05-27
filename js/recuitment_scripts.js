const jobs = [
  {
    id: 1,
    title: "Sales Stylist - Stage",
    posted: "Posted 7 Days Ago",
    jobType: "Full-time",
    location: "LFO VALMONTONE OUTLET, Valmontone, Italy",
    description:
      "As a Sales Stylist, you'll represent our brand and ensure high-quality customer service. Prior experience in retail is a plus.",
    requirements: [
      "Prior experience in retail or customer service",
      "Excellent communication skills",
      "Passion for fashion and styling",
      "Ability to work in a fast-paced environment",
    ],
    benefits: [
      "Competitive salary package",
      "Employee discount on products",
      "Career development opportunities",
      "Health insurance coverage",
    ],
  },
  {
    id: 2,
    title: "Marketing Intern",
    posted: "Posted 3 Days Ago",
    jobType: "Internship",
    location: "Saigon 3 Jeans HQ, Ho Chi Minh City, Vietnam",
    description:
      "Join our marketing team to support social media campaigns and promotional events. Great opportunity for students!",
    requirements: [
      "Currently pursuing Marketing or related degree",
      "Social media savvy",
      "Creative thinking and content creation skills",
      "Basic knowledge of Adobe Creative Suite",
    ],
    benefits: [
      "Hands-on experience in fashion marketing",
      "Mentorship from industry professionals",
      "Flexible working hours",
      "Certificate of completion",
    ],
  },
  {
    id: 3,
    title: "Quality Control Supervisor",
    posted: "Posted 1 Day Ago",
    jobType: "Full-time",
    location: "Factory No.2, Binh Duong, Vietnam",
    description:
      "Supervise the product quality at various production stages. Requires attention to detail and textile knowledge.",
    requirements: [
      "5+ years experience in quality control",
      "Knowledge of textile manufacturing processes",
      "Strong attention to detail",
      "Leadership and team management skills",
    ],
    benefits: [
      "Competitive salary and bonuses",
      "Transportation allowance",
      "Professional development training",
      "Annual performance bonus",
    ],
  },
  {
    id: 4,
    title: "Logistics Coordinator",
    posted: "Posted 10 Days Ago",
    jobType: "Full-time",
    location: "Warehouse Center, Long An, Vietnam",
    description:
      "Coordinate logistics and supply chain operations. Experience with inventory software is preferred.",
    requirements: [
      "Bachelor's degree in Logistics or related field",
      "Experience with inventory management systems",
      "Strong organizational skills",
      "Proficiency in Excel and logistics software",
    ],
    benefits: [
      "Competitive salary package",
      "Health and dental insurance",
      "Annual leave and sick leave",
      "Professional development opportunities",
    ],
  },
  {
    id: 5,
    title: "HR Executive",
    posted: "Posted Today",
    jobType: "Full-time",
    location: "Saigon 3 Jeans HQ, Ho Chi Minh City, Vietnam",
    description:
      "Handle recruitment, employee engagement, and HR policies. Strong communication skills required.",
    requirements: [
      "Bachelor's degree in HR or related field",
      "3+ years experience in HR operations",
      "Excellent interpersonal skills",
      "Knowledge of labor laws and regulations",
    ],
    benefits: [
      "Attractive salary and benefits",
      "Professional development opportunities",
      "Modern working environment",
      "Performance-based bonuses",
    ],
  },
  {
    id: 6,
    title: "Production Manager",
    posted: "Posted 2 Days Ago",
    jobType: "Full-time",
    location: "Main Factory, Binh Duong, Vietnam",
    description:
      "Lead production teams and ensure manufacturing targets are met while maintaining quality standards.",
    requirements: [
      "Bachelor's degree in Engineering or Manufacturing",
      "7+ years experience in production management",
      "Strong leadership and problem-solving skills",
      "Knowledge of lean manufacturing principles",
    ],
    benefits: [
      "Executive salary package",
      "Company car and driver",
      "Annual performance bonus",
      "Leadership development programs",
    ],
  },
];

const jobListContainer = document.getElementById("jobListContainer");
const companyInfo = document.getElementById("companyInfo");
const jobDetails = document.getElementById("jobDetails");
const paginationControls = document.getElementById("paginationControls");
const paginationInfo = document.getElementById("paginationInfo");

// Application Modal Elements
const applicationModal = new bootstrap.Modal(
  document.getElementById("applicationModal")
);
const cvUploadArea = document.getElementById("cvUploadArea");
const cvFileInput = document.getElementById("cvFileInput");
const chooseFileBtn = document.getElementById("chooseFileBtn");
const fileInfo = document.getElementById("fileInfo");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const removeFileBtn = document.getElementById("removeFileBtn");
const uploadContent = cvUploadArea.querySelector(".upload-content");
const applicationForm = document.getElementById("applicationForm");

// Current job being applied for
let currentJob = null;

// Pagination settings
const jobsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(jobs.length / jobsPerPage);

// Render job list
function renderJobList(page = 1) {
  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const pageJobs = jobs.slice(startIndex, endIndex);

  jobListContainer.innerHTML = "";

  pageJobs.forEach((job) => {
    const jobItem = document.createElement("div");
    jobItem.className = "job-item";
    jobItem.setAttribute("data-job-id", job.id);

    jobItem.innerHTML = `
      <h5>${job.title}</h5>
      <div class="job-meta">
        <span><i class="fas fa-clock me-1"></i>${job.posted}</span>
        <span><i class="fas fa-briefcase me-1"></i>${job.jobType}</span>
      </div>
      <div class="job-location">
        <i class="fas fa-map-marker-alt me-1"></i>${job.location}
      </div>
    `;

    jobItem.addEventListener("click", () => showJobDetails(job));
    jobListContainer.appendChild(jobItem);
  });

  // Update pagination info
  const startItem = startIndex + 1;
  const endItem = Math.min(endIndex, jobs.length);
  paginationInfo.textContent = `${startItem} - ${endItem} of ${jobs.length} jobs`;
}

// Render pagination
function renderPagination() {
  paginationControls.innerHTML = "";

  // Previous button
  const prevItem = document.createElement("li");
  prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Previous">
      <i class="fas fa-chevron-left"></i>
    </a>
  `;
  if (currentPage > 1) {
    prevItem.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage--;
      renderJobList(currentPage);
      renderPagination();
    });
  }
  paginationControls.appendChild(prevItem);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;

    pageItem.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderJobList(currentPage);
      renderPagination();
    });

    paginationControls.appendChild(pageItem);
  }

  // Next button
  const nextItem = document.createElement("li");
  nextItem.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Next">
      <i class="fas fa-chevron-right"></i>
    </a>
  `;
  if (currentPage < totalPages) {
    nextItem.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage++;
      renderJobList(currentPage);
      renderPagination();
    });
  }
  paginationControls.appendChild(nextItem);
}

// Setup file upload
function setupFileUpload() {
  // Choose file button click
  chooseFileBtn.addEventListener("click", () => {
    cvFileInput.click();
  });

  // File input change
  cvFileInput.addEventListener("change", handleFileSelect);

  // Remove file button click
  removeFileBtn.addEventListener("click", removeFile);

  // Drag and drop functionality
  cvUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    cvUploadArea.classList.add("dragover");
  });

  cvUploadArea.addEventListener("dragleave", () => {
    cvUploadArea.classList.remove("dragover");
  });

  cvUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    cvUploadArea.classList.remove("dragover");

    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // Form submission
  applicationForm.addEventListener("submit", handleApplicationSubmit);

  // Adjust modal height on mobile devices
  const applicationModal = document.getElementById("applicationModal");
  if (applicationModal) {
    applicationModal.addEventListener("show.bs.modal", adjustModalForMobile);
    window.addEventListener("resize", () => {
      if (applicationModal.classList.contains("show")) {
        adjustModalForMobile();
      }
    });
  }
}

// Adjust modal for better mobile experience
function adjustModalForMobile() {
  const isMobile = window.innerWidth < 768;
  const modalDialog = document.querySelector("#applicationModal .modal-dialog");
  const modalContent = document.querySelector(
    "#applicationModal .modal-content"
  );

  if (isMobile) {
    // On mobile, make sure the modal is properly sized
    modalDialog.style.margin = "0.5rem";
    modalDialog.style.maxWidth = "calc(100% - 1rem)";
    modalContent.style.maxHeight = `${window.innerHeight - 20}px`;

    // Scroll to top of form when opened on mobile
    setTimeout(() => {
      const modalBody = document.querySelector("#applicationModal .modal-body");
      if (modalBody) modalBody.scrollTop = 0;
    }, 300);
  } else {
    // Reset styles on desktop
    modalDialog.style.margin = "";
    modalDialog.style.maxWidth = "";
    modalContent.style.maxHeight = "";
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
}

function handleFile(file) {
  // Validate file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(file.type)) {
    alert("Please upload a PDF, DOC, or DOCX file.");
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB.");
    return;
  }

  // Display file info
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);

  // Update file icon based on type
  const fileIcon = fileInfo.querySelector(".file-icon");
  if (file.type === "application/pdf") {
    fileIcon.className = "fas fa-file-pdf file-icon";
    fileIcon.style.color = "#dc3545";
  } else {
    fileIcon.className = "fas fa-file-word file-icon";
    fileIcon.style.color = "#2b579a";
  }

  // Show file info, hide upload content
  uploadContent.style.display = "none";
  fileInfo.style.display = "block";
}

function removeFile() {
  cvFileInput.value = "";
  uploadContent.style.display = "block";
  fileInfo.style.display = "none";
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Show job details
function showJobDetails(job) {
  // Hide company info, show job details
  companyInfo.style.display = "none";
  jobDetails.style.display = "block";

  // Store current job for application
  currentJob = job;

  // Populate job details
  document.getElementById("jobTitle").textContent = job.title;
  document.getElementById("jobType").textContent = job.jobType;
  document.getElementById("jobPosted").textContent = job.posted;
  document.getElementById("jobLocation").textContent = job.location;
  document.getElementById(
    "jobDescription"
  ).innerHTML = `<p>${job.description}</p>`;

  // Populate requirements
  const requirementsList = document.getElementById("jobRequirements");
  requirementsList.innerHTML = "";
  job.requirements.forEach((req) => {
    const li = document.createElement("li");
    li.textContent = req;
    requirementsList.appendChild(li);
  });

  // Populate benefits
  const benefitsList = document.getElementById("jobBenefits");
  benefitsList.innerHTML = "";
  job.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });

  // Scroll to job details on mobile
  if (window.innerWidth <= 768) {
    jobDetails.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Show job application modal
function showApplicationModal(job) {
  currentJob = job;

  // Update job info in modal
  document.getElementById("jobTitleDisplay").textContent = job.title;
  document.getElementById("jobLocationDisplay").textContent = job.location;

  // Clear form fields
  applicationForm.reset();
  removeFile();

  // Show modal
  const modalElement = document.getElementById("applicationModal");
  const modal =
    bootstrap.Modal.getInstance(modalElement) ||
    new bootstrap.Modal(modalElement);
  modal.show();

  // Focus on first input field after modal is shown
  modalElement.addEventListener(
    "shown.bs.modal",
    function () {
      document.getElementById("fullName").focus();
    },
    { once: true }
  );
}

// Handle form submission
function handleApplicationSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(applicationForm);

  // Validate form
  let isValid = true;
  const requiredFields = ["fullName", "email", "phone"];

  requiredFields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      isValid = false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });

  // Check if CV is uploaded
  const hasFile = fileInfo.style.display === "block";
  if (!hasFile) {
    cvUploadArea.classList.add("border-danger");
    isValid = false;
  } else {
    cvUploadArea.classList.remove("border-danger");
  }

  if (!isValid) {
    // Show validation message
    const modalBody = document.querySelector("#applicationModal .modal-body");

    // Check if validation message already exists
    let validationMessage = document.getElementById("validation-message");
    if (!validationMessage) {
      validationMessage = document.createElement("div");
      validationMessage.id = "validation-message";
      validationMessage.className = "alert alert-danger mt-3";
      validationMessage.innerHTML =
        '<i class="fas fa-exclamation-triangle me-2"></i>Please fill in all required fields and upload your CV.';
      modalBody.insertBefore(validationMessage, modalBody.firstChild);
    }

    // Scroll to top to show validation message on mobile
    modalBody.scrollTop = 0;
    return;
  }

  // Remove validation message if exists
  const validationMessage = document.getElementById("validation-message");
  if (validationMessage) {
    validationMessage.remove();
  }

  // Simulate form submission
  const submitBtn = document.getElementById("submitApplicationBtn");
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

  // Simulate API call with timeout
  setTimeout(() => {
    // Hide modal
    const modalElement = document.getElementById("applicationModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Show success message
    showAlert(
      "Application submitted successfully! We will contact you soon.",
      "success"
    );

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 1500);
}

// Show alert message
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  alertDiv.style.zIndex = "9999";
  alertDiv.style.maxWidth = "90%";
  alertDiv.style.width = "500px";

  alertDiv.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check-circle" : "exclamation-circle"
    } me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(alertDiv);

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.classList.remove("show");
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// Back to job list
function showCompanyInfo() {
  companyInfo.style.display = "block";
  jobDetails.style.display = "none";

  // Scroll to job list on mobile
  if (window.innerWidth <= 768) {
    companyInfo.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Initial render
  renderJobList(1);
  renderPagination();

  // Setup file upload
  setupFileUpload();

  // Back to list button
  document
    .getElementById("backToList")
    .addEventListener("click", showCompanyInfo);

  // Apply button - show modal instead of alert
  document.getElementById("applyBtn").addEventListener("click", function () {
    if (currentJob) {
      showApplicationModal(currentJob);
    }
  });

  // Smooth scroll for page sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  document.querySelectorAll(".benefit-card, .process-step").forEach((el) => {
    observer.observe(el);
  });
});
