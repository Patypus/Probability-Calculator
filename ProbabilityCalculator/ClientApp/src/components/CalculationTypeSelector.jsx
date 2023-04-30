import React, { useState, useEffect } from 'react';
import { Loading } from './Loading'

export function CalculationTypeSelector({selectedType, setSelectedType}) {
    const [types, setTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);

    const loadTypes = async () => {
        var response = await fetch('probabilitycalculation/types');
        const data = await response.json();
        setSelectedType(data[0])
        setTypes(data);
        setLoadingTypes(false);
    }

    const onTypeSelect = (event) => {
        setSelectedType(event.target.value);
    }

    useEffect(() => {
        setLoadingTypes(true);
        loadTypes();
    }, []);

    return (
        <div className="mb-1">
            <label className="form-label">Calculation Type</label>
            {loadingTypes
                ? <Loading />
                : <select className="form-select" value={selectedType} onChange={onTypeSelect}>
                    {types.map((type, index) => (<option key={`${index}-${type}`}>{type}</option>))}
                </select>}
        </div>
    )
}