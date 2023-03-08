import env from "react-dotenv";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Draw() {
    const apiUrl = env.API_URL;
    const [names, setNames] = useState({"notDrawn": [], "drawn": []});
    const [newName, setNewName] = useState("");

    useEffect(() => {
        fetch(`${apiUrl}/names`)
        .then(response => response.json())
        .then(data => {
            setNames(data);
            names.notDrawn.map(name => console.log(name))
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

    function draw() {
        fetch(`${apiUrl}/draw`)
        .then(response => response.json())
        .then(data => {
            setNames(data)
        })
        .catch(error => {
            console.error(error);
        });
    }

    function reset() {
        fetch(`${apiUrl}/reset`, {method: "POST"})
        .then(response => response.json())
        .then(data => {
            setNames(data)
        })
        .catch(error => {
            console.error(error);
        });
    }

    function deleteName(name) {
        fetch(`${apiUrl}/names/${name}`, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            setNames(data)
        })
        .catch(error => {
            console.error(error);
        });
    }

    function addName(name) {
        if (name === "") { return; }

        fetch(`${apiUrl}/names`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            setNewName("");
            setAdding(false);
            setNames(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="max-w-800px m-0-auto p-4">
            <h1 className='text-5xl text-center mb-8 text-gray-800'>Vendredi musique</h1>
            <div className="flex justify-around">
                <div className="w-5/12 bg-white rounded p-6 shadow-lg untouched">
                    <h2 className="text-2xl mb-6 text-gray-700">Personnes à choisir</h2>
                    <ul className="list-none p-0 m-0">
                        { names.notDrawn.map((name, index) => (
                            <li className="p-2 m-2 bg-gray-100 rounded-md border-gray-500 flex justify-between align-baseline hover:bg-red-800 hover:text-white pointer-events-none" key={index}>
                                <span>{name}</span>
                                <span>
                                    <FontAwesomeIcon className="w-3 cursor-pointer pointer-events-auto" icon={faTrash} onClick={() => deleteName(name)}></FontAwesomeIcon>
                                </span>
                            </li> 
                        ))}
                    </ul>
                    <form className="mt-6">
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
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                        onClick={() => draw()}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-white">
                        Tirer au sort
                        </span>
                    </button>
                </div>
                <div className="w-5/12 bg-white rounded p-6 shadow-lg touched">
                    <h2 className="text-2xl mb-6 text-gray-700">Personnes déjà choisies</h2>
                    <ul className="list-none p-0 m-0">
                        { names.drawn.map((name, index) => (
                            <li className="p-2 m-2 bg-gray-100 rounded-md border-gray-500 flex justify-between hover:bg-red-800 hover:text-white pointer-events-none" key={index}>
                                <span>{name}</span>
                                <span>
                                    <FontAwesomeIcon className="w-3 cursor-pointer pointer-events-auto" icon={faTrash} onClick={() => deleteName(name)}></FontAwesomeIcon>
                                </span>
                            </li> 
                        ))}
                    </ul>
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        onClick={() => reset()}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-white">
                        Remettre à zéro
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Draw;