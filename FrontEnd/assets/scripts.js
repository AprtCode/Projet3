
// Code exécuté une fois que la page est chargée
document.addEventListener('DOMContentLoaded', function() {
  // Récupération des projets
  fetch('http://localhost:5678/api/works')
  .then(response => response.json()) // convertit la réponse en JSON
  .then(projects => {        
    afficherGalerie(projects)
    afficherGalerieModale(projects)       
  })
  .catch(error => {
    console.error('Échec de la récupération des projets:', error);
  });
  // Récupération des catégories
  fetch('http://localhost:5678/api/categories')
  .then(response => response.json()) // convertit la réponse en JSON
  .then(categories => {        
    afficherCategories(categories)      
  })
  .catch(error => {
    console.error('Échec de la récupération des catégories:', error);
  });
})

// Fonction pour afficher les projets
function afficherGalerie(projets) {
  const galerie = document.querySelector('.gallery')
  galerie.innerHTML = '' // Nettoie la galerie

  // Boucle sur tous les projets
  projets.forEach(projet => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    img.src = projet.imageUrl; 
    img.alt = projet.title; 
    figcaption.textContent = projet.title; 
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galerie.appendChild(figure);
  });
}
  
// Fonction pour afficher les catégories
function afficherCategories(categories) {
  const listeCategorie = document.querySelector('#menu-categories');

  // Affichage du bouton "Tous"
  const buttonCategorie = document.createElement('button');
  buttonCategorie.classList.add('filtre-categorie')
  buttonCategorie.innerText = "Tous"
  listeCategorie.appendChild(buttonCategorie)

  // Ajouter le addeventlistener sur ce bouton
  buttonCategorie.addEventListener("click", function(){
    fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // convertit la réponse en JSON
    .then(projects => {        
      afficherGalerie(projects)       
    })
  })

  // Récupérer tous les projets
  // Appeler la fonction afficherGalerie avec en parametre tous les projets

  // Boucle pour afficher toutes les catégories

  categories.forEach(categorie => {
    const buttonCategorie = document.createElement('button');
    buttonCategorie.classList.add('filtre-categorie')
    buttonCategorie.innerText = categorie.name
    listeCategorie.appendChild(buttonCategorie)
    buttonCategorie.addEventListener("click", function(){
      filtrerProjetsParCategorie(categorie.name)
    })
    // Ajouter le addeventlistener pour appeler la fonction filtrerProjetsParCategorie
  })
}

// Fonction pour filtrer après un click sur une cétégorie
function filtrerProjetsParCategorie(categorie) {
  fetch('http://localhost:5678/api/works')
  .then(response => response.json()) 
  .then(works => {  
    const worksFilter = works.filter(function(results){
      return results.category.name === categorie
    }) 
    afficherGalerie(worksFilter) 
  })    
  // Les filtrer selon le nom de categorie passé en parametre
  // Appeler la fonction afficherGalerie avec en parametre les projets filtrés
}
// Fonction logout
function logOut() { // j'ai cree la fonction...
  localStorage.removeItem("token") //fonction pour vider localstorage
  location.reload() //rechage la page
}

// Verifie si le tolken est present dans le localstorage
const token = localStorage.getItem("token")

if(token.length > 20 && typeof token === "string")
{
  const filtres = document.querySelector("#menu-categories")
  filtres.style.display = "none"

  const login = document.querySelector(".login")
  const logout = document.querySelector(".logout")
  login.style.display = "none"
  logout.style.display = "block"

  const boutonModifier = document.querySelector(".bouton-modifier")
  boutonModifier.innerHTML = '<i class="fas fa-edit"></i> Modifier'

  const modeEdition = document.querySelector(".mode-edition")
  modeEdition.style.display = "flex"

  logout.addEventListener("click",() => {
    logOut() //...J'appelle la fonction
  })
}
