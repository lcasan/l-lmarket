export class Product {
    constructor({code, name, color, size, price}) {
        this.code = code; // gtin-8
        this.name = name;
        this.color = color;        
        this.price = price;
        this.size = size;
    }

    render(){
        const productHTML = document.createElement('div');
        productHTML.className = 'product';

        productHTML.innerHTML = `
            <img src="../assets/img/products/P${this.code}.png" alt="Product image" class="product__img">
            <a 
                href="#" 
                class="action__btn cart__btn" 
                aria-label="Añadir al carrito" >
                <img src="assets/add-shopping-cart.svg" class="cart__img">
            </a>
            <div class="product__content">
                <span>${this.name}</span>
                <span class="product__price">$${this.price}</span>
            </div>
        `;
        return productHTML;
    }
}