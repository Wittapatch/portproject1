function updateProgressBar(progressBar, value) {
    progressBar.querySelector(".progress_fill").style.width = `${value}%`;
    progressBar.querySelector(".progress_text").textContent = `${value}%`;
}