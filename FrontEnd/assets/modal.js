const modal = document.querySelector("#modal1")

const openModal = function (e) {
     e.preventDefault()
     const target = document.querySelector('#modal1')
     target.style.display = null
     target.removeAttribute("aria-hidden")
     target.setAttribute("aria-modal", "true")
     modal = target
     modal.style.display = "block"
     modal.addEventListener("click", closeModal)
     modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
     
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal = null
    console.log("test")
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
    
})

window.addEventListener("keydown", function (e) {
    console.log(e.key)
})



// charger photos banque donees and delete

function afficherGalerie(projets) {
    const galerie = document.querySelector('.gallery-modal');
    galerie.innerHTML = ''; // Limpa a galeria
  
    
    projets.forEach(projet => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      const deleteButton = document.createElement('button'); // Botão de deletar
  
      img.src = projet.imageUrl;
      img.alt = projet.name;
      figcaption.textContent = projet.name;
  
      // Config delete
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // icone FontAwesome
      deleteButton.classList.add('delete-icon'); // add class
      deleteButton.onclick = function() { deleteImage(figure, projet.id); };
  
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figure.appendChild(deleteButton); // add button delete
      galerie.appendChild(figure);
    });
  }
  
  function deleteImage(figure, id) {
    
    console.log(`Deletar imagem com ID: ${id}`); 
  
    figure.remove();
  }

