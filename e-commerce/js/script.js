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
 Swal.fire({
  title: 'Are you sure?',
  text: "adding this product to the cart",
  icon: 'warning',
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
