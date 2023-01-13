function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null || cart == "") {
        return [];
    } else {
        return JSON.parse(cart)
    };
};

export function addToCart(product) {
    function valitedProduct() {
        if (confirm('Le(s) produit(s) sélectionné(s) à/ont été ajouter à votre panier.\nCliquez sur "ok" pour accéder à votre panier.')) {
            document.location.href="./cart.html";
        } else {
            console.log("bouton annullé sélectionné");
        }
    }
    let cart = getCart();
    let foundProduct = cart.find((p) => p.id === product.id && p.color === product.color);
    if (foundProduct != undefined) {
        let productQuantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);
        if (productQuantity > 100) {
            alert("Vous ne pouvez commander plus de 100 produits pour cet article.\nVous êtes déjà à " + foundProduct.quantity + " produit(s) pour cet article.");
        } else {
            foundProduct.quantity = productQuantity;
            alert(product.quantity +" produit(s) de cet article à été ajouter à votre panier.")
            valitedProduct();
        };
    } else {
        cart.push(product);
        valitedProduct()
    };
    saveCart(cart);
};

function removeToCard(product) {
    let cart = getCart();
    cart = cart.filter((p) => p.id != product.id && p.color != product.color);
    saveCart();
}

function showCart() {
    let cart = getCart();
    if (cart != undefined) {
        const urlFetch = 'http://localhost:3000/api/products/';
          //Requete des Produits
        fetch(urlFetch)
            .then(response => response.json())
            .then(response => {
                for (let product of cart) {
                    for (let i = 0; i < response.length; i++) {
                        if (product.id === response[i]._id) {
                            product.name = response[i].name;
                            product.price = response[i].price;
                            product.imageUrl = response[i].imageUrl;
                            product.altTxt = response[i].altTxt;
                            product.description = response[i].description;
                        }
                    }
                    
                }
                console.log(cart);
                show();
            })
        .catch((erreur) => {
            console.error(`Erreur lors de la requête: ${erreur}`);
        });

        function show() {
            cart.map(product => {
                document.getElementById('cart__items').innerHTML += `
                    <article class="cart__item" data-id="{${product.id}}" data-color="{${product.color}}">
                    <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p>${product.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${product.quantity}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                    </article>
                `;
            });
        }
    } else {
        console.log("fail");
    };
}

showCart();
// for (let i = 0; i < cart.length; i++) {
//     for (let product in cart) {

//         if (cart[product].id === product.id && cart[product].color === product.color) {

//             if (productQuantityTest > 100) {

//                 alert("vous ne pouvez dépasser les 100 produits");

//             } else {                        

//                 cart[product].quantity = foundProduct.quantity; 
//                 console.log("here");

//             }
//         }

//     }
// }