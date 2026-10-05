let cart = [
{ id: 1, name: "Laptop", price: 50000, quantity: 1 },
{ id: 2, name: "Mouse", price: 800, quantity: 2 },
{ id: 3, name: "Keyboard", price: 1500, quantity: 1 }
];
function addToCart(product) {
cart.push(product);
}
function removeItem(id) {
cart = cart.filter(product => product.id !== id);
}
function getProductNames() {
return cart.map(product => product.name);
}
function calculateTotal() {
return cart.reduce(
(total, product) => total + product.price * product.quantity,0);
}

console.log("Initial Cart:");
console.log(cart);
addToCart({
id: 4,
name: "Headphones",
price: 2000,
quantity: 1
});
console.log("\nCart after adding Headphones:");
console.log(cart);
removeItem(2);
console.log("\nCart after removing Mouse:");
console.log(cart);
console.log("\nProduct Names:");
console.log(getProductNames());
console.log("\nTotal Price: ₹" + calculateTotal());
