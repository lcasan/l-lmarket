export class Product {
    constructor({code, name, color, size, price, amount = 0}) {
        this.code = code; // gtin-8
        this.name = name;
        this.color = color;        
        this.price = price;
        this.size = size;
        this.amout = amount;
    }

    render(){
        const productHTML = document.createElement('div');
        productHTML.className = 'product';

        productHTML.innerHTML = `
            <img src="assets/img/products/P${this.code}.png" alt="Product image" class="product__img">
            <a 
                href="#" 
                class="action__btn cart__btn" 
                aria-label="Añadir al carrito" 
                >
                <img src="assets/add-shopping-cart.svg" class="cart__img">
            </a>
            <div class="product__content">
                <span>${this.name}</span>
                <span class="product__price">$${this.price}</span>
            </div>
        `;
        
        productHTML.addEventListener('click', (event) => {
            event.preventDefault();
            this.amout += 1;
            const cartBtn = productHTML.querySelector('.cart__btn');
            cartBtn.setAttribute('aria-label', `+${this.amout}`);
        });
        return productHTML;
    }
}