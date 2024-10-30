document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortAscButton = document.getElementById('sort-asc');
    const sortDescButton = document.getElementById('sort-desc');
    const resetButton = document.getElementById('reset-filters');
    const stockFilterButtons = document.querySelectorAll('.stock-filter-button');
    const productItems = Array.from(document.querySelectorAll('.cs-item'));

    // Track original product items order and visibility
    const originalItems = [...productItems];

    // Function to filter products by price range
    function filterProducts(minPrice, maxPrice) {
        productItems.forEach(item => {
            const productPrice = parseFloat(item.dataset.price);
            const inPriceRange = productPrice >= minPrice && (maxPrice === undefined || productPrice <= maxPrice);
            item.style.display = inPriceRange ? 'block' : 'none';
        });
    }

    // Function to filter products by stock status
    function filterByStock(stockStatus) {
        console.log(`Filtering by stock status: ${stockStatus}`);
        productItems.forEach(item => {
            const productStock = item.dataset.stock;
            const productName = item.querySelector('.cs-product').innerText;
            console.log(`Product: ${productName}, Stock: ${productStock}`);
            
            if (productStock === stockStatus) {
                item.style.display = 'block';
                console.log(`Showing: ${productName}`);
            } else {
                item.style.display = 'none';
                console.log(`Hiding: ${productName}`);
            }
        });
    }

    // Event listeners for stock filter buttons
    stockFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stockStatus = button.dataset.stock;
            filterByStock(stockStatus);
        });
    });

    // Event listeners for price filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const minPrice = parseInt(button.dataset.min, 10);
            const maxPrice = button.dataset.max ? parseInt(button.dataset.max, 10) : undefined;
            filterProducts(minPrice, maxPrice);
        });
    });

    // Function to sort products
    function sortProducts(order) {
        const visibleItems = productItems.filter(item => item.style.display !== 'none');

        const sortedItems = visibleItems.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });

        productList.innerHTML = '';
        sortedItems.forEach(item => productList.appendChild(item));
    }

    // Event listeners for sort buttons
    sortAscButton.addEventListener('click', () => sortProducts('asc'));
    sortDescButton.addEventListener('click', () => sortProducts('desc'));

    // Reset button to restore original order and visibility
    resetButton.addEventListener('click', () => {
        productList.innerHTML = '';
        originalItems.forEach(item => {
            item.style.display = 'block'; // Show all items
            productList.appendChild(item); // Append in original order
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
