import React, { useState } from 'react';
import { OperandInput } from './OperandInput'
import { Result } from './Result';
import { CalculationTypeSelector } from './CalculationTypeSelector'

export function Calculation() {
    const [result, setResult] = useState('-');
    const [loadingResult, setLoadingResult] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [operandA, setOperandA] = useState(0);
    const [operandB, setOperandB] = useState(0);

    const loadCalculation = async (event) => {
        event.preventDefault();
        setLoadingResult(true);
        var response = await fetch(`probabilitycalculation/execute?type=${selectedType}&operandA=${operandA}&operandB=${operandB}`);
        const data = await response.json();
        onCalculationComplete(data);
        setLoadingResult(false);
    }

    const onCalculationComplete = (data) => {
        setResult(data.probability);
    }

    return (<div>
        <form onSubmit={loadCalculation}>
            <CalculationTypeSelector selectedType={selectedType} setSelectedType={setSelectedType} />
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
            <button className="btn btn-primary" type="submit" disabled={loadingResult}>Calculate</button>
        </form>
        <Result value={result} loading={loadingResult} />
    </div>);
}