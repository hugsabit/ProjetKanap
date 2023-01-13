function showDatas(datas) {
  //Sélection de la balise pour l'implémentation
  let dataLocation = document.getElementById("items");
  
  for (const data of datas) {
    dataLocation.innerHTML +=
      `<a href="./product.html?id=${data._id}">
        <article>
          <img src="${data.imageUrl}" alt="${data.altTxt}">
          <h3 class="productName">${data.name}</h3>
          <p class="productDescription">${data.description}</p>
        </article>
      </a>`
  }
}

//Requete des Produits
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(response => {showDatas(response)})
.catch((erreur) => {
  console.error(`Erreur lors de la requête: ${erreur}`);
});