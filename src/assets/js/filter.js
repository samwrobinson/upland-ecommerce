document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortAscButton = document.getElementById('sort-asc');
    const sortDescButton = document.getElementById('sort-desc');
    const resetButton = document.getElementById('reset-filters');
    const stockFilterButtons = document.querySelectorAll('.stock-filter-button');
    const productItems = Array.from(document.querySelectorAll('.cs-item'));

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
            const productStock = item.dataset.stock; // Read stock status from data attribute
            const productName = item.querySelector('.cs-product').innerText;
            console.log(`Product: ${productName}, Stock: ${productStock}`);
            
            // Check if product stock matches the desired stock status
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
        // Toggle the visibility of the price filter buttons
        if (priceFilters.style.display === "none") {
            priceFilters.style.display = "flex";
        } else {
            priceFilters.style.display = "none";
        }
    });

    stockButton.addEventListener("click", function () {
        // Toggle the visibility of the stock filter buttons
        if (stockFilters.style.display === "none") {
            stockFilters.style.display = "flex";
        } else {
            stockFilters.style.display = "none";
        }
    });
});