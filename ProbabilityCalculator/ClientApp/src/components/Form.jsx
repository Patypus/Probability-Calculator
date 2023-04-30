import React, { useState, useEffect } from 'react';
import { OperandInput } from './OperandInput'
import { Loading } from './Loading'

export function Form({ onCalculationComplete }) {
    const [types, setTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(false);
    const [selectedType, setSelectedType] = useState(true);
    const [operandA, setOperandA] = useState(0);
    const [operandB, setOperandB] = useState(0);

    const loadTypes = async () => {
        var response = await fetch('probabilitycalculation/types');
        const data = await response.json();
        setSelectedType(data[0])
        setTypes(data);
        setLoadingTypes(false);
    }

    const loadCalculation = async (event) => {
        event.preventDefault();
        var response = await fetch(`probabilitycalculation/execute?type=${selectedType}&operandA=${operandA}&operandB=${operandB}`);
        const data = await response.json();
        onCalculationComplete(data);
    }

    const onTypeSelect = (event) => {
        setSelectedType(event.target.value);
    }

    useEffect(() => {
        setLoadingTypes(true);
        loadTypes();
    }, []);

    return (
        <form onSubmit={loadCalculation}>
            <label className="form-label">Calculation Type</label>
            {loadingTypes
                ? <Loading />
                : <select className="form-select" value={selectedType} onChange={onTypeSelect}>
                    {types.map((type, index) => (<option key={`${index}-${type}`}>{type}</option>))}
                </select>}
            <OperandInput
                name="Operand A"
                value={operandA}
                setValue={setOperandA}
            />
            <OperandInput
                name="Operand B"
                value={operandB}
                setValue={setOperandB}
            />
            <button className="btn btn-primary" type="submit">Calculate</button>
        </form>
    )
}