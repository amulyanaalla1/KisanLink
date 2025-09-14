document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Logic ---
    const userModal = document.getElementById('user-modal');
    const farmerModal = document.getElementById('farmer-modal');
    const userLoginBtn = document.getElementById('user-login-btn');
    const farmerLoginBtn = document.getElementById('farmer-login-btn');
    const userCloseBtn = document.querySelector('.user-close');
    const farmerCloseBtn = document.querySelector('.farmer-close');

    // Show modals
    userLoginBtn.onclick = () => userModal.style.display = 'block';
    farmerLoginBtn.onclick = () => farmerModal.style.display = 'block';

    // Hide modals
    userCloseBtn.onclick = () => userModal.style.display = 'none';
    farmerCloseBtn.onclick = () => farmerModal.style.display = 'none';

    // Hide modals if clicked outside of the content
    window.onclick = (event) => {
        if (event.target == userModal) {
            userModal.style.display = 'none';
        }
        if (event.target == farmerModal) {
            farmerModal.style.display = 'none';
        }
    };

    // --- Cart Logic ---
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const addToCartButtons = document.querySelectorAll('.buy-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    let cart = [];

    // Toggle cart sidebar
    cartIcon.onclick = () => cartSidebar.classList.add('open');
    closeCartBtn.onclick = () => cartSidebar.classList.remove('open');

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            // Check if item is already in cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
            cartSidebar.classList.add('open'); // Open cart on add
        });
    });

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <p>Qty: ${item.quantity} x ₹${item.price.toFixed(2)}</p>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItem);
                total += item.price * item.quantity;
                count += item.quantity;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = count;

        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (event) => {
                const indexToRemove = parseInt(event.target.dataset.index);
                removeFromCart(indexToRemove);
            });
        });
    }

    // Remove from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }
});