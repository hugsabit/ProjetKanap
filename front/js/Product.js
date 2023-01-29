/**
 * 
 * Ce code à pour but d'afficher le produit sélectionner dans la page d'acceuil 
 * Il récupère les informations du produit situé dans le catalogue au niveau de back\models\Product.js
 * Il est composé d'un fetch pour récupérer les informations du produit à l'aide de l'URL;
 * D'une fonction showDatasProduct() pour intégrer les informations dans la page produtc.html;
 * D'une écoute d'événement au niveau du bouton "Ajouter au panier" qui:
 *      -Récupère la couleur du produit renseignée
 *      -Récupère la quantité renseignée
 * Et qui l'ajoute au panier à l'aide de la fonction addToCart() importé de Cart.js
 */

//Import de la fonction addToCart() de Cart.js
import { addToCart } from "./Cart.js";


//===============================//
//                               //
//  Variables relatives au URLs  //
//                               //
//===============================//
//Récupération de l'URL de la page
const url = new URL (document.URL);
//Récupération de l'id du produit contenue dans L'URL de la page
const idProduct = url.searchParams.get('id');
//Création de l'URL à fetch pour le produit
const urlFetch = 'http://localhost:3000/api/products/'+url.searchParams.get('id');


//======================================//
//                                      //
//  Fetch du produit dans le catalogue  //
//                                      //
//======================================//
fetch(urlFetch)

    //Transformation de la réponse au format JSON
    .then(response => response.json())
    
    //Envoie de la réponse à la fonction de l'affichage
    .then(response => {showDatasProduct(response)})

    //Réception de l'erreur si erreur
    .catch((erreur) => {
        
        //Affichage de l'erreur dans la console
        console.error(`Erreur lors de la requête: ${erreur}`);

    });


//==================================================================//
//                                                                  //
//  Affichage des informations du produit au sein de product.html   //
//                                                                  //
//==================================================================//
function showDatasProduct(product) {

    //Implémentation de l'image
    document.getElementsByClassName('item__img')[0].innerHTML += `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
    //Implémentation du nom
    document.getElementById('title').innerHTML += `${product.name}`;
    //Implémentation du prix
    document.getElementById('price').innerHTML += `${product.price}`;
    //Implémentation de la description
    document.getElementById('description').innerHTML += `${product.description}`;
    //Boucle pour l'affichage des différentes couleurs du produit
    product.colors.forEach(color => {
        //Implémentation des couleurs
        document.getElementById("colors").innerHTML += 
        `<option value="${color}">${color}</option>`;
    });
};


//==============================================================//
//                                                              //
//  Actions relatives à l'écoute du bouton "Ajouter au panier"  //
//                                                              //
//==============================================================//

//Pointage du bouton
const buttonLocation = document.getElementById('addToCart');

//Ecoute du bouton
buttonLocation.addEventListener('click', () => {
    
    //Récupération de la couleur renseignée
    const inputColor = document.getElementById('colors').value;
    //Récupération de la quantité renseignée
    const inputNumber = document.getElementById('quantity').valueAsNumber;
    
    //Actions faites en fonction de la situation
    switch (true) {

        //Situation sans couleur ni quantité renseignée
        case !inputColor && inputNumber == 0:
            alert('Veuillez renseigner une couleur et une quantitée pour le produit !');
            break;

        //Situation sans couleur renseignée
        case !inputColor:
            alert('Veuillez renseigner une couleur pour le produit !');
            break;

        //Situation sans quantité renseignée
        case inputNumber == 0:
            alert('Veuillez renseigner une quantitée de produits !');
            break;
        
        //Situation qui ajoute le produit au panier
        default:
            //Création du produit au format objet
            const objValue = {id:idProduct,color:inputColor,quantity:inputNumber};
            //Ajout du produit au panier
            addToCart(objValue);
            break;
    };
});