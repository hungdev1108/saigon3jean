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

// File upload functionality
function setupFileUpload() {
  // Choose file button click
  chooseFileBtn.addEventListener("click", () => {
    cvFileInput.click();
  });

  // File input change
  cvFileInput.addEventListener("change", handleFileSelect);

  // Drag and drop events
  cvUploadArea.addEventListener("click", () => {
    if (!fileInfo.style.display || fileInfo.style.display === "none") {
      cvFileInput.click();
    }
  });

  cvUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    cvUploadArea.classList.add("dragover");
  });

  cvUploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    cvUploadArea.classList.remove("dragover");
  });

  cvUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    cvUploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });

  // Remove file button
  removeFileBtn.addEventListener("click", () => {
    removeFile();
  });
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

// Show application modal
function showApplicationModal(job) {
  currentJob = job;

  // Update modal with job info
  document.getElementById("jobTitleDisplay").textContent = job.title;
  document.getElementById("jobLocationDisplay").textContent = job.location;

  // Reset form
  applicationForm.reset();
  removeFile();

  // Show modal
  applicationModal.show();
}

// Handle form submission
function handleApplicationSubmit(e) {
  e.preventDefault();

  // Validate required fields
  const requiredFields = ["fullName", "email", "phone"];
  let isValid = true;

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.classList.add("is-invalid");
      isValid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  // Check if CV is uploaded
  if (!cvFileInput.files.length) {
    alert("Please upload your CV/Resume.");
    return;
  }

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Disable submit button
  const submitBtn = document.getElementById("submitApplicationBtn");
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-1"></i>SUBMITTING...';

  // Simulate form submission
  setTimeout(() => {
    alert(
      `Thank you for applying for ${currentJob.title}! We will review your application and contact you soon.`
    );
    applicationModal.hide();

    // Reset submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 2000);
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

  // Application form submission
  applicationForm.addEventListener("submit", handleApplicationSubmit);

  // Add validation styling on input
  const formInputs = applicationForm.querySelectorAll(
    "input[required], textarea[required]"
  );
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
      }
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid") && this.value.trim()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      }
    });
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
