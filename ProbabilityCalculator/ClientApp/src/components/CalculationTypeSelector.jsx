import React, { useState, useEffect } from 'react';
import { Loading } from './Loading'
import { GetCalculationTypes } from '../services/ProbabilityCalculationService';

export function CalculationTypeSelector({selectedType, setSelectedType}) {
    const [types, setTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);

    const loadTypes = async () => {
        const data = await GetCalculationTypes();
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
            <label htmlFor="calculation-type-selector" className="form-label">Calculation Type</label>
            {loadingTypes
                ? <Loading />
                : <select id="calculation-type-selector" className="form-select" value={selectedType} onChange={onTypeSelect}>
                    {types.map((type, index) => (<option key={`${index}-${type}`}>{type}</option>))}
                </select>}
        </div>
    )
}