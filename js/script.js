// animation while scrolling
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
// mobile menu
  let nav= document.querySelector("nav"),
      menu=document.querySelector(".menu");
function menuHide(){
  nav.classList.toggle("mobile-menu")
  console.log(menu)
}
menu.addEventListener("click",menuHide);

// toggle cart menu
const navCart = document.querySelector(".nav-cart");
const cartMenu = document.querySelector(".cart-menu");
// Add event listener to the cart icon
navCart.addEventListener("click", function(event) {
  const isButton = event.target.nodeName === 'BUTTON';
  const isInsideCartMenu = cartMenu.contains(event.target);

  if (!isButton && !isInsideCartMenu) {
    if (cartMenu.style.display === "flex") {
      cartMenu.style.display = "none";
    } else {
      cartMenu.style.display = "flex";
    }
  }
});

// cart cancel-btn
let cancel=document.querySelector(".cancel");
cancel.addEventListener("click",function(){
  cartMenu.style.cssText="display:none";
})

// Retrieve cart items from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to calculate the total price
function calculateTotalPrice() {
  let total = 0;

  for (const item of cart) {
    const productPrice = parseInt(item.productPrice);
    const quantity = item.quantity;
    total += productPrice * quantity;
  }

  return total;
}

// Function to calculate the total number of products
function calculateTotalProducts() {
  let totalProducts = 0;

  for (const item of cart) {
    totalProducts += item.quantity;
  }

  return totalProducts;
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartMenu();
}
// Call the function to load the cart from local storage when the page loads
loadCartFromLocalStorage();

function totalP() {
  let total = 0;

  // Iterate over the cart array and calculate the total price
  for (const item of cart) {
    const productPrice = parseInt(item.productPrice);
    const quantity = item.quantity;
    total += productPrice * quantity;
  }
  return total;
}
function addToCart(event) {
  event.preventDefault();
console.log("added")
  Swal.fire({
  title: 'Are you sure?',
  text: `adding this product to your cart`,
  imageUrl: `img/product-review.jpg`,
  imageWidth: 180,
  imageHeight: 220,
  imageAlt: 'product image',
  showCancelButton: true,
  confirmButtonColor: '#35ad66',
  cancelButtonColor: '#d33',
  confirmButtonText: 'add'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'ADDED!',
      'Your Product has been added successfuly',
      'success'
    )
  }
})
  const clickedButton = event.target;
  const productUrl =
    clickedButton.nodeName === 'BUTTON'
      ? clickedButton.nextElementSibling.href
      : clickedButton.parentElement.nextElementSibling.href;

  // Extract the product data from the URL-like string
  const url = new URL(productUrl);
  const productImage = url.searchParams.get('data-image');
  const productTitle = url.searchParams.get('data-title');
  const productId = url.searchParams.get('data-product-id');
  const productPrice = parseInt(url.searchParams.get('data-price'));

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.productId === productId);

  if (existingProduct) {
    // If the product already exists, increment its quantity
    existingProduct.quantity++;
  } else {
    // If the product doesn't exist, add it to the cart with a quantity of 1
    const newProduct = {
      productId: productId,
      productImage: productImage,
      cartProductName: productTitle,
      productPrice: productPrice,
      quantity: 1,
    };
    cart.push(newProduct);
  }


  // Update the cart menu
  updateCartMenu();

  // Update the total price
  const totalPrice = totalP();
  const totalPriceElement = document.querySelector('.cart-total');
  totalPriceElement.innerHTML = `$${totalPrice}`;

    // Save the cart to local storage
    saveCartToLocalStorage();
}

function updateCartMenu() {
  const cartProductContainer = document.querySelector('.nav-cart-products');

  // Clear the cart menu
  cartProductContainer.innerHTML = '';

  // Generate the cart menu items
  for (const item of cart) {
    const cartProduct = document.createElement('div');
    cartProduct.classList.add('nav-cart-product');
    cartProductContainer.appendChild(cartProduct);

    const cartProductImage = document.createElement('img');
    cartProductImage.setAttribute('src', item.productImage);
    cartProductImage.classList.add('cart-product-img');
    cartProduct.appendChild(cartProductImage);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    cartProduct.appendChild(productInfo);

    const cartProductName = document.createElement('h3');
    cartProductName.classList.add('cart-product-name');
    cartProductName.innerHTML = item.cartProductName;
    productInfo.appendChild(cartProductName);

    const cartProductPrice = document.createElement('p');
    cartProductPrice.innerHTML = `$${item.productPrice}`;
    cartProductPrice.classList.add('cart-product-price');
    productInfo.appendChild(cartProductPrice);

    const productCounter = document.createElement('div');
    productCounter.classList.add('product-counter');
    const increment = document.createElement('button');
    increment.innerHTML = '+';
    increment.classList.add('increment');
    const decrement = document.createElement('button');
    decrement.classList.add('decrement');
    decrement.innerHTML = '-';
    const counter = document.createElement('div');
    counter.classList.add('counter');
    productCounter.appendChild(decrement);
    productCounter.appendChild(counter);
    productCounter.appendChild(increment);
    cartProduct.appendChild(productCounter);

    let count = item.quantity;
    counter.textContent = count;

    decrement.setAttribute('onclick', 'decrementButton(event)');
    increment.setAttribute('onclick', 'incrementButton(event)');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    cartProduct.appendChild(deleteButton);

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
      deleteCartItem(item.productId);
    });
  }

  const totalPrice = calculateTotalPrice();
  const totalPriceElement = document.querySelector('.cart-total');
  totalPriceElement.innerHTML = `$${totalPrice}`;

  const totalProducts = calculateTotalProducts();

  // Update the notification
  const navCart = document.querySelector('.nav-cart');
  navCart.setAttribute('notification', totalProducts);

  // Save the total price and total products to local storage
  localStorage.setItem('totalPrice', totalPrice);
  localStorage.setItem('totalProducts', totalProducts);
}

