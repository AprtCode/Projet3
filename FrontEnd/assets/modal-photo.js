
// document.addEventListener('DOMContentLoaded', () => {
//     // Função para abrir a Modal 2
//     function openModalPhoto() {
//         const modal2 = document.querySelector('#modal2');
//         modal2.style.display = 'block';
//         modal2.removeAttribute('aria-hidden');
//         modal2.setAttribute('aria-modal', 'true');
//     }

//     // Função para fechar a Modal 2
//     function closeModalPhoto() {
//         const modal2 = document.querySelector("#modal2");
//         modal2.style.display = 'none';
//         modal2.setAttribute('aria-hidden', 'true');
//         modal2.removeAttribute('aria-modal');
//     }

//     // Evento para abrir a Modal 2 a partir da Modal 1
//     const modalPhotoplusButton = document.querySelector('.js-modal-photoplus');
//     if (modalPhotoplusButton) {
//         modalPhotoplusButton.addEventListener('click', function(e) {
//             e.preventDefault(); // Previne o comportamento padrão do elemento
//             openModalPhoto(); // Chama a função que abre a Modal 2
//         });
//     } else {
//         console.log('Botão .js-modal-photoplus não encontrado.');
//     }

//     // Evento para fechar a Modal 2
//     const modal2CloseButton = document.querySelector('.js-modal2-close');
//     if (modal2CloseButton) {
//         modal2CloseButton.addEventListener('click', function(e) {
//             e.preventDefault(); // Previne o comportamento padrão do elemento
//             closeModalPhoto(); // Chama a função que fecha a Modal 2
//         });
//     } else {
//         console.log('Botão .js-modal2-close não encontrado.');
//     }
// });


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

// Assumindo que o seu botão .js-modal-photoplus está na modal 1 e que você quer abrir a modal 2 quando ele é clicado.
document.querySelector('.js-modal-photoplus').addEventListener('click', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do elemento
    openModalPhoto(); // Chama a função que abre a Modal 2
});

// Adiciona o event listener ao botão de fechar na Modal 2 para permitir que ela seja fechada.
document.querySelector('.js-modal2-close').addEventListener('click', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do elemento
    closeModalPhoto(); // Chama a função que fecha a Modal 2
});