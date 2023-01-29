/**
 * 
 * Ce code à pour but d'afficher le catalogue des produits proposés par le site
 * Il récupère les éléments du catalogue situés dans back\models\Product.js
 * Il est composé d'un fetch pour récupérer les produits;
 * D'une fonction showCatalog() pour les intégrer à la page d'accueil
 * 
 */

//==================================================//
//                                                  //
//  Affichage des produits au sein de l'index.html  //
//                                                  //
//==================================================//
function showCatalog(catalog) {

    //Sélection de la balise repère pour l'implémentation des produits
    let dataLocation = document.getElementById("items");

    //boucle pour afficher les produits du catalogue
    for (const product of catalog) {

        //Implémentation du produit
        dataLocation.innerHTML +=
        `<a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`
    }
}


//==============================================================================//
//                                                                              //
//  Récupération des produits du catalogue situé dans "back\models\Product.js"  //
//                                                                              //
//==============================================================================//
fetch('http://localhost:3000/api/products')

    //Transformation de la réponse au format JSON
    .then(response => response.json())

    //Envoie de la réponse à la fonction de l'affichage
    .then(response => {showCatalog(response)})

    //Réception de l'erreur si erreur
    .catch((erreur) => {
        
        //Affichage de l'erreur dans la console
        console.error(`Erreur lors de la requête: ${erreur}`);

    });