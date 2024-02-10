
// Função para abrir a Modal 2
function openModalPhoto() {
    const modal2 = document.querySelector('#modal2');
    modal2.style.display = 'block';
    modal2.removeAttribute('aria-hidden');
    modal2.setAttribute('aria-modal', 'true');
}

// Função para fechar a Modal 2
function closeModalPhoto() {
    const modal2 = document.querySelector("#modal2");
    if (!modal2) return;
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true');
    modal2.removeAttribute('aria-modal');
}

// Event listeners para botões de abrir e fechar a modal de adicionar foto
document.querySelector('.js-modal-photoplus').addEventListener('click', function(e) {
    e.preventDefault();
    openModalPhoto();
});

document.querySelector('.js-modal2-close').addEventListener('click', function(e) {
    e.preventDefault();
    closeModalPhoto();
});

// Função para carregar as categorias da API
function loadCategories() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            const select = document.getElementById('photoCategory');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}

// Função para tratar a submissão do formulário
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
        headers: {
            'Authorization': `Bearer ${token}`
        },
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
        closeModalPhoto(); // Fecha a modal após o sucesso
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

const uploadInput = document.getElementById('photoUpload')

uploadInput.addEventListener('change', function(event) {
    afficheImage()
})

function afficheImage() {
    const reader = new FileReader()
    const image = new Image() 
    const fileName = uploadInput.files[0].name
    const imagePreview = document.querySelector('imagePreview')
    reader.onload = event => {
        image.src = event.target.result
        image.alt = fileName.split('.')[0]  
    }
    console.log(image)
reader.readAsDataURL(uploadInput.files[0])
imagePreview.innerHTML(image)

}

// Adiciona os event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadCategories()
    document.querySelector('.js-modal-valider').addEventListener('click', function(event) {
        event.preventDefault()
        submitForm()
    });
});
