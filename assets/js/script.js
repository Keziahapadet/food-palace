'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});

'use strict';

/**
 * Filter food items
 */
const filterButtons = document.querySelectorAll('.filter-btn');
const foodItems = document.querySelectorAll('.food-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');

    // Remove 'active' class from all buttons and add to the clicked button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter food items
    foodItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category').toLowerCase() === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/**
 * Order button functionality
 */
// const orderButtons = document.querySelectorAll('.food-menu-btn');

// orderButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const foodItem = button.closest('.food-menu-card');
//     const foodName = foodItem.querySelector('.card-title').innerText;
//     alert(`You have ordered: ${foodName}`);
//   });
// });

/**
 * Add to Cart Functionality
 */
let cart = [];

/**
 * Function to Add an Item to the Cart (Updated for Alert)
 */
function addToCart(name, price, image) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity++;
    alert(`${name} quantity updated in cart!`);
  } else {
    cart.push({
      name: name,
      price: parseFloat(price),
      image: image,
      quantity: 1,
    });
    alert(`${name} added to cart!`);
  }
  updateCartDisplay();
}




/**
 * Update Cart Display in the Modal
 */
function updateCartDisplay() {
  const cartItemsList = document.getElementById("cartItemsList");
  const cartTotalElement = document.getElementById("cartTotal");

  // Clear existing items
  cartItemsList.innerHTML = "";

  // Calculate total price and render cart items
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    // Create cart item element
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <p>${item.name}</p>
          <p>KSH.${item.price} x ${item.quantity}</p>
        </div>
        <div>
          <button class="cart-decrement" data-name="${item.name}">-</button>
          <button class="cart-increment" data-name="${item.name}">+</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(listItem);
  });

  cartTotalElement.textContent = `KSH.${total.toFixed(2)}`;

  // Add event listeners for increment and decrement buttons
  document.querySelectorAll(".cart-increment").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(btn.dataset.name, 1))
  );
  document.querySelectorAll(".cart-decrement").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(btn.dataset.name, -1))
  );
}

/**
 * Change Quantity of Items in the Cart
 */
function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.name !== name); // Remove item if quantity is 0
    }
    updateCartDisplay(); // Update cart display after changing quantity
  }
}

/**
 * Event Listener for "Order Now" Buttons
 */
document.querySelectorAll(".food-menu-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".food-menu-card"); // Get the parent card
    const name = card.querySelector(".card-title").textContent; // Get item name
    const price = card.querySelector(".price").textContent.replace("KSH.", ""); // Get item price
    const image = card.querySelector("img").src; // Get item image

    // Add the item to the cart
    addToCart(name, price, image);
  });
});


/**
 * Cart Modal Controls
 */
const cartModal = document.getElementById("cartModal");
const closeCartButton = document.getElementById("closeCart");
const viewCartButton = document.getElementById("viewCartButton");

closeCartButton.addEventListener("click", () => (cartModal.style.display = "none"));
viewCartButton.addEventListener("click", () => (cartModal.style.display = "block"));

document.getElementById("checkoutButton").addEventListener("click", () => {
  alert("Checkout complete!");
  cart = [];
  updateCartDisplay();
  cartModal.style.display = "none";
});