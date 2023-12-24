// login.js

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    alert("ttt")
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        const token = data.token;
        const decodedToken = jwt.verify(token, "RANDOM TOKEN");
        const userId = decodedToken.userId;
        console.log(userId); // Afficher la réponse dans la console

        // Ajoutez ici le code pour gérer la réponse de la requête login
        // Par exemple, rediriger l'utilisateur après un login réussi
    } catch (error) {
        console.error('Error:', error);
    }
});
