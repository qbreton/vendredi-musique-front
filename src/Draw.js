import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faClockRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Modal from './Modal';
import Connect from './Connect';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ListLi = styled.li`
    transition: all .4s;
    &.red {
        background-color: #991b1b;
        color: white;
    }
    &.blue {
        background-color: #3b82f6;
        color: white;
    }
`

function Draw({ token, isAdmin, setIsAdmin }) {
    const apiUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL;

    const [persons, setPersons] = useState({"notDrawn": [], "drawn": []});
    const [newName, setNewName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({"name":"", dates:[]});

    useEffect(() => {
        fetch(`${apiUrl}/names`)
        .then(response => response.json())
        .then(data => {
            setPersons(data);
            persons.notDrawn.map(name => console.log(name))
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    function draw() {
        fetch(`${apiUrl}/draw`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            setPersons(data)
            toast.success("Tirage effectué");
        })
        .catch(error => {
            let message = error.message.includes('Unauthorized') ? "Tu dois être connecté..." : error.message;
            toast.error(message);
        });
    }

    function reset() {
        fetch(`${apiUrl}/reset`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setPersons(data)
            toast.success("Remise à zéro effectuée");
        })
        .catch(error => {
            let message = error.message.includes('Unauthorized') ? "Tu dois être connecté..." : error.message;
            toast.error(message);
        });
    }

    function deleteName(name) {
        fetch(`${apiUrl}/names/${name}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setPersons(data)
            toast.success("Personne supprimée");
        })
        .catch(error => {
            let message = error.message.includes('Unauthorized') ? "Tu dois être connecté..." : error.message;
            toast.error(message);
        });
    }

    function addName(name) {
        if (name === "") { return; }

        fetch(`${apiUrl}/names`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setNewName("");
            setPersons(data);
            toast.success("Personne ajoutée");
        })
        .catch(error => {
            let message = error.message.includes('Unauthorized') ? "Tu dois être connecté..." : error.message;
            toast.error(message);
        });
    }

    function undo(name) {
        if (name === "") { return; }

        fetch(`${apiUrl}/${name}/undo`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setPersons(data);
            toast.success(`Dernier tirage de ${name} invalidé`);
        })
        .catch(error => {
            let message = error.message.includes('Unauthorized') ? "Tu dois être connecté..." : error.message;
            toast.error(message);
        });
    }

    return (
        <div className="max-w-800px m-0-auto p-4 relative">
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className=''>
                <h1 className='text-5xl text-center mb-10 text-gray-800 font-bold'>Vendredi musique</h1>
                <Connect setIsAdmin={setIsAdmin} isAdmin={isAdmin}></Connect>
            </div>
            <Modal visible={modalVisible} setVisible={setModalVisible} person={modalData}></Modal>
            <div className="flex flex-col justify-around sm:flex-row items-center sm:items-start">
                <div className="w-8/12 bg-white rounded p-6 shadow-lg untouched mb-12 sm:mb-0 sm:w-5/12 sm:sticky sm:top-28">
                    <form className={`mb-6 ${!isAdmin ? 'hidden' : '' }`}>
                        <label htmlFor="new-person" className='text-base text-gray-600 block mb-2'>Ajouter une personne :</label>
                        <div className='flex justify-center mb-4'>
                            <input onChange={(event) => setNewName(event.target.value)} value={newName} type="text" className='p-2 mr-2 rounded-md w-full border-gray-400 border-solid border-2 text-base' id="new-person" name="new-person" placeholder="Nom de la personne" />
                            <button onClick={(event) => {
                                event.stopPropagation();
                                addName(newName);
                            }} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg width="20" height="20"><path d="M5 10 H15 M10 5 V15" stroke="white" strokeWidth="2"/></svg>
                                <span className="sr-only">Ajouter une personne</span>
                            </button>
                        </div>
                    </form>
                    <button className={`${!isAdmin ? 'hidden' : '' } relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800`}
                        onClick={() => draw()}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-green-900">
                        Tirer au sort
                        </span>
                    </button>
                    <h2 className="text-2xl mb-6 text-gray-700">Personnes à choisir</h2>
                    <ul className="list-none p-0 m-0 mb-4">
                        { persons.notDrawn.map((person, index) => (
                            <ListLi className={`p-2 m-2 bg-gray-100 rounded-md border-gray-500 flex justify-between align-baseline`} key={index}>
                                <span>{person.name}</span>
                                <span>
                                    <FontAwesomeIcon className="w-3 mr-2 cursor-pointer" icon={faClockRotateLeft}
                                        onClick={() => {
                                            setModalData(person);
                                            setModalVisible(true);
                                        }}
                                    >
                                    </FontAwesomeIcon>
                                    <FontAwesomeIcon className={`${!isAdmin ? 'hidden' : '' } w-3 cursor-pointer`} icon={faTrash}
                                        onClick={() => deleteName(person.name)}
                                    ></FontAwesomeIcon>
                                </span>
                            </ListLi> 
                        ))}
                    </ul>
                </div>
                <div className="w-8/12 bg-white rounded p-6 shadow-lg touched sm:w-5/12 sm:sticky sm:top-24">
                    <button className={`${!isAdmin ? 'hidden' : ''} relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`}
                        onClick={() => reset()}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-red-900">
                        Remettre à zéro
                        </span>
                    </button>
                    <h2 className="text-2xl mb-6 text-gray-700">Personnes déjà choisies</h2>
                    <ul className="list-none p-0 m-0 sticky">
                        { persons.drawn.map((person, index) => (
                            <ListLi className={`p-2 m-2 bg-gray-100 rounded-md border-gray-500 flex justify-between`} key={index}>
                                <span>
                                    <FontAwesomeIcon 
                                        className='mr-4 cursor-pointer' 
                                        icon={faArrowLeftLong}
                                        onClick={() => undo(person.name)}
                                    ></FontAwesomeIcon>
                                    {person.name}
                                </span>
                                <span>
                                    <FontAwesomeIcon className="w-3 mr-2 cursor-pointer" icon={faClockRotateLeft} 
                                        onClick={() => {
                                            setModalData(person);
                                            setModalVisible(true);
                                        }}
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon className={`${!isAdmin ? 'hidden' : '' } w-3 cursor-pointer`} icon={faTrash}
                                        onClick={() => deleteName(person.name)}
                                    ></FontAwesomeIcon>
                                </span>
                            </ListLi> 
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Draw;