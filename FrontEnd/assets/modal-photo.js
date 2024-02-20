
const title = document.querySelector('#photoTitle')
const category = document.querySelector('#photoCategory')
const file = document.querySelector('#photoUpload')
const submit = document.querySelector('.js-modal-valider')

// ouvre la modale
function openModalPhoto() {
    const modal2 = document.querySelector('#modal2');
    modal2.style.display = 'block';
    modal2.removeAttribute('aria-hidden');
    modal2.setAttribute('aria-modal', 'true');
}

// ferme la modale
function closeModalPhoto() {
    const modal2 = document.querySelector("#modal2");
    if (!modal2) return;
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true');
    modal2.removeAttribute('aria-modal');
}

// event listeners pour boutons ouvrir et fermer modale qui add photo
document.querySelector('.js-modal-photoplus').addEventListener('click', function(e) {
    e.preventDefault();
    openModalPhoto();
}); 

document.querySelector('.js-modal2-close').addEventListener('click', function(e) {
    e.preventDefault();
    closeModalPhoto();
});

// charger categories API
function loadCategories() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {

// option vide pour selectioner categorie
            const select = document.getElementById('photoCategory')
            let emptyOption = document.createElement('option')
            select.appendChild(emptyOption);


            categories.forEach(category => {
                const option = document.createElement('option')
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}

// traitement submission formulaire
function submitForm() {
    const photoUpload = document.getElementById('photoUpload').files[0];
    const photoTitle = document.getElementById('photoTitle').value;
    const photoCategory = document.getElementById('photoCategory').value;

    // if (!photoUpload) {
    //     alert("Selectioner photo");
    //     return;
    // }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, user is not logged in')
        alert("Vous n'êtes pas connecté.")
        return;
    }

    const formData = new FormData()
    formData.append('photo', photoUpload)
    formData.append('title', photoTitle)
    formData.append('category', photoCategory)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
        body: formData
    })


    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        return response.json()
    })

    .then(data => {
        console.log('Success:', data)
        closeModalPhoto() // Ferme modal si succes                    
    
       // Actualiser gallerie
        updateGallery(data)
    })
        .catch(error => {
        console.error('Error:', error)
        alert('Erreur telechargement.')
    })
}

const uploadInput = document.getElementById('photoUpload')

uploadInput.addEventListener('change', function(event) {
    afficheImage()
})

// affiche petite image demo
function afficheImage() {
    const reader = new FileReader()
    const image = new Image() 
    const fileName = uploadInput.files[0].name
    const imagePreview = document.querySelector('.imagePreview')
    const detailPreview = document.querySelector('.detailPreview')
    reader.onload = event => {
        image.src = event.target.result
        image.alt = fileName.split('.')[0]  
    }
    reader.readAsDataURL(uploadInput.files[0])
    console.log(imagePreview)
    imagePreview.appendChild(image)
    detailPreview.style.display = 'none'
}

// event listeners validation
document.addEventListener('DOMContentLoaded', function() {
    loadCategories()
    document.querySelector('.js-modal-valider').addEventListener('click', function(event) {
        event.preventDefault()
        submitForm()
    });
});

// si valable pour telechargement, cela ira changer la coleur du bouton
function verifValidityForm() {
    const titleValue = title.value
    const categoryValue = category.value
    const fileValue = file.files[0]
    if (titleValue != '' && categoryValue != '' && fileValue){
        submit.style.backgroundColor = '#1D6154'
        return true
    } else {
        submit.style.backgroundColor = '#A7A7A7'
        return false
    }
}

title.addEventListener('input', (event) => {
    verifValidityForm()
})

category.addEventListener('change', (event) => {
    verifValidityForm()
})


// telecharger nouvelle photo
function updateGallery(photoData) {
    
    const gallery = document.querySelector('.gallery');
    const newImage = document.createElement('img');
   
    // nom image devient src
    newImage.src = photoData.imageUrl; 
    newImage.alt = photoData.title; 

    // nouvelle image add galerie
    gallery.appendChild(newImage);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeModalPhoto(); // fermeture modale si succes
        updateGallery(data); // actualiser gallerie
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur telechargement.');
    });
}
