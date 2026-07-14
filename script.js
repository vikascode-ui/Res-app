// =========================
// CART
// =========================

let cart = [];

// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " added to cart.");
}

// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const count = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let grandTotal = 0;

    cart.forEach((item, index) => {

        grandTotal += item.price;

        cartItems.innerHTML += `
        <li>
            ${item.name} - ₹${item.price}

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </li>
        `;

    });

    total.innerHTML = grandTotal;
    count.innerHTML = cart.length;

}

// =========================
// REMOVE ITEM
// =========================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// =========================
// SEARCH FOOD
// =========================

function searchFood() {

    let input = document.getElementById("searchFood").value.toLowerCase().trim();

    let cards = document.querySelectorAll(".menu-card");

    if (input === "") {

        cards.forEach((card, index) => {
            if (index < 6) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        return;
    }

    cards.forEach(card => {

        let food = card.dataset.name.toLowerCase();

        if (food.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}
// =========================
// FILTER FOOD
// =========================

function filterFood(category){

    let cards =
    document.querySelectorAll(".menu-card");

    cards.forEach(card=>{

        if(category==="all"){

            card.style.display="block";

        }

        else if(card.classList.contains(category)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// =========================
// FOOD DETAILS MODAL
// =========================

function showFoodDetails(
title,
image,
description,
price
){

    document.getElementById("foodTitle").innerHTML=title;

    document.getElementById("foodImg").src=image;

    document.getElementById("foodDesc").innerHTML=description;

    document.getElementById("foodPrice").innerHTML="₹"+price;

    document.getElementById("foodCartBtn").onclick=function(){

        addToCart(title,price);

        closeFoodModal();

    }

    document.getElementById("foodModal").style.display="block";

}

// =========================
// CLOSE FOOD MODAL
// =========================

function closeFoodModal(){

document.getElementById("foodModal").style.display="none";

}

// =========================
// LEARN MORE
// =========================

function learnMore(){

    alert(
`Welcome to Swaad By KK Restaurant

✔ Fresh Food
✔ Premium Quality
✔ Hygienic Kitchen
✔ Fast Delivery
✔ Family Restaurant`
    );

}
// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("checkoutModal").style.display = "block";
}

// =========================
// CLOSE CHECKOUT
// =========================

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

// =========================
// PAYMENT METHOD
// =========================

document.getElementById("paymentMethod").addEventListener("change", function () {

    document.getElementById("upiBox").style.display = "none";
    document.getElementById("cardBox").style.display = "none";
    document.getElementById("bankBox").style.display = "none";

    if (this.value === "UPI") {
        document.getElementById("upiBox").style.display = "block";
    }

    if (this.value === "CARD") {
        document.getElementById("cardBox").style.display = "block";
    }

    if (this.value === "BANK") {
        document.getElementById("bankBox").style.display = "block";
    }

});

// =========================
// PLACE ORDER
// =========================

function placeOrder() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (name === "" || phone === "" || address === "" || payment === "") {
        alert("Please fill all details.");
        return;
    }

    let total = 0;
    let orderText = "";

    cart.forEach(item => {
        total += item.price;
        orderText += `${item.name} - ₹${item.price}\n`;
    });

    const orderId = "SBK" + Math.floor(Math.random() * 1000000);

    document.getElementById("orderId").innerHTML = orderId;

    document.getElementById("checkoutModal").style.display = "none";
    document.getElementById("successModal").style.display = "block";

    // WhatsApp Message

    const message =
`🍽️ Swaad By KK Restaurant

Order ID : ${orderId}

Customer : ${name}

Phone : ${phone}

Address :
${address}

Payment : ${payment}

Items :
${orderText}

Total : ₹${total}`;

    document.getElementById("whatsappBtn").href =
        "https://wa.me/918960119755?text=" +
        encodeURIComponent(message);

    // Admin Dashboard

    const dashboard = document.getElementById("orderList");

    dashboard.innerHTML += `

    <div class="order-card">

    <h3>${orderId}</h3>

    <p><b>Name :</b> ${name}</p>

    <p><b>Phone :</b> ${phone}</p>

    <p><b>Payment :</b> ${payment}</p>

    <p><b>Total :</b> ₹${total}</p>

    </div>

    `;

    // Reset Cart

    cart = [];
    updateCart();

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("paymentMethod").value = "";

    document.getElementById("upiBox").style.display = "none";
    document.getElementById("cardBox").style.display = "none";
    document.getElementById("bankBox").style.display = "none";

}

// =========================
// CLOSE SUCCESS
// =========================

function closeSuccess() {

    document.getElementById("successModal").style.display = "none";

}

// =========================
// BOOKING FORM
// =========================

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("✅ Table Booked Successfully!");

    bookingForm.reset();

});

// =========================
// CLOSE MODAL ON OUTSIDE CLICK
// =========================

window.onclick = function (event) {

    const checkoutModal = document.getElementById("checkoutModal");
    const successModal = document.getElementById("successModal");
    const foodModal = document.getElementById("foodModal");

    if (event.target === checkoutModal) {
        checkoutModal.style.display = "none";
    }

    if (event.target === successModal) {
        successModal.style.display = "none";
    }

    if (event.target === foodModal) {
        foodModal.style.display = "none";
    }

};
window.onload = function () {

    let cards = document.querySelectorAll(".menu-card");

    cards.forEach((card, index) => {

        if (index < 6) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

};
