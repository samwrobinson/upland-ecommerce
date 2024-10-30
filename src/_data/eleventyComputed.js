// Gets the number from a Shopify ID
// gid://shopify/Product/8843402314018 => 8843402314018
function getIdNumber(id) {
    const idLastSlash = id.lastIndexOf("/");
    return id.slice(idLastSlash + 1);
}

module.exports = {
    shopProducts: (data) => {
        // Function to format price with two decimal places and currency symbol
        function formatPrice(price) {
            if (price === "0.0") return null;
            const fixedPrice = Number(price).toFixed(2);
            return data.shopify.shop.moneyFormat.replace("{{amount}}", fixedPrice);
        }

        // Function to get a simple price or 'From $price' if there are variant price differences
        function getSimplePrice(priceRange) {
            const formattedMinPrice = formatPrice(priceRange?.minVariantPrice?.amount);
            if (!formattedMinPrice) return null;
            return priceRange.minVariantPrice.amount === priceRange.maxVariantPrice.amount
                ? formattedMinPrice
                : `From ${formattedMinPrice}`;
        }

        return data.shopify.products.map((product) => {
            // Extract images from edges if available
            const newImages = product.images?.edges?.map(image => image.node) || [];

            // Format prices for display
            const price = getSimplePrice(product.priceRange);
            product.priceRange.minVariantPrice.price = formatPrice(product.priceRange?.minVariantPrice?.amount);
            product.priceRange.maxVariantPrice.price = formatPrice(product.priceRange?.maxVariantPrice?.amount);

            // Format compare at prices
            const compareAtPrice = getSimplePrice(product.compareAtPriceRange);
            product.compareAtPriceRange.minVariantPrice.price = formatPrice(product.compareAtPriceRange?.minVariantPrice?.amount);
            product.compareAtPriceRange.maxVariantPrice.price = formatPrice(product.compareAtPriceRange?.maxVariantPrice?.amount);

            // Map collections and calculate discount percentage if applicable
            const newCollections = product.collections?.edges?.map(collection => ({
                ...collection.node,
                idNumber: getIdNumber(collection.node.id)
            })) || [];
            
            const wasPrice = Number(product.compareAtPriceRange?.minVariantPrice?.amount) || 0;
            const discountedPrice = Number(product.priceRange?.minVariantPrice?.amount) || 0;
            const saleAmount = wasPrice !== discountedPrice && wasPrice !== 0
                ? (((wasPrice - discountedPrice) / wasPrice) * 100).toFixed(0)
                : null;

            // Determine availability based on inventory
            const isAvailableForSale = product.inventoryLevel > 0; // Check total inventory

            return {
                title: product.title,
                id: product.id,
                idNumber: getIdNumber(product.id),
                handle: product.handle,
                description: product.description,
                descriptionHtml: product.descriptionHtml,
                collections: newCollections,
                images: newImages,
                tags: product.tags,
                compareAtPriceRange: product.compareAtPriceRange,
                compareAtPrice,
                priceRange: product.priceRange,
                price,
                saleAmount,
                availableForSale: isAvailableForSale // Set based on inventory
            };
        });
    },

    shopCollections: (data) => {
        return data.shopify.collections.map((collection) => {
            const collectionProducts = collection.products?.edges?.map(product => ({
                id: getIdNumber(product.node.id),
                idLink: product.node.id
            })) || [];

            return {
                id: collection.id,
                idNumber: getIdNumber(collection.id),
                title: collection.title,
                handle: collection.handle,
                description: collection.description,
                descriptionHtml: collection.descriptionHtml,
                image: collection.image,
                products: collectionProducts
            };
        });
    },
};
