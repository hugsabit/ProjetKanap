function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null || cart =="" ) {
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
    console.log(cart);

    if (cart != undefined) {

        const urlFetch = 'http://localhost:3000/api/products/';
        
          //Requete des Produits
        fetch(urlFetch)
            .then(response => response.json())
            .then(response => {console.log(response);})
        .catch((erreur) => {
            console.error(`Erreur lors de la requête: ${erreur}`);
        });

        cart.forEach(element => {
            
        });

        // cart.map(product => {
        //     document.getElementById('cart__items').innerHTML += `
        //         <article class="cart__item" data-id="{${product.id}}" data-color="{${product.color}}">
        //         <div class="cart__item__img">
        //             <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        //         </div>
        //         <div class="cart__item__content">
        //             <div class="cart__item__content__description">
        //                 <h2>Nom du produit</h2>
        //                 <p>Vert</p>
        //                 <p>42,00 €</p>
        //             </div>
        //             <div class="cart__item__content__settings">
        //                 <div class="cart__item__content__settings__quantity">
        //                     <p>Qté : </p>
        //                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        //                 </div>
        //                 <div class="cart__item__content__settings__delete">
        //                     <p class="deleteItem">Supprimer</p>
        //                 </div>
        //             </div>
        //         </div>
        //         </article>`;

        // });
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