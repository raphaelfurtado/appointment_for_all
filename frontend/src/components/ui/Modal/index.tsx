import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalClass = isOpen ? 'block' : 'hidden';

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${modalClass}`}
        >
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-4 rounded-lg">
                    <button className="absolute top-2 right-2" onClick={onClose}>
                        <svg
                            className="w-6 h-6 text-gray-600 hover:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
