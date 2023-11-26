import React, { useState } from "react";

const Dropd = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown mt-1 block w-full ">
            <button
                className="border-1 border-gray-300 border-round border-0 text-50 w-full py-2 "
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption
                    ? selectedOption.label
                    : "Selecione o fornecedor"}
            </button>
            {isOpen && (
                <ul className="dropdown-list border-1 border-gray-300 mt-1 border-0 w-full border-round fadein animation-duration-300 animation-iteration-1 flex align-items-center flex-column">
                    {options.map((option) => (
                        <li
                            className='text-50 cursor-pointer hover:surface-800 transition-duration-500 transition-all w-full flex justify-content-center mt-1  "'
                            key={option.value}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropd;
