document.addEventListener("DOMContentLoaded", function() {
    const filterIcon = document.getElementById("filter-icon");
    const filterDropdown = document.getElementById("filter-dropdown");

    filterIcon.addEventListener("click", function() {
        filterDropdown.classList.toggle("open");
    });
});