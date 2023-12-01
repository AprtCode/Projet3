
 // Code après le chargement de la page : Chargement de contenu dynamique avec Fetch API

document.addEventListener('DOMContentLoaded', function() {

    
    fetch('http://localhost:5678/api-docs/works')
      .then(response => response.json()) // convertit la réponse en JSON
      .then(projects => {
        
        mettreAJourGalerie(projects)
       
      })
      .catch(error => {
        console.error('Échec de la récupération des projets:', error);

      });

      
})


// Code des filtres de catégories

document.querySelectorAll('.filtre-categorie').forEach(bouton => {
    bouton.addEventListener('click', function() {
      const categorieSelectionnee = this.dataset.categorie;
    
      // Supposant que 'projects' est le tableau contenant tous vos projets
      const projetsFiltres = projects.filter(projet => {
        return categorieSelectionnee === 'Tous' || projet.categorie === categorieSelectionnee;
      });
    
      // Mise à jour de la galerie avec les projets filtrés
      mettreAJourGalerie(projetsFiltres);
    });
  });
  
  function mettreAJourGalerie(projets) {
    const galerie = document.querySelector('.gallery');
    galerie.innerHTML = ''; // Nettoie la galerie
  
    // Ajoute les projets filtrés à la galerie
    projets.forEach(projet => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      img.src = projet.imageUrl; // remplacez selon votre structure de données
      img.alt = projet.name; // remplacez selon votre structure de données
      figcaption.textContent = projet.name; // remplacez selon votre structure de données
  
      figure.appendChild(img);
      figure.appendChild(figcaption);
      galerie.appendChild(figure);
    });
  }
  
  function afficherCategorie(categories) {
    const listeCategorie = document.querySelector('#menu-categories');
    
    console.log(hi)

    categories.forEach(categorie => {
      const buttonCategorie = document.createElement('button');
      buttonCategorie.classList.add('filtre-categorie')
      buttonCategorie.innerText = categorie.name
      listeCategorie.appendChild(buttonCategorie)
    })

      

  }



// Code buttons html css

  document.querySelectorAll('.filtre-categorie').forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.filtre-categorie').forEach(btn => btn.classList.remove('active-categorie'));
      // Add active class to the clicked button
      this.classList.add('active-categorie');
      // Your code to filter content based on the category selected
      filterContent(this.dataset.categoria);
    });
  });
  
  function filterContent(categoria) {
    console.log("Filter content for category:", categoria);
    // Implement the logic to filter and display the content based on the category
    // This is where you would hide/show elements or fetch new data based on the category
  }
  



  fetch('http://localhost:5678/api-docs/categories')
      .then(response => response.json()) // convertit la réponse en JSON
      .then(categories => {
      
      afficherCategorie(categories)
  });