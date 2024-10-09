import { addProductsToHTML, addCartToHTML } from "./utils.js";
import { Cart } from "./models.js";

let products = {};
let cart = [];
let table = new Cart();

// Fetch data from JSON and initialize the app
fetch('../data/stock.json')
    .then(response => response.json())
    .then(data => {
        products = data;

        // Initialize cart from localStorage
        if (localStorage.getItem('cart')) {
            try {
                table.loadFromLocalStorage()
                addCartToHTML(table);
                
                // Add products to HTML
                addProductsToHTML(products, 'pullovers', table);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    })
    .catch(error => console.error('Error loading JSON file:', error));
