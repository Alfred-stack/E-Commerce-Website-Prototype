// Sample product data
const products = [
    { id: 1, name: "Wireless Headphones", price: 49.99, img: "Wireless Headphones.png" },
    { id: 2, name: "Smart Watch", price: 89.99, img: "Smartwatch.jpeg" },
    { id: 3, name: "Bluetooth Speaker", price: 29.99, img: "Bluetooth Speaker.png" },
    { id: 4, name: "VR Headset", price: 119.99, img: "VR Headset.jpeg" },
    { id: 4, name: "MackBook", price: 1200.00, img: "Mackbook 2025.jpg" }
  ];
  
  // Utility: Get cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Utility: Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Update cart count in nav
  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('#cart-count').forEach(span => span.textContent = count);
  }
  
  // Render products (on products.html)
  function renderProducts() {
    const list = document.getElementById('product-list');
    if (!list) return;
    list.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button class="add-cart-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    `).join('');
    // Add event listeners
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        addToCart(Number(this.dataset.id));
        this.textContent = "Added!";
        setTimeout(() => this.textContent = "Add to Cart", 1000);
      });
    });
  }
  
  // Add product to cart
  function addToCart(id) {
    let cart = getCart();
    const idx = cart.findIndex(item => item.id === id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
  }
  
  // Render cart items (on cart.html)
  function renderCart() {
    const section = document.getElementById('cart-items');
    if (!section) return;
    const cart = getCart();
    if (cart.length === 0) {
      section.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
    section.innerHTML = cart.map(item => {
      const prod = products.find(p => p.id === item.id);
      return `
        <div class="cart-item">
          <img src="${prod.img}" alt="${prod.name}" style="width:60px;">
          <span>${prod.name}</span>
          <span>Qty: ${item.qty}</span>
          <span>$${(prod.price * item.qty).toFixed(2)}</span>
          <button class="remove-cart-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
    }).join('');
    document.querySelectorAll('.remove-cart-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        removeFromCart(Number(this.dataset.id));
        renderCart();
        updateCartCount();
      });
    });
  }
  
  // Remove item from cart
  function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
  }
  
  // On page load
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
  });
  