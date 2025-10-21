// tracker.js

document.querySelectorAll(".tracker-item").forEach(item => {
    const minusBtn = item.querySelector(".minus-btn");
    const plusBtn = item.querySelector(".plus-btn");
    const pagesReadElem = item.querySelector(".pages-read");
    const totalPagesElem = item.querySelector(".total-pages .pages-total");
    const totalPages = parseInt(totalPagesElem.textContent, 10);
    const bookId = item.getAttribute('data-book-id');
    
    // Load saved progress
    let count = parseInt(localStorage.getItem(`book_progress_${bookId}`)) || 0;
    pagesReadElem.textContent = count;
    
    function updateProgress(newCount) {
        count = newCount;
        pagesReadElem.textContent = count;
        localStorage.setItem(`book_progress_${bookId}`, count);
        
        // Update progress bar
        const progressBar = item.querySelector('.progress-bar');
        const progressPercentage = (count / totalPages) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    plusBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (count < totalPages) {
            updateProgress(count + 1);
        }
    });
    
    minusBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (count > 0) {
            updateProgress(count - 1);
        }
    });
});