function deleteCartItem(productId) {
  // Find the index of the cart item with the matching productId
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    // Remove the cart item from the cart array
    cart.splice(index, 1);
    // Update the cart menu
    updateCartMenu();
    // Update the total price
    const totalPrice = calculateTotalPrice();
    const totalPriceElement = document.querySelector('.cart-total');
    totalPriceElement.innerHTML = `$${totalPrice}`;
    // Save the cart to local storage
    saveCartToLocalStorage();
  }
}

function incrementButton(event) {
  const counter = event.target.parentElement.querySelector('.counter');
  const index = Array.from(event.target.closest('.nav-cart-product').parentElement.children).indexOf(event.target.closest('.nav-cart-product'));
  cart[index].quantity++;
  counter.textContent = cart[index].quantity;
  const totalPrice = totalP();
  const totalPriceElement = document.querySelector('.cart-total');
  totalPriceElement.innerHTML = `$${totalPrice}`;
    // Save the cart to local storage
    saveCartToLocalStorage();
}

function decrementButton(event) {
  const counter = event.target.parentElement.querySelector('.counter');
  const index = Array.from(event.target.closest('.nav-cart-product').parentElement.children).indexOf(event.target.closest('.nav-cart-product'));
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    counter.textContent = cart[index].quantity;
    const totalPrice = totalP();
    const totalPriceElement = document.querySelector('.cart-total');
    totalPriceElement.innerHTML = `$${totalPrice}`;
  }
    // Save the cart to local storage
    saveCartToLocalStorage();
}
// Function to handle adding a new product to the cart
function addProductToCart(product) {
  cart.push(product);
  updateCartMenu();
}
// add to wish list icon
function addToFav(event) {
  let wishList = event.target;
  if (wishList.classList.contains("fa-regular")) {
    wishList.classList.replace("fa-regular", "fa-solid");
    wishList.setAttribute("added", "added to favorite");
  } else {
    wishList.classList.replace("fa-solid", "fa-regular");
    wishList.setAttribute("added", "add to favorite");
  }
}

// start tabs
const tabsContainer = document.querySelector(".tabs-container");
const tabsList = tabsContainer.querySelector(".ul");
const tabButtons = tabsList.querySelectorAll(".ul a");
const tabPanels = tabsContainer.querySelectorAll(".tabs__panels > div");

tabsList.setAttribute("role", "tablist");

tabsList.querySelectorAll("li").forEach((listitem) => {
  listitem.setAttribute("role", "presentation");
});

tabButtons.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  if (index === 0) {
    tab.setAttribute("aria-selected", "true");
    // we'll add something here
  } else {
    tab.setAttribute("tabindex", "-1");
    tabPanels[index].setAttribute("hidden", "");
  }
});

tabPanels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("tabindex", "0");
});

tabsContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest("a");
  if (!clickedTab) return;

  switchTab(clickedTab);
});
function switchTab(newTab) {
  const activePanelId = newTab.getAttribute("href");
  const activePanel = tabsContainer.querySelector(activePanelId);
  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", false);
    button.setAttribute("tabindex", "-1");
  });

  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });

  activePanel.removeAttribute("hidden", false);

  newTab.setAttribute("aria-selected", true);
  newTab.setAttribute("tabindex", "0");
  newTab.focus();
}
// move to top btn
const moveToTopButton = document.getElementById('moveToTopButton');

// Function to check if the scroll position is greater than or equal to 100vh
function checkScrollPosition() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;

  if (scrollPosition >= viewportHeight) {
    moveToTopButton.style.display = 'block';
  } else {
    moveToTopButton.style.display = 'none';
  }
}

// Add scroll event listener to check the scroll position
window.addEventListener('scroll', checkScrollPosition);

// Function to scroll to the top of the page
function moveToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add click event listener to the "Move to Top" button
moveToTopButton.addEventListener('click', moveToTop);



