import styled from 'styled-components';
import env from "react-dotenv";
import { useEffect, useState } from 'react';

const DrawContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: auto;
`

const Columns = styled.div`
    display: flex;
    justify-content: space-between;
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 300px;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const Button = styled.div`
    background-color: #4CAF50; /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    border: none; /* Supprime la bordure du bouton */
    padding: 10px 20px; /* Ajoute un espace intérieur au bouton */
    text-align: center; /* Centre le texte dans le bouton */
    text-decoration: none; /* Supprime le soulignement du texte */
    display: inline-block; /* Affiche le bouton comme un élément en ligne */
    font-size: 16px; /* Taille de police du texte */
    margin: 5px; /* Ajoute une marge autour du bouton */
    cursor: pointer; /* Change le curseur de la souris en pointeur au survol */
    border-radius: 5px; /* Ajoute des coins arrondis au bouton */
    &:hover {
        background-color: #2D6A2F;
    }
    &.danger {
        background-color: #d95353;
        &:hover {
            background-color: #9f4444;
        }
    }
`

const Name = styled.div`
    border: none;
    padding: 10px 20px;
    background-color: #d6dee5;
    border-radius: 4px;
    &.even {
        background-color: #f6fbff;
    }
`

const AddName = styled.div`
    margin-top: 20px;
    cursor: pointer;
    img {
        width: 25px;
        filter: invert(20%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
    }
`

function Draw() {
    const apiUrl = env.API_URL;
    const [names, setNames] = useState({"notDrawn": [], "drawn": []});
    const [newName, setNewName] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/names`)
        .then(response => response.json())
        .then(data => {
            setNames(data)
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
        <DrawContainer>
            <ButtonsContainer>
                <Button onClick={() => draw()}>Tirer au sort</Button>
                <Button className="danger" onClick={() => reset()}>Remettre à zéro</Button>
            </ButtonsContainer>
            <Columns>
                <ColumnContainer>
                    <h2>Pas encore tirés au sort</h2>
                    <div>
                        { names.notDrawn.map((name, index) => <Name className={`${index % 2 === 0 ? 'even' : ''}`} key={index}>{name}</Name>)}
                        <AddName>
                            { !adding && <img src='./plus.svg' onClick={() => setAdding(!adding)}/> }
                            { adding && (
                                <div>
                                    <div>
                                        <input type="text" onChange={(event) => setNewName(event.target.value)}/>
                                    </div>
                                    <div>
                                        <Button className='danger' onClick={() => setAdding(false)}>Annuler</Button>
                                        <Button onClick={() => addName(newName)}>Ajouter</Button>
                                    </div>
                                </div>
                            )}
                        </AddName>
                    </div>
                </ColumnContainer>
                <ColumnContainer>
                    <h2>Déjà tirés au sort</h2>
                    <div>
                        { names.drawn.map((name, index) => <Name className={`${index % 2 === 0 ? 'even' : ''}`} key={index}>{name}</Name>)}
                    </div>
                </ColumnContainer>
            </Columns>
        </DrawContainer>
    )
}

export default Draw;