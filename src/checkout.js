// Get cart from local storage
let cart = JSON.parse(localStorage.getItem("data")) || [];


// For generating html in checkout.html
const checkoutWrapper = document.getElementById("checkout-h1");
let otherCheckoutWrapper = document.getElementById("checkout-h2");
const totalWrapper = document.getElementById("total");


const decrement = (id) => {
    let cartItem = cart.find((x) => x.id == id);

    if (cartItem == undefined) {
        return;
    } else if (cartItem.numItem == 0) {
        return;
    } else if (cartItem.numItem == 1) {
        cartItem.numItem--;
        location.reload();
    } else {
        cartItem.numItem--;
    }

    updateNumItems(id);
    updateNavCart();
    cart = cart.filter((x) => x.numItem != 0);
    spawnCheckout();
    localStorage.setItem("data", JSON.stringify(cart));
};


const updateNumItems = (id) => {
    let currItem = cart.find((x) => x.id == id);
    document.getElementById(id).innerHTML = currItem.numItem;
    updateNavCart();
    spawnCheckout();
};

const updateNavCart = () => {
    const cartAmount = document.getElementById("cart-amount");
    // Get each numItems and total them
    const total = cart.map((x) => x.numItem).reduce((x,y) => x + y, 0);
    // Offset num when too big
    if (total > 9) {
        cartAmount.setAttribute("style", "right:-2px;");
    }
    cartAmount.innerHTML = total;
    spawnCheckout();
};

 
const spawnCheckout = () => {
    if (cart.length == 0) {
        otherCheckoutWrapper = ``;
        checkoutWrapper.innerHTML = `
        <h1>Cart is empty</h1>
        <h2>Before proceeding, add items to your cart</h2>
            <a href="prebuilts.html">Return to Shop</a>
        `;
    } else {
        return (otherCheckoutWrapper.innerHTML = cart.map((x) => {
            const {id, numItem} = x;
            let cartItem = prebuiltTilesData.find((y) => y.id == id) || [];
            return `
            <div class="checkoutCartItem">
                <div class="checkoutCartImg">
                    <img src="${cartItem.img}" width=250px height=250px></img>
                </div>
                <div class="checkoutCartSpecs">
                    ${cartItem.specs}
                </div>
                <div id="${id}" class="checkoutCartNumItems">
                    Quantity: ${numItem}
                </div>
                <div onclick="decrement('${id}')" class="checkoutCartTrashIcon">
                    <i class="bi bi-trash3"></i>
                </div>
            </div>
            `;
        }).join(""));
    }
};


const spawnTotal = () => {
    totalWrapper.innerHTML = `
    <div class="checkout-total">
        Estimated Total: 
    </div>
    `;
};


updateNavCart();
spawnCheckout();
spawnTotal();
