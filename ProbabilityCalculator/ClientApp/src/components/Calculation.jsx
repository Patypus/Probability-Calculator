import React, { useState, useEffect } from 'react';
import { OperandInput } from './OperandInput'
import { Result } from './Result';
import { CalculationTypeSelector } from './CalculationTypeSelector'
import { Calculate } from '../services/ProbabilityCalculationService';
import { operandValid } from '../lib/utils';

export function Calculation() {
    const [result, setResult] = useState(null);
    const [loadingResult, setLoadingResult] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [operandA, setOperandA] = useState('0');
    const [operandB, setOperandB] = useState('0');
    const [staleResult, setStaleResult] = useState(false);

    const loadCalculation = async (event) => {
        if (!bothOperandsValid) {
            return;
        }

        event.preventDefault();
        setLoadingResult(true);
        const data = await Calculate(selectedType, operandA, operandB);
        onCalculationComplete(data);
        setLoadingResult(false);
        setStaleResult(false);
    }

    const onCalculationComplete = (data) => {
        setResult(data.probability);
    }

    const operandAValid = operandValid(operandA);
    const operandBValid = operandValid(operandB);

    const bothOperandsValid = operandAValid && operandBValid;

    useEffect(() => {
        setStaleResult(true);
    }, [selectedType, operandA, operandB]);

    return (<div className="row">
        <div className="col">
            <form onSubmit={loadCalculation}>
                <CalculationTypeSelector selectedType={selectedType} setSelectedType={setSelectedType} />
                <OperandInput
                    label="Operand A"
                    value={operandA}
                    setValue={setOperandA}
                    valueValid={operandAValid}
                />
                <OperandInput
                    label="Operand B"
                    value={operandB}
                    setValue={setOperandB}
                    valueValid={operandBValid}
                />
                <button className="btn btn-primary mt-3" type="submit" disabled={loadingResult || !bothOperandsValid}>Calculate</button>
            </form>
        </div>
        <div className="col">
            <Result value={result} loading={loadingResult} staleResult={staleResult} />
        </div>
    </div>);
}