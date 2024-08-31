const prebuiltTiles = document.getElementById("prebuilt-tiles");

const cart = JSON.parse(localStorage.getItem("data")) || [];

const increment = (id) => {
    const searchCart = cart.find((x) => x.id == id);

    if(searchCart == undefined) {
        cart.push({
            id: id,
            numItem: 1
        });
    } else {
        searchCart.numItem++;
    }
    updateNavCart();
    localStorage.setItem("data", JSON.stringify(cart));
};


const updateNavCart = () => {
    const cartAmount = document.getElementById("cart-amount");
    const total = cart.map((x) => x.numItem).reduce((x,y) => x + y, 0);
    if (total > 9) {
        cartAmount.setAttribute("style", "right:-2px;");
    }
    cartAmount.innerHTML = total;
}


const spawnPrebuiltTiles = () => {
    return (prebuiltTiles.innerHTML = prebuiltTilesData.map((x)=>{
        const {id,header,headerColor,img,text,button,price} = x;
        return `
            <div id="product-id-${id}" class="prebuiltelem1">
                <div class="prebuilt-header1" style="background-color:${headerColor}"">
                    ${header}
                </div>
                <div class="elem1-image">
                    <img src="${img}" style="height:250px;width:250px;">
                </div>
                <div class="elem1-text">
                    ${text}
                </div>
                <div class="elem1-price">
                    ${price}
                </div>
                <div onclick="increment('${id}')" class="elem1-addtocart">
                    <button>${button}</button>
                </div>
            </div>
        `;
    }).join(""));
};


spawnPrebuiltTiles();
updateNavCart();
