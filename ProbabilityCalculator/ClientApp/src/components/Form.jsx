import React, { useState, useEffect } from 'react';
import { OperandInput } from './OperandInput'

export function Form ({onCalculationComplete}) {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [operandA, setOperandA] = useState(0);
    const [operandB, setOperandB] = useState(0);

    const loadTypes = async () => {
        var response = await fetch('probabilitycalculation/types');
        const data = await response.json();
        setSelectedType(data[0])
        setTypes(data);
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
        loadTypes();
    }, []);

    return (
        <form onSubmit={loadCalculation}>
            <label className="form-label">Calculation Type</label>
            <select className="form-select" value={selectedType} onChange={onTypeSelect}>
                {types.map(type => (<option>{type}</option>))}
            </select>
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