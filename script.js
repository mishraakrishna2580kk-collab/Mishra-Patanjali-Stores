document.addEventListener("DOMContentLoaded", function () {

  const products = [
    { id: 1, name: "Patanjali Honey", price: 150 },
    { id: 2, name: "Patanjali Dant Kanti", price: 60 },
    { id: 3, name: "Patanjali Aloe Vera Gel", price: 120 }
  ];

  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  let cart = [];

  // Render products
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      addToCart(product.id);
    });
    productList.appendChild(div);
  });

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
  }

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

});
