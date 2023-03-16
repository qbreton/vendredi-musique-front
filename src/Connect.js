import { useState } from 'react';
const bcrypt = require('bcrypt');

function Connect() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        const apiUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL;

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            const requestBody = {
                username: login,
                password: hashedPassword
            };
            
            fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                // Gérer les erreurs
            });
        })
    }

    return (
        <div>
            <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Connexion</button>
        </div>
    )
}

export default Connect;