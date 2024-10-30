document.addEventListener("DOMContentLoaded", function () {
    const dropdownItems = document.querySelectorAll('#filter-section #cs-expanded .cs-li');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.cs-li-link');
        const dropdown = item.querySelector('.cs-drop-ul');

        if (dropdown) {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigation if it has a link
                dropdown.style.display = dropdown.style.display === 'none' || !dropdown.style.display ? 'block' : 'none';
            });
        }
    });
});
