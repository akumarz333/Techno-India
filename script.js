const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Laptop",
        category: "electronics",
        price: 54999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },

    {
        id: 4,
        name: "Men's T-Shirt",
        category: "clothing",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
        id: 5,
        name: "Denim Jacket",
        category: "clothing",
        price: 1999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    },

    {
        id: 6,
        name: "Running Shoes",
        category: "shoes",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 7,
        name: "Sports Shoes",
        category: "shoes",
        price: 3499,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
    },

    {
        id: 8,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    }

];


let cart = [];


/* Display Products */

function displayProducts(productList) {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";


    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


/* Add Product to Cart */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCartCount();

    alert(product.name + " added to cart!");

}


/* Update Cart Count */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById("cart-count")
        .textContent = count;

}


/* Open Cart */

function openCart() {

    document.getElementById("cart-modal")
        .style.display = "block";


    displayCart();

}


/* Close Cart */

function closeCart() {

    document.getElementById("cart-modal")
        .style.display = "none";

}


/* Display Cart */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById("cart-total")
            .textContent = "0";

        return;

    }


    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                ₹${item.price.toLocaleString("en-IN")}

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(
                        ${item.id},
                        -1
                    )"
                >
                    -
                </button>

                ${item.quantity}

                <button
                    onclick="changeQuantity(
                        ${item.id},
                        1
                    )"
                >
                    +
                </button>

            </div>

        `;


        container.appendChild(cartItem);

    });


    document.getElementById("cart-total")
        .textContent =
        total.toLocaleString("en-IN");

}


/* Change Quantity */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    updateCartCount();

    displayCart();

}


/* Search Products */

function searchProducts() {

    const search =
        document.getElementById("search")
            .value
            .toLowerCase();


    const filtered =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );


    displayProducts(filtered);

}


/* Category Filter */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;

    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);

}


/* Checkout */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for shopping with TechnoShop!"
    );


    cart = [];

    updateCartCount();

    closeCart();

}


/* Scroll to Products */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Initial Load */

displayProducts(products);
