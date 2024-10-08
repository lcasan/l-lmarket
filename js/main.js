import { addProductsToHTML } from "./utils.js";
import JSON from "../data/stock.json" with {type: 'json'}
let cart = [];

const initApp = () => {
    // Add products:
    addProductsToHTML(JSON, 'pullovers');

    // Get data cart from memory
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
}

initApp()