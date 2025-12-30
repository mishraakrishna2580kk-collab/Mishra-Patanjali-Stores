document.addEventListener("DOMContentLoaded", function () {


//Product data (later this will come from database)
const products=[
  {id: 1, name: "Patanjali Honey", price: 150 },
  {id: 2, name: "Patanjali Dant Kanti", price: 60},
  {id: 3, name: "Patanjal Aloe Vera Gel", price: 120}
  
];

const productList=document.getElementById("productList");
const cartList=document.getElementById("cart");
const totalEl= document.getElementById("total");

let cart=[];

//show products on page
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h4>${product.name}</h4>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

//New Cart logic with quantity

 window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

  renderCart();
  };

  function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });

    totalEl.textContent = total;
  }

  window.placeOrder = function () {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  if (!name || !phone || !address || cart.length === 0) {
    alert("Please fill all details and add products.");
    return;
  }

  let message = `🛒 *New Order*\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `🏠 Address: ${address}\n\n`;
  message += `📦 Items:\n`;

  cart.forEach(item => {
    message += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  message += `\n💰 Total: ₹${totalEl.textContent}`;

  const whatsappURL =
    `https://wa.me/91000000000?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

  /* OPTIONAL (RECOMMENDED UX) */
  cart = [];
  renderCart();
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
};
