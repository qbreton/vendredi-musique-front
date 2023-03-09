import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Modal({ person, visible, setVisible }) {
    return (
        <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className={`${visible ? '' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-8 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
            <div className="absolute top-0 bottom-0 right-0 left-0 opacity-60 bg-gray-800"></div>
            <div className="relative w-full h-full max-w-md m-auto md:h-auto">
                <div className="relative bg-blue-100 rounded-lg shadow">
                    <div className="px-6 py-4 border-b rounded-t flex justify-between items-center">
                        <h3 className="text-base font-semibold text-blue-900 lg:text-xl">
                            Historique des tirages de {person.name}
                        </h3>
                        <FontAwesomeIcon className="text-blue-900 cursor-pointer" onClick={() => setVisible(false)} icon={faClose}></FontAwesomeIcon>
                    </div>
                    <div className="h-1 w-11/12 m-auto border-t-blue-800 border-t-solid border-t-2"></div>
                    <div className="p-6">
                        <p className="text-sm font-normal text-blue-800">Les dates sont fermes et définitives, aucune contestation ne sera acceptée.</p>
                        <ul className="my-4 space-y-3">
                            {
                                person.dates.map((date, index) => (
                                    <li key={index}>
                                        <a href="#" className="flex items-center p-3 text-base font-bold text-blue-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                                            <span className="flex-1 ml-3 whitespace-nowrap">Le { new Date(date).toLocaleDateString('fr') }</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;