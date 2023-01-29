/**
 * 
 * Ce code à pour but de gérer le panier du client
 * Il récupère ou crée le panier;
 * Il permet de manipuler le panier (ajouter, modifier, supprimer et sauvegarder);
 * Il permet d'afficher le panier;
 * Il permet de valider la commande du panier;
 * 
 */

const urlPanier = new URL (document.URL);
const urlf = "html/cart.html";
if (urlPanier.toString().includes(urlf)) {
    showCart();
    showTotalPrice();
    showTotalProduct();
    modifyQuantityProduct();
}


//===================================//
//                                   //
//  Création/Récupération du panier  //
//                                   //
//===================================//
function getCart() {

    //Récupération du panier "cart"
    let cart = localStorage.getItem("cart");

    //Vérification de l'existance du panier et retour
    if (cart == null || cart == "") {
        return [];
    } else {
        return JSON.parse(cart)
    };
}


//========================//
//                        //
//  Sauvegarde du panier  //
//                        //
//========================//
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


//================================//
//                                //
//  Ajout d'un produit au panier  //
//                                //
//================================//
function addToCart(product) {

    //fonction de redirection de vers le panier
    function cartRedirection() {

        if (confirm('Le(s) produit(s) sélectionné(s) a/ont été ajouter à votre panier.\nCliquez sur "ok" pour accéder à votre panier.')) {
            //redirection vers le panier
            document.location.href="./cart.html";
        } else {
            console.log("bouton annullé sélectionné");
        }
    }

    //Récupération du panier "cart"
    let cart = getCart();
    //Variable de recherche de l'existance du produit dans le panier
    let foundProduct = cart.find((p) => p.id === product.id && p.color === product.color);
    
    //Recherche de l'existance du produit et vérification de la quantitée
    if (foundProduct != undefined) {
        
        //Variable de vérification de la quantitée
        let productQuantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);
        if (productQuantity > 100) {
            alert("Vous ne pouvez commander plus de 100 produits pour cet article.\nVous êtes déjà à " + foundProduct.quantity + " produit(s) pour cet article.");
        } else {
            //ajout de la quantité au produit trouvé
            foundProduct.quantity = productQuantity;
            alert(product.quantity +" produit(s) de cet article à été ajouter à votre panier.");
            //Redirection vers le panier
            cartRedirection();
        };
    } else {
        
        //Vérification de la quantitée avant l'ajout dans le panier
        if (product.quantity <= 100) {
            //ajout du produit au panier
            cart.push(product);
            //Redirection vers le panier
            cartRedirection()
        } else {
            alert("Vous ne pouvez commander plus de 100 articles du même produit.")
        }
    };

    //Sauvegarde du panier
    saveCart(cart);
}


