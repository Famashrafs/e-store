// start changing page mode
// let mode=document.querySelector(".mode");
// let button=document.querySelector(".button");
// let body=document.querySelector("body");
// mode.addEventListener("click",function changingMode(){
//     button.classList.toggle("night--button")
//     mode.classList.toggle("night--mode")
//     body.classList.toggle("night")
// })





  let nav= document.querySelector("nav"),
      navUl= document.querySelector("ul"),
      menu=document.querySelector(".menu");
function menuHide(){
  nav.classList.toggle("mobileHide")
  navUl.classList.toggle("mobileMenu")
}
menu.addEventListener("click",menuHide);


// add to cart alert 
let cartTotal=document.querySelector(".cart-total");
let totalPrice =Number(cartTotal.getAttribute("total-price"));
let cardPrice=document.querySelector(".card--price");
let productPrice=Number(cardPrice.getAttribute("price-data"));
console.log(totalPrice)
console.log(productPrice)
function addToCart(event){
  event.preventDefault()
  const img=document.querySelector(".addToCart").nextElementSibling.src;
  const name=document.querySelector(".addToCart").closest("h5");
  Swal.fire({
  title: 'Are you sure?',
  text: `adding${name}`,
  imageUrl: `${img}`,
  imageWidth: 275,
  imageHeight: 400,
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
    totalPrice+=productPrice;
    localStorage.setItem("totalPrice",totalPrice);
  }
})
}
let price =window.getComputedStyle(cartTotal ,"::after");
totalPrice =price.getPropertyValue("content");

// cart menu 
const navCart=document.querySelector(".nav-cart");
const cartMenu=document.querySelector(".cart-menu");
navCart.addEventListener("click",function(){
  if(cartMenu.style.display=="flex"){
    cartMenu.style.cssText="display:none";
  }else{
    cartMenu.style.cssText="display:flex";
  }
})
// cart cancel-btn
// let cancel=document.querySelector(".cancel");
// cancel.addEventListener("click",function(){
//   cartMenu.style.cssText="display:none";
//   console.log("clicked")
// })
const productimg=document.querySelector(".card-img-top").src;
const productName=document.querySelector(".card-title").innerHTML;
const cartProduct=document.querySelector(".nav-cart-product");
const cartProductImage=document.createElement("img");
cartProductImage.setAttribute("href",productimg)
cartProductImage.classList.add("cart-product-img")
cartProduct.appendChild(cartProductImage)
const cartProductName=document.createElement("h3");
cartProductName.classList.add("cart-product-name")
cartProductName.innerHTML=productName;
cartProduct.appendChild(cartProductName)
const cartProductPrice=document.createElement("p");
cartProductPrice.innerHTML=productPrice;
cartProductPrice.classList.add("cart-product-price")
cartProduct.appendChild(cartProductPrice)




// add to wish list icon
function addToFav(event) {
  let wishList = event.target;
  let cardBottom = wishList.closest('.card--bottom');
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
const tabsList = tabsContainer.querySelector("ul");
const tabButtons = tabsList.querySelectorAll("a");
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