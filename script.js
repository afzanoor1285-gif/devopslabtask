/* =========================
   VARIABLES
========================= */

let cart = [];

const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================
   CATEGORY FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        products.forEach(product => {

            const category = product.dataset.category;

            if (filter === "all" || category === filter) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* =========================
   CATEGORY CARDS
========================= */

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        const filterButton = document.querySelector(
            `.filter[data-filter="${category}"]`
        );

        if (filterButton) {

            filterButton.click();

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});


/* =========================
   HEART / FAVORITE
========================= */

document.querySelectorAll(".heart").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            button.innerHTML = "♥";

        } else {

            button.innerHTML = "♡";

        }

    });

});


/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.product;

        const productCard = button.closest(".product-card");

        const price = productCard
            .querySelector(".product-bottom strong")
            .textContent;

        const numericPrice = parseFloat(
            price.replace("$", "")
        );


        cart.push({
            name: productName,
            price: numericPrice
        });


        updateCart();

        showCartMessage(productName);

    });

});


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;


        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <p>${item.name}</p>

                <small>
                    $${item.price}
                </small>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ×
            </button>

        `;

        cartItems.appendChild(div);

    });


    cartTotal.textContent = "$" + total.toFixed(2);


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cart.splice(index, 1);

            updateCart();

        });

    });

}


/* =========================
   CART OPEN / CLOSE
========================= */

document.getElementById("cartBtn")
    .addEventListener("click", () => {

        cartPopup.classList.add("active");

    });


document.getElementById("closeCart")
    .addEventListener("click", () => {

        cartPopup.classList.remove("active");

    });


cartPopup.addEventListener("click", (event) => {

    if (event.target === cartPopup) {

        cartPopup.classList.remove("active");

    }

});


/* =========================
   CART MESSAGE
========================= */

function showCartMessage(productName) {

    const oldText = document.title;

    document.title = `${productName} added ✓`;

    setTimeout(() => {

        document.title = oldText;

    }, 1500);

}


/* =========================
   SEARCH
========================= */

document.getElementById("searchBtn")
    .addEventListener("click", () => {

        searchOverlay.classList.add("active");

        setTimeout(() => {

            searchInput.focus();

        }, 200);

    });


document.getElementById("closeSearch")
    .addEventListener("click", () => {

        searchOverlay.classList.remove("active");

        searchInput.value = "";

        searchResults.innerHTML = "";

    });


searchOverlay.addEventListener("click", (event) => {

    if (event.target === searchOverlay) {

        searchOverlay.classList.remove("active");

    }

});


/* =========================
   SEARCH PRODUCTS
========================= */

searchInput.addEventListener("input", () => {

    const query = searchInput.value
        .toLowerCase()
        .trim();


    searchResults.innerHTML = "";


    if (!query) {

        return;

    }


    const matchingProducts = Array.from(products)
        .filter(product => {

            const name = product
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const category = product.dataset.category
                .toLowerCase();

            return (
                name.includes(query) ||
                category.includes(query)
            );

        });


    if (matchingProducts.length === 0) {

        searchResults.innerHTML = `
            <p style="padding-top:25px;color:#777;">
                No products found.
            </p>
        `;

        return;

    }


    matchingProducts.forEach(product => {

        const name = product
            .querySelector("h3")
            .textContent;

        const price = product
            .querySelector(".product-bottom strong")
            .textContent;


        const result = document.createElement("div");

        result.className = "search-result";

        result.innerHTML = `

            <span>${name}</span>

            <strong>${price}</strong>

        `;


        searchResults.appendChild(result);

    });

});


/* =========================
   NEWSLETTER
========================= */

document.getElementById("newsletterForm")
    .addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        alert(
            `Thank you! ${email} has been subscribed.`
        );

        document.getElementById("email").value = "";

    });


/* =========================
   CHECKOUT
========================= */

document.querySelector(".checkout-btn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        alert(
            "Checkout functionality can be connected to Stripe or another payment gateway."
        );

    });