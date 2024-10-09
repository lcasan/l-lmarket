import { Product } from "./models.js";

export const addProductsToHTML = (JSON, productType, table) => {
    const container = document.querySelector('.products__container');

    if (container) {
        JSON[productType].map(item => {
            const product = new Product({
                code: item['code'],
                name: item['name'],
                color: item['color'],
                size: item['size'],
                price: item['price'],
                amount: item['amount'],
            });

            const productElement = product.render(table);
            container.appendChild(productElement);
        });
    }
};

export const addCartToHTML = (table) => {
    const cartContainer = document.querySelector('.cart.section--lg.container');
    const tableElement = table.render();
    cartContainer.appendChild(tableElement);
    table.updateTopCart();
};
