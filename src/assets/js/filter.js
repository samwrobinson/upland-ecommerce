document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortAscButton = document.getElementById('sort-asc');
    const sortDescButton = document.getElementById('sort-desc');
    const resetButton = document.getElementById('reset-filters');
    const productItems = Array.from(document.querySelectorAll('.cs-item'));
    

    // Function to filter products by price range
    function filterProducts(minPrice, maxPrice) {
        productItems.forEach(item => {
            const productPrice = parseFloat(item.dataset.price);
            if (productPrice >= minPrice && (maxPrice === undefined || productPrice <= maxPrice)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Function to sort products
    function sortProducts(order) {
        const sortedItems = [...productItems].sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Clear the current product list and append sorted items
        productList.innerHTML = '';
        sortedItems.forEach(item => productList.appendChild(item));
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const minPrice = parseInt(button.dataset.min, 10);
            const maxPrice = button.dataset.max ? parseInt(button.dataset.max, 10) : undefined;
            filterProducts(minPrice, maxPrice);
        });
    });

    // Event listeners for sort buttons
    sortAscButton.addEventListener('click', () => sortProducts('asc'));
    sortDescButton.addEventListener('click', () => sortProducts('desc'));

    // Reset button to show all products
    resetButton.addEventListener('click', () => {
        productItems.forEach(item => {
            item.style.display = 'block';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("price-filter-toggle");
    const priceFilters = document.getElementById("price-filter-buttons");

    toggleButton.addEventListener("click", function () {
        // Toggle the visibility of the price filter buttons
        if (priceFilters.style.display === "none") {
            priceFilters.style.display = "flex";
        } else {
            priceFilters.style.display = "none";
        }
    });
});