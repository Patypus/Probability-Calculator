import React, { useState } from 'react';
import { OperandInput } from './OperandInput'
import { Result } from './Result';
import { CalculationTypeSelector } from './CalculationTypeSelector'
import { Calculate } from '../services/ProbabilityCalculationService';

export function Calculation() {
    const [result, setResult] = useState('-');
    const [loadingResult, setLoadingResult] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [operandA, setOperandA] = useState(0);
    const [operandB, setOperandB] = useState(0);

    const loadCalculation = async (event) => {
        event.preventDefault();
        setLoadingResult(true);
        const data = await Calculate(selectedType, operandA, operandB);
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