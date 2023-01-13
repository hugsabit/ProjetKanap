import * as cart from "./Cart.js";

//Récupération de l'id de l'url
const url = new URL (document.URL);
const urlFetch = 'http://localhost:3000/api/products/'+url.searchParams.get('id');
const idProduct = url.searchParams.get('id');

  //Requete des Produits
fetch(urlFetch)
    .then(response => response.json())
    .then(response => {showDatas(response)})
.catch((erreur) => {
    console.error(`Erreur lors de la requête: ${erreur}`);
});

function showDatas(data) {

    document.getElementsByClassName('item__img')[0].innerHTML += `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
    document.getElementById('title').innerHTML += `${data.name}`;
    document.getElementById('price').innerHTML += `${data.price}`;
    document.getElementById('description').innerHTML += `${data.description}`;

    data.colors.forEach(color => {
        document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
    });
};

//observation du bouton d'ajout au panier
const buttonLocation = document.getElementById('addToCart');

buttonLocation.addEventListener('click', () => {
    
    const inputColor = document.getElementById('colors').value;
    const inputNumber = document.getElementById('quantity').value;

    switch (true) {
        case !inputColor && inputNumber == 0:
            alert('Veuillez renseigner une couleur et une quantitée pour le produit !');
            break;
        case !inputColor:
            alert('Veuillez renseigner une couleur pour le produit !');
            break;
        case inputNumber == 0:
            alert('Veuillez renseigner une quantitée de produits !');
            break;
    
        default:
            const objValue = {id:idProduct,color:inputColor,quantity:inputNumber};
            cart.addToCart(objValue);
            break;
    };

});
