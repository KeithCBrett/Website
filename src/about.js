const cart = JSON.parse(localStorage.getItem("data")) || [];

console.log(cart);

const updateNavCart = () => {
    const cartAmount = document.getElementById("cart-amount");
    const total = cart.map((x) => x.numItem).reduce((x,y) => x + y, 0);
    if (total > 9) {
        cartAmount.setAttribute("style", "right:-2px;");
    }
    cartAmount.innerHTML = total;
}


updateNavCart();
