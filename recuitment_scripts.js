const jobs = [
  {
    id: 1,
    title: "Sales Stylist - Stage",
    posted: "Posted 7 Days Ago",
    jobType: "Full-time",
    location: "LFO VALMONTONE OUTLET, Valmontone, Italy",
    description:
      "As a Sales Stylist, you'll represent our brand and ensure high-quality customer service. Prior experience in retail is a plus.",
  },
  {
    id: 2,
    title: "Marketing Intern",
    posted: "Posted 3 Days Ago",
    jobType: "Full-time",
    location: "Saigon 3 Jeans HQ, Ho Chi Minh City, Vietnam",
    description:
      "Join our marketing team to support social media campaigns and promotional events. Great opportunity for students!",
  },
  {
    id: 3,
    title: "Quality Control Supervisor",
    posted: "Posted 1 Day Ago",
    jobType: "Full-time",
    location: "Factory No.2, Binh Duong, Vietnam",
    description:
      "Supervise the product quality at various production stages. Requires attention to detail and textile knowledge.",
  },
  {
    id: 4,
    title: "Logistics Coordinator",
    posted: "Posted 10 Days Ago",
    jobType: "Full-time",
    location: "Warehouse Center, Long An, Vietnam",
    description:
      "Coordinate logistics and supply chain operations. Experience with inventory software is preferred.",
  },
  {
    id: 5,
    title: "HR Executive",
    posted: "Posted Today",
    jobType: "Full-time",
    location: "Saigon 3 Jeans HQ, Ho Chi Minh City, Vietnam",
    description:
      "Handle recruitment, employee engagement, and HR policies. Strong communication skills required.",
  },
];

const jobList = document.querySelector(".job-list");
const pagination = document.querySelector(".pagination");
const aboutCompany = document.querySelector(".about-company");
const jobDetails = document.querySelector(".job-details");

// Xóa job-item ban đầu (trống)
const oldItem = document.querySelector(".job-item");
if (oldItem) oldItem.remove();

// Thêm job trước phần .pagination
jobs.forEach((job) => {
  const item = document.createElement("div");
  item.classList.add("job-item");
  item.setAttribute("data-title", job.title);
  item.setAttribute("data-posted", job.posted);
  item.setAttribute("data-location", job.location);
  item.setAttribute("data-detail", job.description);
  item.setAttribute("data-jobType", job.jobType);

  item.innerHTML = `
        <a href="#" class="job-link">
        <h3>${job.title}</h3>
        <p><span class="icon"><i class="fas fa-history"></i></span> ${job.posted}</p>
        <p>${job.location}</p>
        </a>
    `;

  // Add the job item before the pagination element
  jobList.insertBefore(item, pagination);
});

const paginationContainer = document.getElementById("paginationStep");
const totalPages = jobs.length % 3;
let currentPage = 1;

const renderPagination = () => {
  // Xóa các số cũ (chỉ giữ lại mũi tên)
  [...paginationContainer.querySelectorAll("span")].forEach((el) =>
    el.remove()
  );

  for (let i = 1; i <= totalPages; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    if (i === currentPage) span.classList.add("active");
    span.addEventListener("click", () => {
      currentPage = i;
      renderPagination();
    });
    paginationContainer.insertBefore(span, document.getElementById("nextBtn"));
  }
};

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPagination();
  }
});

renderPagination(); // khởi tạo ban đầu

const jobItems = document.querySelectorAll(".job-item");

// Iterate over each job item and add a click event listener
jobItems.forEach((item) => {
  const jobLink = item.querySelector(".job-link");

  jobLink.addEventListener("click", function (e) {
    e.preventDefault(); // Prevents default link behavior (if any)

    // Hide the about-company section
    aboutCompany.style.display = "none";

    // Show the job-details section
    jobDetails.style.display = "flex";

    // Populate job details
    const jobTitle = item.getAttribute("data-title");
    const jobPosted = item.getAttribute("data-posted");
    const jobLocation = item.getAttribute("data-location");
    const jobDescription = item.getAttribute("data-detail");
    const jobType = item.getAttribute("data-jobType");

    // Update job details section with selected job's data
    jobDetails.innerHTML = `
        <div class="job-header">
            <h3>${jobTitle}</h3>
            <button type="submit" class="submit-btn">Apply</button>
        </div>
        <div class="job-content">
            <div class="job-info">
            <div class="info-item">
                <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info-text">
                ${jobLocation}
                </div>
            </div>
            <div class="info-item">
                <div class="info-icon">
                <i class="fas fa-history"></i>
                </div>
                <div class="info-text">
                ${jobPosted}
                </div>
            </div>
            <div class="info-item">
                <div class="info-icon">
                <i class="fas fa-briefcase"></i>
                </div>
                <div class="info-text">
                ${jobType}
                </div>
            </div>
            </div>
            <div class="job-description">
            <strong>JOB DESCRIPTION</strong>
            <p>
                ${jobDescription}
            </p>
            </div>
        </div>
        `;
  });
});