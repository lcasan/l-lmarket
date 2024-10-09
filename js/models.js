export class Product {
    constructor({ code, name, color, size, price, amount = 0 }) {
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

        productHTML.innerHTML = `
            <img src="assets/img/products/P${this.code}.png" alt="Imagen de producto" class="product__img">
            <a href="#" class="action__btn cart__btn" aria-label="Add to cart">
                <img src="assets/add-shopping-cart.svg" class="cart__img">
            </a>
            <div class="product__content">
                <span>${this.name}</span>
                <span class="product__price">$${this.price}</span>
            </div>
        `;

        const cartBtn = productHTML.querySelector('.cart__btn');
        cartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            table.addToCart({
                code: this.code,
                name: this.name,
                color: this.color,
                size: this.size,
                price: this.price
            });
        });

        return productHTML;
    }
}

export class Cart {
    constructor() {
        this.products = [];
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
                <td><input type="number" value="${product.quantity}" class="quantity" data-code="${product.code}" /></td>
                <td><span class="subtotal">$${product.price * product.quantity}</span></td>
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
        const existingProduct = this.products.find(product => product.code === code);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            this.products.push({ code, name, color, size, price, quantity: 1 });
        }

        this.saveToLocalStorage();
        this.render();
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    loadFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                this.products = JSON.parse(storedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }
}
