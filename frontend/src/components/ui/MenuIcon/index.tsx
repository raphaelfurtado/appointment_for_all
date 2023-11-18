// MenuIcon.tsx

import React, { useState } from 'react';

interface MenuIconProps {
    items: string[];
    onItemClick: (item: string) => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ items, onItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        onItemClick(item);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                role="menuitem"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuIcon;
