import { useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCross, faPowerOff, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Connect({ isAdmin, setIsAdmin }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    function handleLogin() {
        const apiUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL;

        const requestBody = {
            username: login,
            password: password
        };
        
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((json) => {
            Cookies.set('token', json.token);
            setIsVisible(false);;
            setIsAdmin(true);
            setLogin('');
            setPassword('');
            toast.success("Connecté avec succès");
        })
        .catch(error => {
            // Gérer les erreurs
            toast.error(`Mauvais identifiants...`);
        });
    }

    function handleLogout() {
        Cookies.remove('token');
        toast.success("Déconnecté avec succès");
        setIsAdmin(false);
    }

    return (
        <div>
            <FontAwesomeIcon
                onClick={() => setIsVisible(!isVisible)}
                className={`${isAdmin ? 'hidden' : ''} absolute left-14 top-6 text-2xl cursor-pointer text-green-600`}
                icon={faUserAlt}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
                onClick={() => handleLogout()}
                className={`${!isAdmin ? 'hidden' : ''} absolute left-14 top-6 text-2xl cursor-pointer text-red-600`}
                icon={faPowerOff}
            ></FontAwesomeIcon>
            <div className={`${!isVisible ? 'hidden' : ''} absolute flex flex-col z-10 bg-gray-50 top-0 left-0 right-0 bottom-0 sm:left-14 sm:top-14 sm:right-auto sm:bottom-auto px-10 py-7 border-solid border-2`}>
                <FontAwesomeIcon
                    className='absolute top-2 right-2 text-3xl sm:hidden' 
                    icon={faClose} onClick={() => setIsVisible(false)}></FontAwesomeIcon>
                <input className='p-2 mb-4 rounded-md w-full border-gray-400 text-black placeholder:text-black border-solid border-2 text-base'
                    type="text" id="login" placeholder='Pseudo' value={login} onChange={(e) => setLogin(e.target.value)} 
                />
                <input className='p-2 mb-8 rounded-md w-full border-gray-400 text-black placeholder:text-black border-solid border-2 text-base'
                    type="password" id="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button
                    className='relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}>
                        <span className='relative px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-green-900'>Connexion</span>
                    </button>
            </div>
        </div>
    )
}

export default Connect;