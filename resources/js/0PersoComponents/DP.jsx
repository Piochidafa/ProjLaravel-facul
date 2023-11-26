
import 'primereact/dropdown/dropdown.min.css'

import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function DropTeste() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className=" tailwind-scope card flex justify-content-center">
            <Dropdown filter filterBy='name' showClear value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    )
}
        