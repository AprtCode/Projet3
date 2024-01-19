    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message'); 

    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if(username==="" || password===""){
        errorMessage.textContent = "Merci de remplir tous les champs."  
        }
        else{
            fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:username, password:password }),
        })
        
        .then(response => response.json())
        .then(data => {

            if (data.token) {
                
        localStorage.setItem("token", data.token)
        window.location="index.html"

            } 

            else {
            errorMessage.textContent ='Identifiant incorrecte'; 
            }

        })

        .catch(error => {
            console.error('Erro no login:', error);
            if(errorMessage) {
                errorMessage.textContent = 'Pas de conexion avec le serveur.';
            }
        });
        }

        
    });