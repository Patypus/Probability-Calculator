import React, { useState, useEffect } from 'react';

export function Calculation () {

    const [result, setResult] = useState('-');

    const loadTypes = async () => {
        var response = await fetch('probabilitycalculation/types');
        const data = await response.json();
    }

    const loadCalculation = async () => {
        var response = await fetch('probabilitycalculation/execute?calculationType=CombinedWith&operandA=0.2&operandB=0.4');
        const data = await response.json();
        setResult(data.probability);
    }

    useEffect(() => {
        loadTypes();
    }, [])

    return (<div>
            <h2>Hi World</h2>
            <label>Result:</label>
            <span>{result}</span>
            <button class="btn" onClick={loadCalculation}>Calculate</button>
        </div>);
}