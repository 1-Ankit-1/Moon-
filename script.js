const searchInput = document.getElementById("book-search");
const categorySelect = document.getElementById("category-select");
const selectedOptionElem = categorySelect.querySelector(".selected-option");
const dropdownOptions = categorySelect.querySelector(".dropdown-options");

let selectedCategory = "all";

categorySelect.addEventListener("click", function(e) {
  categorySelect.classList.toggle("active");
});

dropdownOptions.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("dropdown-option")) {
    selectedCategory = e.target.getAttribute("data-value");
    selectedOptionElem.textContent = e.target.textContent;
    categorySelect.classList.remove("active");
    filterBooks();
  }
});

document.addEventListener("click", function(e) {
  if (!categorySelect.contains(e.target)) {
    categorySelect.classList.remove("active");
  }
});

function searchBooks() {
  const query = searchInput.value.toLowerCase();
  const bookCards = document.querySelectorAll(".book-card");

  bookCards.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    const author = card.getAttribute("data-author").toLowerCase();
    card.dataset.matchSearch = (title.includes(query) || author.includes(query)) ? "true" : "false";
  });
}

function filterByCategory() {
  const bookCards = document.querySelectorAll(".book-card");

  bookCards.forEach(card => {
    const category = card.getAttribute("data-category").toLowerCase();
    card.dataset.matchCategory = (selectedCategory === "all" || category === selectedCategory) ? "true" : "false";
  });
}

function applyFilters() {
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach(card => {
    if (card.dataset.matchSearch === "true" && card.dataset.matchCategory === "true") {
      card.style.display = "inline-block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterBooks() {
  searchBooks();
  filterByCategory();
  applyFilters();
}

searchInput.addEventListener("input", filterBooks);

const bookCards = document.querySelectorAll(".book-card");
bookCards.forEach(card => {
  card.addEventListener("click", () => {
    const downloadLink = card.querySelector(".download-link").getAttribute("href");
    window.open(downloadLink, "_blank");
  });
});

const progressBtn = document.getElementById("progress-btn");
if (progressBtn) {
  progressBtn.addEventListener("click", () => {
    window.location.href = "reading.html";
  });
}

