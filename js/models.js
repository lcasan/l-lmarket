export class Product {  
    constructor({ code, name, color, size, price, amount}) {
        this.code = code;
        this.name = name;
        this.color = color;
        this.size = size;
        this.price = price;
        this.amount = amount;
    }

    render(table) {
        const productHTML = document.createElement('div');
        productHTML.className = 'product';

        // product in cart 
        let ariaLabel;
        let productinCart = table.products.find(product => product.code === this.code);
        
        if(productinCart){
            ariaLabel = productinCart.amount;
        }else{
            ariaLabel = "Añadir producto"
        }
        
        productHTML.innerHTML = `
            <img src="assets/img/products/P${this.code}.png" alt="Imagen de producto" class="product__img">
            <a href="#" class="action__btn cart__btn" aria-label="${ariaLabel}">
                <img src="assets/icon/add-shopping-cart.svg" class="cart__img">
            </a>
            <div class="product__content">
                <span>${this.name}</span>
                <span class="product__price">$${this.price}</span>
            </div>
        `;

        const cartBtn = productHTML.querySelector('.cart__btn');
        cartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if(this.amount > 0){
                table.addToCart({
                    code: this.code,
                    name: this.name,
                    color: this.color,
                    size: this.size,
                    price: this.price
                });
                this.amount -= 1;
                let productinCart = table.products.find(product => product.code === this.code);
                cartBtn.setAttribute('aria-label', `+${productinCart.amount}`);
            }
        });

        return productHTML;
    }
}

export class Cart {
    constructor() {
        this.products = [];
        this.amount = 0;
        this.content = document.createElement('div');
        this.content.className = 'table__container';
    }

    render() {
        const productHTML = this.products.map(product => `
            <tr>
                <td>
                    <img src="./assets/img/products/P${product.code}.png" alt="${product.name}" class="table__img" />
                </td>
                <td>
                    <h3 class="table__title">${product.name} (${product.color}, ${product.size})</h3>
                </td>
                <td><span class="table__price">$${product.price}</span></td>
                <td><input type="number" value="${product.amount}" class="quantity" data-code="${product.code}" /></td>
                <td><span class="subtotal">$${product.price * product.amount}</span></td>
                <td><i class="fi fi-rs-trash table__trash" data-code="${product.code}"></i></td>
            </tr>
        `).join('');

        this.content.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>${productHTML}</tbody>
            </table>
            <div class="cart__actions">
                <a href="#" class="btn flex btn__md">Solicitar compra</a>
            </div>
        `;

        this.content.querySelector('.btn__md').addEventListener('click', (event) => {
            event.preventDefault();
            let msg = this.products.map(product => JSON.stringify(product)).join('\n');
            const phoneNumber = '5354725584';
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(msg)}`;
            window.location.href = whatsappURL;
        });

        return this.content;
    }

    addToCart({ code, name, color, size, price }) {
        // Increment +1 cart amount 
        this.amount += 1;

        const idx = this.products.findIndex(product => product.code === code);

        if (idx >= 0) {
            this.products[idx].amount += 1;
        } else {
            this.products.push({ code, name, color, size, price, amount: 1 });
        }

        this.saveToLocalStorage();
        this.updateTopCart();
        this.render();
    }

    updateTopCart(){
        // Cart: Top header:
        console.log(this.amount);
        console.log(typeof(this.amount));
        const countHTML = document.querySelector('.cart .count');
        countHTML.textContent = this.amount;
    }

    saveToLocalStorage() {
        this.products.forEach(
            element => {
                console.log(element);
            }
        )
        localStorage.setItem('amount', this.amount);
        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    loadFromLocalStorage() {
        const storedAmount = localStorage.getItem('amount');
        const storedCart = localStorage.getItem('cart');

        this.amount = storedAmount? parseInt(storedAmount) : 0;
        console.log(storedCart);
        if(this.amount > 0){ this.products = JSON.parse(storedCart)}; 
    }
}