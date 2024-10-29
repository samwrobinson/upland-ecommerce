document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortAscButton = document.getElementById('sort-asc');
    const sortDescButton = document.getElementById('sort-desc');
    const resetButton = document.getElementById('reset-filters');
    const stockFilterButtons = document.querySelectorAll('.stock-filter-button');
    const productItems = Array.from(document.querySelectorAll('.cs-item'));

    // Track active filters
    let activePriceRange = { min: null, max: null };
    let activeStockStatus = null;

    // Function to apply both stock and price filters
    function applyFilters() {
        productItems.forEach(item => {
            const productPrice = parseFloat(item.dataset.price);
            const productStock = item.dataset.stock;
            const inPriceRange = (activePriceRange.min === null || productPrice >= activePriceRange.min) &&
                                 (activePriceRange.max === null || productPrice <= activePriceRange.max);
            const inStockStatus = activeStockStatus === null || productStock === activeStockStatus;

            item.style.display = inPriceRange && inStockStatus ? 'block' : 'none';
        });
    }

    // Function to filter by stock
    function setStockFilter(stockStatus) {
        activeStockStatus = stockStatus;
        applyFilters();
    }

    // Function to filter by price
    function setPriceFilter(minPrice, maxPrice) {
        activePriceRange = { min: minPrice, max: maxPrice };
        applyFilters();
    }

    // Event listeners for stock filter buttons
    stockFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stockStatus = button.dataset.stock;
            setStockFilter(stockStatus);
        });
    });

    // Event listeners for price filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const minPrice = parseInt(button.dataset.min, 10);
            const maxPrice = button.dataset.max ? parseInt(button.dataset.max, 10) : null;
            setPriceFilter(minPrice, maxPrice);
        });
    });

    // Function to sort products
    function sortProducts(order) {
        // Filter out items that are currently hidden
        const visibleItems = productItems.filter(item => item.style.display !== 'none');

        // Sort the visible items by price
        const sortedItems = visibleItems.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Clear the current product list and append sorted items
        productList.innerHTML = '';
        sortedItems.forEach(item => productList.appendChild(item));
    }

    // Event listeners for sort buttons
    sortAscButton.addEventListener('click', () => sortProducts('asc'));
    sortDescButton.addEventListener('click', () => sortProducts('desc'));

    // Reset button to show all products
    resetButton.addEventListener('click', () => {
        activePriceRange = { min: null, max: null };
        activeStockStatus = null;
        productItems.forEach(item => {
            item.style.display = 'block';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("price-filter-toggle");
    const priceFilters = document.getElementById("price-filter-buttons");
    const stockButton = document.getElementById("stock-filter-toggle");
    const stockFilters = document.getElementById("stock-filter-buttons");

    toggleButton.addEventListener("click", function () {
        priceFilters.style.display = priceFilters.style.display === "none" ? "flex" : "none";
    });

    stockButton.addEventListener("click", function () {
        stockFilters.style.display = stockFilters.style.display === "none" ? "flex" : "none";
    });
});
