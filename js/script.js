// USER LOGIN
function login() {
  const name = document.getElementById("username").value;
  if(name){
    localStorage.setItem("user", name);
    window.location.href = "index.html";
  }
}

function checkUser() {
  const user = localStorage.getItem("user");
  const box = document.getElementById("userBox");
  if(user && box){
    box.innerHTML = `Hi, ${user} | <a href="#" onclick="logout()">Logout</a>`;
  }
}

function logout(){
  localStorage.removeItem("user");
  location.reload();
}

// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart(){
  const items = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");
  if(!items) return;

  items.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    items.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₹${item.price} <button onclick="removeItem(${i})">X</button></span>
      </div>`;
  });

  totalBox.innerText = "Total: ₹" + total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// WHATSAPP ORDER
function proceedToOrder(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  let msg = "Hi, I want to order:%0A";
  let total = 0;

  cart.forEach(item => {
    msg += `• ${item.name} - ₹${item.price}%0A`;
    total += item.price;
  });

  msg += `%0ATotal: ₹${total}`;

  const phone = "91XXXXXXXXXX"; // PUT YOUR NUMBER
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

// IMAGE ZOOM
document.addEventListener("click", e => {
  if(e.target.tagName === "IMG" && e.target.closest(".image-frame")){
    document.getElementById("imgModal").style.display = "flex";
    document.getElementById("modalImg").src = e.target.src;
  }
});

function closeModal(){
  document.getElementById("imgModal").style.display = "none";
}