//=======================//
//                       //
//  Affichage du panier  //
//                       //
//=======================//
function showCart() {

    //Récupération du panier
    let cart = getCart();

    //Affichage du panier
    if (cart != "[]" || cart != "") {

        //URL de la liste des produits
        const urlFetch = "http://localhost:3000/api/products/";

        //Récupération du catalogue
        fetch(urlFetch)
            //Transformation de la réponse au format JSON
            .then(response => response.json())
            //Utilisation du JSON pour compléter les informations du panier
            .then(response => {
                //Sondage du panier dans le catalogue
                for (const product of cart) {
                    for (let i = 0; i < response.length; i++) {

                        //Vérification de la correspondance entre le produit panier et le produit catalogue 
                        if (product.id === response[i]._id) {
                            product.name = response[i].name;
                            product.price = response[i].price;
                            product.imageUrl = response[i].imageUrl;
                            product.altTxt = response[i].altTxt;
                            product.description = response[i].description;
                        }
                    }
                }
                //Affichage du panier
                show();
            })
            //Si erreur récupération et affichage dans la console
            .catch((erreur) => {
                console.error(`Erreur lors de la requête: ${erreur}`);
            });
        
        //Fonction d'affichage du panier
        function show() {
            //Mapping pour chaques produits du panier
            cart.map(product => {
                //Sélection du repère et intégration au niveau HTML
                document.getElementById("cart__items").innerHTML += `
                    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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
    }
}


//======================================================//
//                                                      //
//  Modification de la quantité d'un produit du panier  //
//                                                      //
//======================================================//
function modifyQuantityProduct() {

    //Récupération du panier
    let cart = getCart();

    let inputQuantity = document.querySelectorAll("input.itemQuantity");

    for (let j = 0; j < inputQuantity.length; j++) {
        
        inputQuantity[j].addEventListener('click', (quantityValue) => {
            
            //Récupération de l'article parent
            const articleId = inputQuantity[j].closest('article');
            //Récupération de l'id du produit
            const dataId = articleId.getAttribute("data-id");
            //Récupération de la couleur du produit
            const dataColor = articleId.getAttribute("data-color");
            
            //Sondage des produits du panier
            for (let k = 0; k < cart.length; k++) {

                //Vérification de la correspondance entre l'article du panier et celui sélectionné
                if (cart[k].id === dataId && cart[k].color === dataColor) {
                    
                    //Modification de la quantité de l'article dans le panier
                    cart[k].quantity = quantityValue.target.valueAsNumber
                    //Sauvegarde du panier
                    saveCart(cart);;
                    //Modification de l'affichage de la quantitée
                    document.querySelector(`article[data-id="${dataId}"][data-color="${dataColor}"] div.cart__item__content div.cart__item__content__settings div.cart__item__content__settings__quantity p`).innerHTML = "Qté : " + quantityValue.target.valueAsNumber;
                    showTotalPrice();
                    showTotalProduct();
                }
                
            }
        })
        
    }
    
}


//======================================//
//                                      //
//  Suppréssion d'un produit du panier  //
//                                      //
//======================================//
function deleteProduct() {

    //Récupération du panier
    let cart = getCart();

    //Pointage des boutons de suppréssion de produits
    let buttonRemove = document.querySelectorAll("p.deleteItem");
    
    //Actions sur tous les boutons
    for (let l = 0; l < buttonRemove.length; l++) {
        
        //Ecoute des boutons de supprésion
        buttonRemove[l].addEventListener('click', () => {
            
            //Récupération de l'article parent
            const articleId = buttonRemove[l].closest('article');
            //Récupération de l'id du produit
            const dataId = articleId.getAttribute("data-id");
            //Récupération de la couleur du produit
            const dataColor = articleId.getAttribute("data-color");
            
            //Sondage des produits du panier
            for (let m = 0; m < cart.length; m++) {

                //Vérification de la correspondance entre l'article du panier et celui sélectionné
                if (cart[m].id === dataId && cart[m].color === dataColor) {
                    
                    //Suppréssion de l'article du panier
                    cart.splice([m], 1);
                    //Sauvegarde du panier
                    saveCart(cart);
                    //Sélection de l'article affiché
                    const articleToRemove = document.querySelector(`article[data-id="${dataId}"][data-color="${dataColor}"]`);
                    //Supréssion de l'affichage de cet article
                    articleToRemove.remove();
                }
                
            }
        })
        
    }
    
}


//=====================================//
//                                     //
//  Affichage du prix total du panier  //
//                                     //
//=====================================//
function showTotalPrice() {

    //Récupération du panier
    let cart = getCart();
    //Constante de stockage de prix
    let totalPrice = 0;

    //Ajout du prix de chaque produit dans totalPrice
    for (const product of cart) {
        totalPrice += (product.price * product.quantity);
    }

    //Inplémentation du prix total formaté dans la page
    document.getElementById("totalPrice").innerHTML += new Intl.NumberFormat('fr-FR').format(totalPrice);
}


//================================================//
//                                                //
//  Affichage du nombre d'article dans le panier  //
//                                                //
//================================================//
function showTotalProduct() {

    //Récupération du panier
    let cart = getCart();
    //Constante de stockage de quantité
    let totalProduct = 0;

    //Ajout du prix de chaque produit dans totalPrice
    for (const product of cart) {
        totalProduct += product.quantity;
    }

    //Inplémentation de la quantitée total formaté dans la page
    document.getElementById("totalQuantity").innerHTML += new Intl.NumberFormat('fr-FR').format(totalProduct);
}


//=======================================//
//                                       //
//  Validation de la commande du panier  //
//                                       //
//=======================================//
function valideCart() {
    
}