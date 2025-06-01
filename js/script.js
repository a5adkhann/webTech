const toggle_btn = document.getElementById("toggle_btn");
const mobile_nav = document.getElementsByClassName("mobile-nav")[0];
const close_btn = document.getElementById("close_btn");
const cardsDiv = document.getElementsByClassName("cards")[0];

toggle_btn.addEventListener("click", () => {
  mobile_nav.classList.toggle("active");
});

close_btn.addEventListener("click", () => {
  mobile_nav.classList.toggle("active");
});

fetch("../json/cards.json")
  .then((response) => response.json())
  .then((data) => {
    let user = "";
    data.forEach((card) => {
      user += `
        <div class="card">
          <div class="card-img">
            <img src="${card.img_url}" alt="">
          </div>
          <div class="card-detail">
            <p>${card.title}</p>
            <p>${card.price}</p>
            <button onclick='addToCart(${JSON.stringify(
              card
            )})'>Add to Cart</button>
          </div>
        </div>
      `;
    });
    cardsDiv.innerHTML = user;
    updateCartCount();
  });

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cart.length > 0) {
    cartCount.style.display = "inline";
    cartCount.innerHTML = cart.length;
  } else {
    cartCount.style.display = "none";
  }
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart: " + item.title);
  updateCartCount();
}

$(document).ready(function () {
  $("#searchProduct").keyup(function () {
    let searchProduct = $("#searchProduct").val().toLowerCase();
    $(".cards").empty();

    $.getJSON("../json/cards.json", function (data) {
      let filteredProduct = data.filter(function (product) {
        return product.title.toLowerCase().includes(searchProduct);
      });
      if (filteredProduct.length > 0) {
        $.each(filteredProduct, function (key, value) {
          $(".cards").append(`
                         <div class="card">
          <div class="card-img">
            <img src="${value.img_url}" alt="">
          </div>
          <div class="card-detail">
            <p>${value.title}</p>
            <p>${value.price}</p>
            <button onclick='addToCart(${JSON.stringify(
              value
            )})'>Add to Cart</button>
          </div>
        </div>
         `);
        });
        console.log("If statement");
      } else {
        console.log("else Statement");
        $(".cards").append(`
                         <p>
                No Product Found
        </p>
         `);
      }
    });
  });
});








