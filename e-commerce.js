// Shopping Cart Array
let cart = [];

// Get Modal Elements
const cartModal = document.getElementById('cartModal');
const loginModal = document.getElementById('loginModal');
const checkoutModal = document.getElementById('checkoutModal');
const cartBtn = document.getElementById('cartBtn');
const loginBtn = document.getElementById('loginBtn');

// Close buttons
const closeBtns = document.getElementsByClassName('close');
for (let btn of closeBtns) {
    btn.onclick = function() {
        cartModal.style.display = 'none';
        loginModal.style.display = 'none';
        checkoutModal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target == checkoutModal) {
        checkoutModal.style.display = 'none';
    }
}

// Show Cart Modal
cartBtn.onclick = function() {
    displayCart();
    cartModal.style.display = 'block';
}

// Show Login Modal
loginBtn.onclick = function() {
    loginModal.style.display = 'block';
}

// Add to Cart Function
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Display Cart Items
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        cartTotalSpan.textContent = '0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
                </div>
                <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = total.toFixed(2);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
    
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    alert('Login successful!');
    loginModal.style.display = 'none';
}

// Show Register
function showRegister() {
    alert('Registration form would appear here');
}

// Handle Checkout
function handleCheckout(event) {
    event.preventDefault();
    alert('Order placed successfully! Thank you for your purchase.');
    cart = [];
    updateCartCount();
    checkoutModal.style.display = 'none';
}

// Product Filtering
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const searchInput = document.getElementById('searchInput');

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        let showProduct = true;
        
        // Category filter
        if (category !== 'all' && productCategory !== category) {
            showProduct = false;
        }
        
        // Price filter
        if (priceRange === 'low' && productPrice >= 50) {
            showProduct = false;
        } else if (priceRange === 'medium' && (productPrice < 50 || productPrice > 100)) {
            showProduct = false;
        } else if (priceRange === 'high' && productPrice <= 100) {
            showProduct = false;
        }
        
        // Search filter
        if (searchTerm && !productName.includes(searchTerm)) {
            showProduct = false;
        }
        
        product.style.display = showProduct ? 'block' : 'none';
    });
}
