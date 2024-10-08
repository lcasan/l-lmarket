import { Product } from "./models.js";

export const addProductsToHTML = (JSON, productType) => {
    const container = document.querySelector('.products__container');

    if(container) {
        JSON[productType].map(item => {
            const product = new Product({
                // Att for pullovers 
                code: item['code'],
                name: item['name'],
                color: item['color'],
                size: item['size'],
                price: item['price']
            });
    
            const productElement = product.render();
            container.appendChild(productElement);
        });
    }
}

const addCartToHTML = () => {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
