import { Product } from "./models.js";
import stock from "../data/stock.json" with {type: 'json'}

const app = document.querySelector('.products__container');

if (app) {
    stock['pullovers'].map(item => {
        const product = new Product({
            code: item['code'],
            name: item['name'],
            color: item['color'],
            size: item['size'],
            price: item['price']
        });

        const productElement = product.render();
        app.appendChild(productElement);
    });
} else {
    console.error("El contenedor '.products__container' no existe en el DOM.");
}