import { addProductsToHTML, addCartToHTML } from "./utils.js";
import { Cart } from "./models.js";

let products = {};
let table = new Cart();

// Fetch data from JSON: Init the app
fetch('data/stock.json')
    .then(response => response.json())
    .then(data => {
        // Stock's products
        products = data;
        
        // Initialize cart from localStorage
        table.loadFromLocalStorage();
    
        // Update cart to HTML
        table.updateTopCart();

        // Add products to HTML
        addProductsToHTML(products, 'pullovers', table);
    })
    .catch(error => console.error('Error loading JSON file:', error));
