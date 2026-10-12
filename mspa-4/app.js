var foodItems = [
    { id: 1, name: "Samosa (2 pcs)", category: "Snacks", price: 30, image: "samosa.jpg" },
    { id: 2, name: "Veg Burger", category: "Snacks", price: 60, image: "burger.jpg" },
    { id: 3, name: "Masala Dosa", category: "Meals", price: 80, image: "dosa.jpg" },
    { id: 4, name: "Paneer Thali", category: "Meals", price: 120, image: "thali.jpg" },
    { id: 5, name: "Cold Coffee", category: "Beverages", price: 50, image: "cold coffee.jpg" },
    { id: 6, name: "Fresh Lime Soda", category: "Beverages", price: 30, image: "lime soda.jpg" },
    { id: 7, name: "Chocolate Brownie", category: "Desserts", price: 70, image: "brownie.jpg" },
    { id: 8, name: "Ice Cream Scoop", category: "Desserts", price: 40, image: "ice cream.jpg" }
];

var cart = [];
var currentCategory = 'All';

window.onload = function() {
    renderFoodItems(foodItems);
    updateCartUI();
};

function renderFoodItems(itemsToRender) {
    var gridContainer = document.getElementById('food-grid');
    gridContainer.innerHTML = '';

    if (itemsToRender.length === 0) {
        gridContainer.innerHTML = '<p>No items found in this category.</p>';
        return;
    }

    for (var i = 0; i < itemsToRender.length; i++) {
        var item = itemsToRender[i];
        var card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = 
            '<img src="' + item.image + '" alt="' + item.name + '" class="food-img">' +
            '<div class="food-info">' +
            '<div class="food-name">' + item.name + '</div>' +
            '<div class="food-price">₹' + item.price + '</div>' +
            '</div>' +
            '<button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>';
        gridContainer.appendChild(card);
    }
}

function filterCategory(category, buttonElement) {
    currentCategory = category;

    var buttons = document.getElementsByClassName('cat-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    buttonElement.classList.add('active');

    if (category === 'All') {
        renderFoodItems(foodItems);
    } else {
        var filtered = [];
        for (var j = 0; j < foodItems.length; j++) {
            if (foodItems[j].category === category) {
                filtered.push(foodItems[j]);
            }
        }
        renderFoodItems(filtered);
    }
}

function addToCart(itemId) {
    var selectedItem = null;
    for (var i = 0; i < foodItems.length; i++) {
        if (foodItems[i].id === itemId) {
            selectedItem = foodItems[i];
            break;
        }
    }

    if (!selectedItem) return;

    var foundIndex = -1;
    for (var k = 0; k < cart.length; k++) {
        if (cart[k].id === itemId) {
            foundIndex = k;
            break;
        }
    }

    if (foundIndex > -1) {
        cart[foundIndex].quantity += 1;
    } else {
        cart.push({
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: 1
        });
    }

    updateCartUI();
}

function changeQuantity(itemId, change) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === itemId) {
            cart[i].quantity += change;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    updateCartUI();
}

function updateCartUI() {
    var cartList = document.getElementById('cart-items-list');
    var cartCountSpan = document.getElementById('cart-count');
    var cartTotalPriceSpan = document.getElementById('cart-total-price');

    cartList.innerHTML = '';

    var totalItemsCount = 0;
    var totalPrice = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
        cartCountSpan.innerText = '0';
        cartTotalPriceSpan.innerText = '₹0';
        return;
    }

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];
        totalItemsCount += cartItem.quantity;
        totalPrice += cartItem.price * cartItem.quantity;

        var li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = 
            '<div class="cart-item-details">' +
            '<div class="cart-item-name">' + cartItem.name + '</div>' +
            '<div class="cart-item-price">₹' + cartItem.price + ' x ' + cartItem.quantity + '</div>' +
            '</div>' +
            '<div class="cart-item-controls">' +
            '<button class="qty-btn" onclick="changeQuantity(' + cartItem.id + ', -1)">-</button>' +
            '<span>' + cartItem.quantity + '</span>' +
            '<button class="qty-btn" onclick="changeQuantity(' + cartItem.id + ', 1)">+</button>' +
            '</div>';
        cartList.appendChild(li);
    }

    cartCountSpan.innerText = totalItemsCount;
    cartTotalPriceSpan.innerText = '₹' + totalPrice;
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add items before placing an order.');
        return;
    }

    document.getElementById('display-order-id').innerText = 'Order ID: #001';

    document.getElementById('main-app-container').style.display = 'none';
    document.getElementById('confirmation-container').style.display = 'block';

    cart = [];
    updateCartUI();
}

function resetToMenu() {
    document.getElementById('confirmation-container').style.display = 'none';
    document.getElementById('main-app-container').style.display = 'block';
}

function scrollToCart() {
    var cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
}
