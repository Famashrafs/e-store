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

// card rating starts 
// let stars=document.querySelectorAll(".star ");
// stars.forEach((star ,index1) => {
//   star.addEventListener("click", () =>{
//      stars.forEach((star ,index2)=>{
//       index1 >= index2 ?  star.classList.add("checked") : star.classList.remove("checked")
//      }
//      )})
// })
// add to wish list icon
 let wishList=document.querySelector(".card--bottom .wish--list");
 function addToFav(){
  if(wishList.classList.contains("fa-regular")){
    wishList.classList.replace("fa-regular","fa-solid");
    let added= wishList.setAttribute("added","added to favorite");
  }else{
    wishList.classList.replace("fa-solid","fa-regular");
    let added= wishList.setAttribute("added","add to favorite")
  }
  console.log(wishList)
 }

// add to cart alert 
let cartTotal=document.querySelector(".cart-total");
let totalPrice =Number(cartTotal.getAttribute("total-price"));
let cardPrice=document.querySelector(".card--price");
let productPrice=Number(cardPrice.getAttribute("price-data"));
console.log(totalPrice)
console.log(productPrice)
function addToCart(){
  const img=document.querySelector(".addToCart").nextElementSibling.src;
  Swal.fire({
  title: 'Are you sure?',
  text: "adding this product to the cart",
  imageUrl: `${img}`,
  imageWidth: 275,
  imageHeight: 400,
  imageAlt: 'Custom image',
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
// function starHoverIn(){
//   star.classList.add("checked")
// }
// function starHoverOut(){
//   star.classList.remove("checked")
// }


// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }



// start test
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
  e.preventDefault();

  switchTab(clickedTab);
});

tabsContainer.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "Home":
      e.preventDefault();
      switchTab(tabButtons[0]);
      break;
    case "End":
      e.preventDefault();
      switchTab(tabButtons[tabButtons.length - 1]);
      break;
  }
});

function moveLeft() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.previousElementSibling) {
    switchTab(tabButtons[tabButtons.length - 1]);
  } else {
    switchTab(
      currentTab.parentElement.previousElementSibling.querySelector("a")
    );
  }
}

function moveRight() {
  const currentTab = document.activeElement;
  if (!currentTab.parentElement.nextElementSibling) {
    switchTab(tabButtons[0]);
  } else {
    switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
  }
}

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

// end test