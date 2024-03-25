"use client"
import React, { useState } from "react";

const FilterForm = () => {
    const [filter, setFilter] = useState(""); // État pour stocker les options de filtrage

    const handleFilterChange = (e) => {
        // Fonction pour gérer le changement de filtre
        setFilter(e.target.value);
        // Effectuez les actions de filtrage en fonction de la valeur de filtre
    };

    return (
        <div>
            <label htmlFor="filter">Filter by:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="">-- Select --</option>
                <option value="name_asc">Name Ascending</option>
                <option value="name_desc">Name Descending</option>
                <option value="prenom_asc">Prenom Ascending</option>
                <option value="prenom_desc">Prenom Descending</option>
                {/* Ajoutez d'autres options de filtrage selon vos besoins */}
            </select>
        </div>
    );
}

export default FilterForm;
